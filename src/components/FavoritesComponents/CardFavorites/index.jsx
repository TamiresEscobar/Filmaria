import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import PopupListFavorites from "../PopupListFavorites";

import styles from './styles.module.scss';

const CardFavorites = ({ itemsStoreage  }) => {



  // Garantir que itemsStoreage seja um array válido
  const totalItens = Array.isArray(itemsStoreage) ? itemsStoreage : [];

  const [showModal, setShoeModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Armazena o item selecionado
  const [uniqClickItemRemoved,  setUniqClickItemRemoved] = useState('')
  console.log("🚀 ~ CardFavorites ~ uniqClickItemRemoved:", uniqClickItemRemoved)

  const paramsUrl = useNavigate();

  const handleModal = (item) => {
    setSelectedItem(item); // Passa o item clicado para o estado
    setShoeModal(true); // Exibe o modal
  };

  const closeModal = () => {
    setShoeModal(false); // Fecha o modal
  };

  const handleClickReload = (id) => {
    paramsUrl(`/filme/${id}`);
    window.location.reload();
  };

 

 const handleItemClickRemove = (id) => {
  setUniqClickItemRemoved(id);

  // Recupera os dados do localStorage
  const listaCriada = JSON.parse(localStorage.getItem('@createListFavorites')) || [];
  const favoritosGerais = JSON.parse(localStorage.getItem('@myfavorites')) || [];

  // Verifica se o item está na lista criada
  const itemNaListaCriada = listaCriada.find((list) => list.items && list.items.find((item) => item.id === id));

  if (itemNaListaCriada) {
    // Se o item estiver na lista criada, remove da lista correspondente
    const updatedList = listaCriada.map((list) => {
      if (list.items) {
        list.items = list.items.filter((item) => item.id !== id);
      }
      return list;
    });

    // Atualiza o localStorage com a lista modificada
    localStorage.setItem('@createListFavorites', JSON.stringify(updatedList));
    console.log('Item removido da lista criada.');

    window.location.reload()
    // Retorna aqui para não remover da lista geral quando o item está apenas na lista criada
    return;
  }

  // Verifica se o item está no armazenamento geral (myfavorites)
  const itemNosFavoritosGerais = favoritosGerais.find((item) => item.id === id);

  if (itemNosFavoritosGerais) {
    // Remove o item do armazenamento geral
    const updatedFavorites = favoritosGerais.filter((item) => item.id !== id);
    localStorage.setItem('@myfavorites', JSON.stringify(updatedFavorites));
    console.log('Item removido do armazenamento geral.');

    // Agora, removemos o item de todas as listas onde ele aparece
    const updatedList = listaCriada.map((list) => {
      if (list.items) {
        list.items = list.items.filter((item) => item.id !== id);
      }
      return list;
    });

    // Atualiza o localStorage com a lista modificada
    localStorage.setItem('@createListFavorites', JSON.stringify(updatedList));
    console.log('Item removido da lista criada também.');

    window.location.reload()
    return;
  }

  // Se o item não for encontrado em nenhum dos dois locais, não faz nada
  console.log('Item não encontrado em nenhum armazenamento.');
};

  

  return (
    <div className={styles.col_right_favorites_page}>
      {/* Verifica se há itens antes de tentar mapear */}
      {totalItens.length > 0 ? (
        totalItens.map((item, ind) => (
          <div  className={styles.configStylesCard} key={ind}>
            <img
              src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
              className={styles.cardImgFavorites}
              alt="image-film-card"
            />
            <div  className={styles.cardbody}>
              <h5 className={styles.cardTitle} >{item?.title}</h5>
              <button onClick={() => handleModal(item)} itemsStoreage className={styles.buttonAddListUserFavorites}>Add na minha lista ...</button> {/* Passa o item para o modal */}

              <button className={styles.buttonRemoveListUserFavorites} 
              onClick={() => handleItemClickRemove(item.id)}
              
              >Excluir</button>
              <Link
                onClick={() => handleClickReload(item.id)}
                // className="link_pdp"
                className={styles.linkToPdpCardFavorites}
              >
                Saiba Mais
              </Link>
            </div >
          </div >
        ))
      ) : (
        <p>Não há filmes nesta lista.</p> // Exibe mensagem caso não haja filmes
      )}

      {showModal && selectedItem && (
        <PopupListFavorites 
          closeModal={closeModal} 
          item={selectedItem}  // Passa o item para o modal
        />
      )}
    </div>
  );
};

export default CardFavorites;
