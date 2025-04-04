import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LuDelete } from "react-icons/lu";
import { MdFormatListBulletedAdd } from "react-icons/md";

import CardFavorites from "../../components/FavoritesComponents/CardFavorites";
import CreateListFavorites from "../../components/FavoritesComponents/CreateListFavorites";


import styles from "./styles.module.scss";

const Favorites = () => {
  const [hasTotal, setHasTotal] = useState(false);
  const [openCardsUserList, setOpenCardUserList] = useState(false);
  const [shoMyListFavorites, setShowMyListFavorites] = useState(false);
  const [createList, setCreateList] = useState(false);
  const [itens, setItens] = useState([]); // Listas criadas
  const [clickedItem, setClickedItem] = useState(null); // Item clicado (lista selecionada)

  // Recupera os itens do localStorage
  const itemsArmaz = localStorage.getItem("@myfavorites");

  const loadItemsFromStorage = () => {
    const savedItems = JSON.parse(localStorage.getItem("@createListFavorites")) || [];
    setItens(savedItems);
  };

  useEffect(() => {
    loadItemsFromStorage(); // Carregar as listas na montagem do componente
  }, []);

  // Função para filtrar a lista de itens com base no nome da lista clicada
  const getListByName = (listName) => {
    const savedItems = JSON.parse(localStorage.getItem("@createListFavorites")) || [];
    // Encontra a lista com base no nome e retorna os filmes associados a ela
    const selectedList = savedItems.find((item) => item.name === listName);

    // Se a lista selecionada existir, retorna os filmes (itens) ou um array vazio
    return selectedList ? selectedList.items : [];
  };

  // Controla os estados de exibição de lista de favoritos
  const handleTotalList = () => {
    setHasTotal(true);
    setOpenCardUserList(false);
  };

  // Função para adicionar um item ao estado de itens e ao localStorage
  const addItemToList = (item, listName) => {
    setItens((prevItens) => {
      const updatedItens = [...prevItens];
      const listIndex = updatedItens.findIndex((list) => list.name === listName);

      if (listIndex === -1) {
        updatedItens.push({ name: listName, items: [item] });
      } else {
        updatedItens[listIndex].items.push(item);
      }

      // Atualiza o localStorage com os itens atualizados
      localStorage.setItem("@createListFavorites", JSON.stringify(updatedItens));
      return updatedItens;
    });
  };

  const removeItemList = (name) => {
    const listName = 'createListFavorites'; // Nome da lista para o localStorage
    
    // Recupera a lista de itens armazenada no localStorage
    const existingList = JSON.parse(localStorage.getItem(`@${listName}`)) || [];
    
    // Filtra o item a ser removido da lista
    const updatedList = existingList.filter((item) => item.name !== name);
    
    // Se a lista não estiver vazia, atualiza a lista no localStorage
    if (updatedList.length > 0) {
      localStorage.setItem(`@${listName}`, JSON.stringify(updatedList));
    } else {
      // Caso a lista fique vazia, remove o item do localStorage
      localStorage.removeItem(`@${listName}`);
    }
    
    // Atualiza o estado 'itens' no componente pai para refletir a mudança
    setItens((prevItens) => prevItens.filter((item) => item.name !== name));
  };

  const ShowUserList = () => {
    setOpenCardUserList(true);
    setHasTotal(false);
  };

  const addList = () => {
    setCreateList((prevState) => !prevState);
  };

  const resetCreateList = () => {
    setCreateList(false); // Reseta o estado de createList quando cancelar
  };

  const handleMyListFavorites = () => {
    setShowMyListFavorites((prevStateOpen) => !prevStateOpen);
  };

  // Caso não exista listas de favoritos no localStorage
  if (!itemsArmaz) {
    return (
      <div className={styles.list_favorites_null}>
        <h1>SUA LISTA ESTÁ VAZIA</h1>
        <span>Acesse a página principal e escolha seus filmes favoritos</span>
        <Link to={"/"}>Voltar para a página principal</Link>
      </div>
    );
  }

  const itemJsonFormart = JSON.parse(itemsArmaz);

  return (
    <div className={styles.page_favorites}>
        <Link to="/minha-conta" className="myAccount">Voltar
            </Link>
      <h1 className={styles.tittle_favorites}>Meus Favoritos</h1>

      <div className={styles.content_blocks_favorites}>
        <article className={styles.content_block_one_favorites}>
          <div className={styles.optionsFavoritesPage}>
            <ul onClick={handleTotalList} className={styles.allFavorites}>
              Todos os favoritos
            </ul>
            <ul onClick={handleMyListFavorites}>Minha lista de favoritos</ul>
            {shoMyListFavorites && (
              <div className={styles.containerListItemsFavorites}>
                <h3 onClick={addList}><MdFormatListBulletedAdd /> Criar Lista 
                </h3>
                {createList && (
                  <div>
                    <CreateListFavorites
                      resetCreateList={resetCreateList}
                      setItens={setItens}
                      loadItemsFromStorage={loadItemsFromStorage}
                    />
                  </div>
                )}
                {!itens.length ? (
                  <div>
                    <h4>Não há lista criada</h4>
                    <p>Crie sua lista de favoritos e organize seus filmes</p>
                  </div>
                ) : (
                  <div>
                    {itens.map((item) => (
                      <div
                        key={item.name}
                        className={styles.itemListFavoriteCreated}
                        onClick={() => {
                          ShowUserList();
                          setClickedItem(item.name); // Atualiza o estado com o nome do item clicado
                        }}
                      >
                        <li className={styles.liListFavoriteCreated}>
                          {item.name} 
                        </li>
                        <span onClick={() => removeItemList(item.name)}>
                          <LuDelete size={20} />
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </article>

        {/* Quando hasTotal for verdadeiro, exibe todos os itens de @myfavorites */}
        {hasTotal && (
          <article className={styles.content_block_two_favorites}>
            <CardFavorites
              itemsStoreage={itemJsonFormart}
              addItemToList={addItemToList}  // Passando a função de adicionar item
            />
          </article>
        )}

        {/* Quando openCardsUserList for verdadeiro, exibe a lista específica de @createListFavorites */}
        {openCardsUserList && clickedItem && (
          <article>
            <h3>Lista: <span className={styles.listActive}>{clickedItem}</span></h3> {/* Exibe o nome da lista clicada */}
            <CardFavorites
              itemsStoreage={getListByName(clickedItem)} // Passa apenas os filmes da lista selecionada
            />
          </article>
        )}
      </div>
    </div>
  );
};

export default Favorites;
