import React, { createContext, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from './../data/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

// Criação do contexto
const UserContext = createContext();

// Componente provedor do contexto
const UserContextProvider = ({ children }) => {
  const [perfil, setPerfil] = useState();

  // Função para cadastrar um novo usuário
  const cadastrar = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setPerfil(userCredential.user);
      sessionStorage.setItem("uuid", userCredential.user.uid);
      return true;
    } catch (error) {
      alert("Email já corresponde a outra conta");
      return error;
    }
  }

  // Função para fazer login
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setPerfil(userCredential.user);
      sessionStorage.setItem("uuid", userCredential.user.uid);
      return true;
    } catch (error) {
      alert(error.message);
    }
  }

  // Função para adicionar um item
  async function adicionarItem(item) {
    try {
      const docRef = await addDoc(collection(db, sessionStorage.getItem("uuid")), {
        todo: item
      });
      console.log(docRef);
    } catch (e) {
      alert("Erro ao adicionar o documento: " + e);
    }
  }

  // Função para pegar os itens
  async function pegarItem() {
    try {
      const querySnapshot = await getDocs(collection(db, sessionStorage.getItem("uuid")));
      return querySnapshot;
    } catch (e) {
      alert("Erro ao pegar os itens: " + e);
    }
  }

  // Função para remover um item
  async function removerItem(documentId) {
    try {
      const itemRef = doc(collection(db, sessionStorage.getItem("uuid")), documentId);
      await deleteDoc(itemRef);
      console.log("Item removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover o item:", error);
    }
  }

  return (
    <UserContext.Provider
      value={{
        perfil,
        cadastrar,
        login,
        adicionarItem,
        pegarItem,
        removerItem
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
