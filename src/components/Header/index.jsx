import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsFillHeartFill } from "react-icons/bs";
import { FaRegCircleUser } from "react-icons/fa6";


import "./styles.css";

const Header = () => {
  const [countItens, setCountItens] = useState(0);

  // Função para atualizar o contador de itens no localStorage
  const updateCountItens = () => {
    const itemInFavorites = localStorage.getItem('@myfavorites');
    if (itemInFavorites) {
      const totalItens = JSON.parse(itemInFavorites);
      setCountItens(totalItens.length);
    } else {
      setCountItens(0);
    }
  };

  useEffect(() => {
    // Atualiza o contador quando o componente é montado
    updateCountItens();

    // Adiciona o listener para o evento de alteração do localStorage
    const handleStorageChange = (e) => {
      if (e.key === '@myfavorites') {
        updateCountItens();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Limpeza do event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <header className="headePage">
      <Link to="/" className="logo">
        Prime Flix
      </Link>
      <div  className="favoritos">
        <span className="countfavorites">{countItens}</span>
        <BsFillHeartFill size={25} color="red" />
      </div>
      <Link to="/minha-conta" className="myAccount">
        <span className="countfavorites"></span>
        <FaRegCircleUser  size={25} color="#fdfdfd" />
      </Link>
    </header>
  );
};

export default Header;
