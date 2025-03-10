# Taitaja9
## YHTEYSTIEDOT	 
Discord: miksa4343 siellä saa vastauskia mihin vaan projektiin liittyviin kysymyksiin

Email: admin@oh3cyt.com
# Kehitys idea HUOM!!!!!!!!!!!!!!!!!
Jälkikäteen mietittynä lisätkää nappi josta pystyy tyhjentämään tietokannan kaikki muut paitsi käyttäjä taulun jotta sovelluksen käyttö kilpailusta toiseen helpottuisi, Nappiin olisi ehkä hyvä laittaa myös varmistus oletko todella varma ja että admin käyttäjän pitää syöttää salasana ennen kuin mitään voi tehdä
## Overview

Taitaja9 is a web application designed to manage and display information for a competition. The application includes features for user authentication, team management, and displaying competition results.

## Project Structure

The project is structured as follows:

```
.github/
	workflows/
		main_taitajabackend.yml
backend/
	.gitignore
	package.json
	server.js
	Taitaja9.sql
	uploads/
csv_esimerkki.csv
frontend/
	.gitignore
	package.json
	public/
		favicon.ico
		index.html
		logo192.png
		logo512.png
		manifest.json
		robots.txt
	README.md
	src/
		App.css
		App.jsx
		App.test.js
		components/
		images/
		index.css
		index.js
		logo.svg
		pages/
		reportWebVitals.js
		setupTests.js
		styles/
frontendadmin/
	.gitignore
	package.json
	public/
		...
	src/
README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/mikosavolainen/Taitaja9.git
   ```
2. Navigate to the `backend` directory and install dependencies:
   ```sh
   cd Taitaja9/backend
   npm install
   ```
3. Navigate to the `frontend` directory and install dependencies:
   ```sh
   cd ../frontend
   npm install
   ```
4. Navigate to the `frontendadmin` directory and install dependencies:
   ```sh
   cd ../frontendadmin
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```sh
   cd backend
   npm start
   ```
2. Start the frontend application:
   ```sh
   cd ../frontend
   npm start
   ```
3. Start the frontend admin application:
   ```sh
   cd ../frontendadmin
   npm start
   ```

### Building the Application

To build the frontend and frontend admin applications for production, run:
```sh
npm run build
```
in their respective directories. This will create a `build` directory with the production build of the application.

### Running Tests

To run the tests, use:
```sh
npm test
```
in the frontend and frontendadmin directories.

## Project Features

- **User Authentication**: Users can log in to access different parts of the application.
- **Team Management**: Admin users can add teams using a CSV file and manage existing teams.
- **Competition Dashboard**: Displays information about the competition, including top teams and their scores.
- **Responsive Design**: The application is designed to be responsive and works well on both desktop and mobile devices.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
