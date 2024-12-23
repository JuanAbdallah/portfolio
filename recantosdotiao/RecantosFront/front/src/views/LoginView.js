import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";

const LoginView = () => {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const { logar } = useContext(AuthContext);
  const navigate = useNavigate();

  const Logar = async (e) => {
    e.preventDefault();
    try {
      await logar({ login, senha });
    } catch (error) {
      console.error("Erro ao logar:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bem-vindo ao Recanto do Tião</h1>
      <form onSubmit={Logar} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Login:</label>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Entrar
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: "1.5rem",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    width: "300px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default LoginView;
