import React, { useState } from 'react';
import { useLimiteCaracteres } from '../LimiteCaracteresContext';
import Input from './Input';
import styles from './newpost.module.css';
import Header from './Header';
import axios from 'axios';

const NewPost = () => {
  const { titulo, descricao, handleChange } = useLimiteCaracteres(); // Acessando título e descrição do contexto
  const [mensagem, setMensagem] = useState('');  // Para mensagens de erro ou sucesso
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação de campos obrigatórios
    if (!titulo || !descricao) {
      setMensagem('Título e descrição são obrigatórios');
      return;
    }

    try {
      // Enviar os dados para a API, dentro do if que verifica os campos obrigatórios
      const response = await axios.post('http://localhost:5000/api/posts', {
        title: titulo,
        description: descricao,
      });
      setMensagem('Post criado com sucesso!');  // Exibe mensagem de sucesso
      console.log(response.data); // Pode logar a resposta da API aqui para depuração
    } catch (error) {
      console.error('Erro ao criar o post:', error);
      setMensagem('Erro ao criar o post. Tente novamente.'); // Exibe mensagem de erro
    }
  };

  return (
    <>
      <Header />
      <div className={styles.containerForm}>
        <h2>Crie seu novo Post</h2>
        <form onSubmit={handleSubmit}>
          <label>Título do seu Post</label>
          <p>{titulo.length}/50</p>
          <Input
            type="text"
            value={titulo}
            onChange={(e) => handleChange(e, 'titulo')} // Passando 'titulo' aqui
          />
          {mensagem && <p className={styles.aviso}>{mensagem}</p>} {/* Exibe mensagem de aviso se houver */}

          <label>Descrição do seu Post</label>
          <textarea
            value={descricao}
            onChange={(e) => handleChange(e, 'descricao')} 
          />
          <p>{descricao.length}/200</p>

         
          <button className={styles.button} type="submit">Enviar</button> 
        </form>
        
      </div>
    </>
  );
};

export default NewPost;
