import React, { useEffect, useState, useRef } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import style from "./styles.module.scss";

const PopupListFavorites = ({ closeModal, item }) => {
  const [listModal, setListModal] = useState([]);
  const [itemClickedModal, setItemClickedModal] = useState(null);
  const [showButtons, setShowButtons] = useState(false);
  const modalRef = useRef(null);

  const getListCreatModal = localStorage.getItem("@createListFavorites");

  useEffect(() => {
    if (getListCreatModal) {
      try {
        const itemsListCreated = JSON.parse(getListCreatModal);
        setListModal(itemsListCreated);
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = (name) => {
    setItemClickedModal(name);
    setShowButtons(true);
  };

  const handleConfirm = () => {
    // Verifica se o item clicado existe
    if (!itemClickedModal || !item) {
      return;
    }

    // Atualiza a lista selecionada no localStorage
    const updatedLists = listModal.map((list) => {
      // Verifica se a lista é a lista que foi selecionada
      if (list.name === itemClickedModal) {
        // Se a chave "items" não existir ou não for um array, inicializa como um array vazio
        const updatedItems = Array.isArray(list.items)
          ? [...list.items, item]
          : [item];

        return { ...list, items: updatedItems }; // Adiciona o item na lista
      }

      return list;
    });

    // Atualiza o localStorage com as listas modificadas
    localStorage.setItem("@createListFavorites", JSON.stringify(updatedLists));

    // Fecha o modal após a confirmação
    closeModal();
  };
  

  const handleCancel = () => {
    setItemClickedModal(null);
    setShowButtons(false);
  };

  return (
    <main className={style.modalComponent} ref={modalRef}>
      <header className={style.headerMdFavorites}>
        <h1 className={style.titleHeaderModalFavorites}>
          Selecione a lista que deseja guardar o filme
        </h1>
        <span className={style.closeHeaderMdFavorites} onClick={closeModal}>
          <IoIosCloseCircle color="#f46355" size={22} />
        </span>
      </header>
      <section className={style.contentModalUserList}>
        {listModal.length > 0 ? (
          <ul>
            <p>Minhas listas</p>
            {listModal.map((item, ind) => (
              <article
                key={ind}
                onClick={() => handleItemClick(item?.name)}
                className={`${style.listItemModal} ${
                  itemClickedModal === item.name ? style.selectedItem : ""
                }`}
              >
                <p>{item.name}</p>
              </article>
            ))}
          </ul>
        ) : (
          <article className={style.modalNotList}>
            <div className={style.modalNotList__title}>
              <p>Você não tem listas criadas.</p>
            </div>
            <div className={style.modalNotList__instruction}>
              <span className={style.modalNotList__instructionText}>
                1. Clique em minha lista de Favoritos
              </span>
              <span className={style.modalNotList__instructionText}>
                2. Clique em Criar lista
              </span>
              <span className={style.modalNotList__instructionText}>
                3. Crie o nome da sua lista
              </span>
            </div>
          </article>
        )}
      </section>

      {showButtons && itemClickedModal && (
        <section className={style.modalButtons}>
          <button className={style.confirmButton} onClick={handleConfirm}>
            Confirmar
          </button>
          <button className={style.cancelButton} onClick={handleCancel}>
            Cancelar
          </button>
        </section>
      )}
    </main>
  );
};

export default PopupListFavorites;
