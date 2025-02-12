const express = require('express');
const mysql = require('mysql'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer'); 
const fs = require('fs');
const csv = require('csv-parser');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: 'taitaja9.mysql.database.azure.com', 
    user: 'taitaja9', 
    password: 'Kissakala12.', 
    database: 'Taitaja9', 
    port: 3306,  
    ssl: true
});


db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});


const JWT_SECRET = 'Heh meidän salainen avain :O. ei oo ku meiän! ・:，。★＼(v)♪Merry Xmas♪(v)/★，。・:・゜ :DD XD XRP ┐( ͡◉ ͜ʖ ͡◉)┌ QSO QRZ ( ͡~ ͜ʖ ͡° ) QRO ( ˘▽˘)っ♨ QRP DLR JKFJ °₊·ˈ∗♡( ˃̶᷇ ‧̫ ˂̶᷆ )♡∗ˈ‧₊°';


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}


const upload = multer({ dest: 'uploads/' });
app.post('/lisaajoukkue', upload.single('file'), (req, res) => {
    const filePath = req.file.path;
    const teams = [];

    fs.createReadStream(filePath)
        .pipe(csv({ separator: ';', headers: false })) // Parse rows without assuming a header row
        .on('data', (row) => {
            console.log(row); // Log each row for debugging

            // Extract values from the row
            const ryhma = row[0]; // Group name
            const koulu = row[1]; // School name
            const joukkue = row[2]; // Team name

            // Filter out empty rows
            if (ryhma && koulu && joukkue) {
                teams.push([koulu, joukkue, ryhma]);
            }
        })
        .on('end', () => {
            // Log the teams array for debugging

            // Handle empty teams array
            if (teams.length === 0) {
                return res.status(400).json({ message: 'No valid data found in the CSV file' });
            }

            // Construct the SQL query
            const query = 'INSERT INTO Joukkueet (koulun_nimi, joukkueen_nimi, ryhman_numero) VALUES ?';

            // Execute the query
            db.query(query, [teams], (err, result) => {
                if (err) {
                    console.error(err); // Log the error for debugging
                    return res.status(500).json({ message: err.message });
                }
                res.status(201).json({ message: 'Teams added successfully' });
            });

            // Clean up the uploaded file
            fs.unlinkSync(filePath);
        });
});

app.post('/lisaakayttaja', async (req, res) => {
    const { kayttajanimi, salasana, rooli } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(salasana, 10);
        const query = 'INSERT INTO Kayttajat (kayttajanimi, salasana_hash, rooli) VALUES (?, ?, ?)';
        db.query(query, [kayttajanimi, hashedPassword, rooli], (err, result) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.status(201).json({ message: 'User added successfully' });
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.get('/top5', (req, res) => {
    const query = `
        SELECT * FROM Tulokset
        ORDER BY keskeyttanyt ASC, kokonaisaika ASC
        LIMIT 5
    `;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(results);
    });
});


app.get('/infotaulu', (req, res) => {
    const query = `
        SELECT * FROM Tulokset
    `;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(results);
    });
});


app.get('/joukkueet', (req, res) => {
    const query = 'SELECT * FROM Joukkueet';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(results);
    });
});


app.put('/joukkuemuokkaus/:id', (req, res) => {
    const { id } = req.params;
    const { koulun_nimi, joukkueen_nimi, ryhman_numero, keskeyttanyt } = req.body;
    const query = 'UPDATE Joukkueet SET koulun_nimi = ?, joukkueen_nimi = ?, ryhman_numero = ?, keskeyttanyt = ? WHERE id = ?';
    db.query(query, [koulun_nimi, joukkueen_nimi, ryhman_numero, keskeyttanyt, id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ message: 'Team updated successfully' });
    });
});


app.post('/kirjaudu', async (req, res) => {
    const { kayttajanimi, salasana } = req.body;
    const query = 'SELECT * FROM Kayttajat WHERE kayttajanimi = ?';
    db.query(query, [kayttajanimi], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (results.length === 0) {
            return res.status(400).json({ message: 'Authentication failed' });
        }
        const user = results[0];
        const isMatch = await bcrypt.compare(salasana, user.salasana_hash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Authentication failed' });
        }
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
});


app.post('/ajankirjaus', authenticateToken, (req, res) => {
    const { joukkue_id, rasti_id, suoritusaika_sekunneissa } = req.body;
    const query = 'INSERT INTO Suoritukset (joukkue_id, rasti_id, suoritusaika_sekunneissa) VALUES (?, ?, ?)';
    db.query(query, [joukkue_id, rasti_id, suoritusaika_sekunneissa], (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(201).json({ message: 'Time recorded successfully' });
    });
});

// Endpoint: /tulostaulu (GET scoreboard)
app.get('/tulostaulu', (req, res) => {
    const query = `
        SELECT * FROM Tulokset
        ORDER BY keskeyttanyt ASC, kokonaisaika ASC
    `;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(results);
    });
});

// Endpoint: /uusikilpailu (Create new competition)
app.post('/uusikilpailu', (req, res) => {
    const { nimi, rastien_maara } = req.body;
    const query = 'INSERT INTO Kilpailut (nimi, rastien_maara) VALUES (?, ?)';
    db.query(query, [nimi, rastien_maara], (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(201).json({ message: 'Competition created successfully' });
    });
});

// Endpoint: /vaihdasalasana (Change password)
app.post('/vaihdasalasana', authenticateToken, async (req, res) => {
    const { uusisalasana } = req.body;
    const userId = req.user.id;
    try {
        const hashedPassword = await bcrypt.hash(uusisalasana, 10);
        const query = 'UPDATE Kayttajat SET salasana_hash = ? WHERE id = ?';
        db.query(query, [hashedPassword, userId], (err, result) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.status(200).json({ message: 'Password changed successfully' });
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});