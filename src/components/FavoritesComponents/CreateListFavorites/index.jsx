import React, { useState } from "react";
import styles from './styles.module.scss';

const CreateListFavorites = ({ resetCreateList, setItens }) => {
  const [valueInputList, setValueInputList] = useState("");
  const [showInput, setShowInput] = useState(true);

  // Função para lidar com a mudança do input
  const handleValueInput = (e) => {
    setValueInputList(e.target.value);
  };

  // Função que vai confirmar a criação da lista

  const confirmList = () => {
    if (valueInputList.trim() !== "") {
      const randomId = Math.floor(Math.random() * 10000); 
      const idListRandom = randomId.toString().padStart(4, '0')
      const newItem = { name: valueInputList, idListRandom };

      setItens((prevItens) => {
        const updatedItens = Array.isArray(prevItens) ? [...prevItens] : [];

        // Verifica se a lista já existe para evitar duplicados
        const listExists = updatedItens.some(item => item.name === newItem.name);
        if (listExists) {
          alert("Já existe uma lista com esse nome.");
          return updatedItens; // Não faz nada se já existir
        }

        // Adiciona o novo item à lista
        updatedItens.push({ name: newItem.name, idListRandom });

        // Atualiza o localStorage com a nova lista
        localStorage.setItem("@createListFavorites", JSON.stringify(updatedItens));

        return updatedItens; // Retorna a nova lista para atualizar o estado
      });

      // Limpa o campo de input e esconde o input após confirmar
      setValueInputList("");
      setShowInput(false);
    } else {
      alert("O nome da lista não pode ser vazio.");
    }
  };

  // Função para cancelar a criação da lista
  const cancelInput = () => {
    setValueInputList(""); // Limpa o campo de input
    setShowInput(false); // Esconde o input
    resetCreateList(); // Chama a função passada pelo pai para resetar o estado no componente pai
  };

  return (
    <>
      {showInput && (
        <div className={styles.containerInputCreatListFavorites}>
          <input
            type="text"
            placeholder="Nome da lista, max 20 caracteres"
            value={valueInputList}
            onChange={handleValueInput}
            maxLength="20"
            className={styles.inputCreatListFavorites}
          />
          <span
            onClick={valueInputList.length <= 0 ? cancelInput : confirmList}
            className={styles.buttonInputCreatList}
          >
            {valueInputList.length <= 0 ? "Cancelar" : "Confirmar"}
          </span>
        </div>
      )}
    </>
  );
};

export default CreateListFavorites;
