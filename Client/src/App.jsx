// App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';  // O Header que usa o contexto
import styles from './style.module.css';


function App() {
  const [posts, setPosts] = useState([]);
  const url = 'http://localhost:5000/api/posts';

  async function getPosts(url) {
    try {
      const response = await axios.get(url);
      setPosts(response.data);
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  }

  useEffect(() => {
    getPosts(url);
  }, []);

  return (
    <div>

        <Header /> 
        <div className={styles.containerSite}>
          <h1>Posts</h1>
          <ul>
            {posts.map(post => (
              <li key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
              </li>
            ))}
          </ul>
        </div>

    </div>
  );
}

export default App;
