import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";

const Navbar = () => {
    const { logado, logout, user } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/home">
                    Recantos do Tião
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/home">
                                Início
                            </Link>
                        </li>
                        {user && user.role === "Sindico" && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/blocos">
                                        Blocos
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/casas">
                                        Casas
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/usuarios">
                                        Usuários
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/residentes">
                                        Residentes
                                    </Link>
                                </li>
                            </>
                        )}
                        <li className="nav-item">
                            <Link className="nav-link" to="/avisos">
                                Avisos
                            </Link>
                        </li>
                    </ul>
                    {logado && (
                        <button
                            className="btn btn-outline-danger"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
