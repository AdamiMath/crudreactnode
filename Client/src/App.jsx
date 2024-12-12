import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
      axios.get('http://localhost:5000/api/posts')
          .then(response => {
              setPosts(response.data);
          })
          .catch(error => {
              console.error('Erro ao buscar os posts:', error);
          });
  }, []);

  return (
    <div>
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
  )
}

export default App
