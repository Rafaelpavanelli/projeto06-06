import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../components/contexts/User";
import './Menu.modules.css';

export const Home = () => {
  const { adicionarItem, pegarItem, removerItem } = useContext(UserContext);
  const navigate = useNavigate();
  const [itens, setItens] = useState([]);
  const [item, setItem] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("uuid") === null) {
      navigate('/');
    }

    pegarItem()
      .then((response) => {
        const data = response.docs;
        setItens(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const CadastrarItem = async () => {
    try {
      await adicionarItem(item);
      window.location.reload(true);
    } catch (error) {
      alert("Error: " + error);
    }
  };

  const renderItems = () => {
    if (itens.length !== 0) {
      return itens.map((item, i) => {
        const todo = item.data();
        return (
          <p key={i}>
            Tarefa: {todo.todo}
            <button onClick={() => removerItem(item.id).then(() => window.location.reload(true))}>
              Remover Tarefa
            </button>
          </p>
        );
      });
    } else {
      return <p>Sem Itens Cadastrados</p>;
    }
  };

  const logout = () => {
    sessionStorage.removeItem("uuid");
    window.location.reload(true);
  };

  return (
    <div className="Menu">
      <button className="Logout" onClick={logout}>Logout</button>
      <div className="addItems">
        <label>
          Adicionar Item
          <input type="text" value={item} onChange={(e) => setItem(e.target.value)} />
        </label>
        <button onClick={CadastrarItem}>Adicionar Tarefa</button>
      </div>
      <div className="items">
        {renderItems()}
      </div>
    </div>
  );
};
