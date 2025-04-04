import React, { useState, useEffect } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import "./styles.css";

const ButtonFavorites = ({ dataShelf }) => {
  console.log("🚀 ~ ButtonFavorites ~ dataShelf:", dataShelf)
  const { id, title, poster_path } = dataShelf;
  const [isFavorite, setIsFavorite] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const myListFavorites = localStorage.getItem("@myfavorites");
    const saveFilms = JSON.parse(myListFavorites) || [];

    const isInFavorites = saveFilms.some((item) => item.id === id);
    setIsFavorite(isInFavorites);
  }, [id]); 

  const handleFavorite = () => {
    const myListFavorites = localStorage.getItem("@myfavorites");
    let saveFilms = JSON.parse(myListFavorites) || [];

    const hasFilms = saveFilms.some((item) => item.id === id);

    if (hasFilms) {
      toast.warning('Esse filme já está na sua lista de favoritos')
      return;
    }

    saveFilms.push({ id, title,poster_path });
    localStorage.setItem("@myfavorites", JSON.stringify(saveFilms));

    setIsFavorite(true);
    toast.success('Adicionado aos favoritos! :)')

    navigate(0);
  };


  return (
    <div className="button_favorites" onClick={handleFavorite}>
      <BsFillHeartFill
        size={30}
        color={isFavorite ? "red" : "#fff"} // Change color based on favorite status
      />
    </div>
  );
};

export default ButtonFavorites;
