import React, { useContext, useState } from "react";
import { UserContext } from "../../components/contexts/User";
import { NavLink, useNavigate } from "react-router-dom";
import './Cadastrar.modules.css';

export const Cadastrar = () => {
  const { cadastrar } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleCadastrar = () => {
    cadastrar(email, senha)
      .then((success) => {
        navigate("/Home"); // Redireciona para a rota de login
      })
      .catch((error) => {
        // Lidar com erros na função cadastrar
        console.log(error);
      });
  };

  return (
    <div className="Cadastrar">
      <div className="form">
        <h1>Cadastrar</h1>
        <label>
          <p>Email</p>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <p>Senha</p>
          <input
            type="password" // Alterado para o tipo "password" para ocultar a senha digitada
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </label>
        <button onClick={handleCadastrar}>Cadastrar</button>
        <NavLink to={'/'}>Já tem uma conta? Faça Login</NavLink>
      </div>
    </div>
  );
};
