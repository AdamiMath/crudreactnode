import React, { createContext, useState, useContext } from 'react';

const LimiteCaracteresContext = createContext();

export const LimiteCaracteresProvider = ({ children }) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [mensagem, setMensagem] = useState(''); // Estado para a mensagem de aviso

  const handleChange = (e, tipo) => {
    const { value } = e.target;

    if (tipo === 'titulo') {
      if (value.length > 50) {
        setMensagem('Título atingiu o limite de 50 caracteres!');
        return;
      }
      setMensagem(''); // Limpa a mensagem se estiver dentro do limite
      setTitulo(value);
    }

    if (tipo === 'descricao') {
      if (value.length > 200) {
        setMensagem('Descrição atingiu o limite de 200 caracteres!');
        return;
      }
      setMensagem('');
      setDescricao(value);
    }
  };

  return (
    <LimiteCaracteresContext.Provider value={{ titulo, descricao, mensagem, handleChange }}>
      {children}
    </LimiteCaracteresContext.Provider>
  );
};

export const useLimiteCaracteres = () => {
  return useContext(LimiteCaracteresContext);
};
