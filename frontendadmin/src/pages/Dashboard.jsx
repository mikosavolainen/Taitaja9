import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Styles.css";

const Dashboard = ({ userType }) => {
    const handleExportAndClear = async () => {
        try {
            const response = await fetch("http://localhost:5000/export-and-clear", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (!response.ok) {
                throw new Error("Verkkopalvelu palautti virheen.");
            }
    
           
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
    
            
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "database_backup.zip"); 
            document.body.appendChild(link);
            link.click(); 
            link.remove();
        } catch (error) {
            console.error("Virhe viennissä ja tyhjentämisessä:", error);
            alert("Tapahtui virhe viennissä ja tyhjentämisessä.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-box">
                    <div className="links-container">
                        {userType === "admin" ? (
                            <>
                                <Link to="/admin-dashboard" className="login-input">
                                    joukkueiden hallintapaneeli
                                </Link>
                                <Link to="/UusiKilpailu" className="login-input">
                                    Uusi kilpailu
                                </Link>
                                <Link to="/lisaajoukkue" className="login-input">
                                    Lisää joukkueita csv:n avulla
                                </Link>
                                <Link to="/lisaakayttaja" className="login-input">
                                    Tee uusia käyttäjiä
                                </Link>
                                <Link to="/VaihdaSalasana" className="login-input">
                                    Vaihda salasanaa
                                </Link>
                                <button onClick={handleExportAndClear} className="Vietiedot">
                                    Tallenna ja Poista
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/RastiInput" className="login-input">
                                    Lisää joukkueelle aika
                                </Link>
                                <Link to="/VaihdaSalasana" className="login-input">
                                    Vaihda salasanaa
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;