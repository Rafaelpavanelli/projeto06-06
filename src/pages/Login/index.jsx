import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../components/contexts/User";
import './Login.modules.css';

export const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleLogin = () => {
    login(email, senha)
      .then((success) => {
        navigate("/home"); // Redireciona para a rota de login
      })
      .catch((error) => {
        // Lidar com erros na função login
        console.log(error);
      });
  };

  useEffect(() => {
    if (sessionStorage.getItem("uuid") != null) {
      navigate('/Home');
    }
  }, []);

  return (
    <div className="login">
      <h1>Login</h1>
      <div className="forms">
        <label>
          <p>Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <p>Senha</p>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </label>
        <button onClick={handleLogin}>Login</button>
        <NavLink to='/cadastrar'>Cadastre-se</NavLink>
      </div>
    </div>
  );
};
