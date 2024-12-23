import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import { AuthContext } from "../context/auth";
import { buscarCasaPorId } from "../service/CasaService";
import { buscarResidentesPorCasa } from "../service/ResidenteService";

const HomeView = () => {
    const { user } = useContext(AuthContext);
    const [casa, setCasa] = useState(null);
    const [residentes, setResidentes] = useState([]);

    useEffect(() => {
        if (user?.casaId) {
            buscarCasa(user.casaId);
            buscarResidentes(user.casaId);
        }
    }, [user.casaId]);

    const buscarCasa = async (casaId) => {
        try {
            const casa = await buscarCasaPorId(casaId);
            if (casa) {
                setCasa(casa);
            }
        } catch (error) {
            console.error("Erro ao buscar casa:", error);
        }
    };

    const buscarResidentes = async (casaId) => {
        try {
            const residentes = await buscarResidentesPorCasa(casaId);
            if (residentes) {
                setResidentes(residentes);
            }
        } catch (error) {
            console.error("Erro ao buscar residentes:", error);
        }
    };

    return (
        <div>
            <Navbar />
            <div style={styles.container}>
                <header style={styles.header}>
                    <h1 style={styles.title}>
                        Bem-vindo ao Recantos do Tião!
                    </h1>
                </header>
                <main style={styles.main}>
                    <p style={styles.welcomeMessage}>
                        Escolha uma opção no menu acima para começar!
                    </p>
                    {casa ? (
                        <div style={styles.card}>
                            <h2 style={styles.subtitle}>
                                Casa {casa.numero}
                            </h2>
                            <p style={styles.description}>
                                Moradores registrados:
                            </p>
                            <ul style={styles.residentList}>
                                {residentes.length > 0 ? (
                                    residentes.map((residente, index) => (
                                        <li key={index} style={styles.residentItem}>
                                            {residente.nome}
                                        </li>
                                    ))
                                ) : (
                                    <li style={styles.emptyMessage}>
                                        Nenhum residente encontrado.
                                    </li>
                                )}
                            </ul>
                        </div>
                    ) : (
                        <p style={styles.loadingMessage}>
                            Carregando informações da casa...
                        </p>
                    )}
                </main>
            </div>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        backgroundColor: "#eef2f5",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    header: {
        backgroundColor: "#007bff",
        color: "#fff",
        padding: "20px",
        borderRadius: "12px",
        width: "100%",
        maxWidth: "800px",
        textAlign: "center",
        marginBottom: "20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    title: {
        fontSize: "26px",
        margin: "0",
    },
    main: {
        width: "100%",
        maxWidth: "800px",
        textAlign: "center",
    },
    welcomeMessage: {
        fontSize: "18px",
        color: "#555",
        marginBottom: "20px",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        textAlign: "left",
    },
    subtitle: {
        fontSize: "22px",
        marginBottom: "10px",
        color: "#333",
    },
    description: {
        fontSize: "16px",
        color: "#666",
        marginBottom: "15px",
    },
    residentList: {
        listStyleType: "none",
        padding: "0",
        margin: "0",
    },
    residentItem: {
        padding: "10px",
        backgroundColor: "#f9f9f9",
        marginBottom: "8px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        fontSize: "16px",
        color: "#333",
    },
    emptyMessage: {
        fontSize: "16px",
        color: "#999",
    },
    loadingMessage: {
        fontSize: "16px",
        color: "#555",
        fontStyle: "italic",
    },
};

export default HomeView;
