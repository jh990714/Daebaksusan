import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
  
function App() {

  const [posts, setPosts] = useState<any[]>([]);

  useEffect( () => {
    axios({
      method:'GET',
      url:'https://jsonplaceholder.typicode.com/posts',
    }).then(respose => setPosts(respose.data))
  }, []);

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
}

export default App;
