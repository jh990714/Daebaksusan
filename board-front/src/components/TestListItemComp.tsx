import axios from "axios";
import React, { useEffect, useState } from "react";
import { TestListItem } from "types";

export const TestListItemComp:React.FC = () => {
  const [posts, setPosts] = useState<TestListItem[]>([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/posts",
    }).then((response) => setPosts(response.data));
  }, []);

  return (
    <div className="test-list-item">
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3 className="test-list-item-title">{post.title}</h3>
            <div className="test-list-item-body">{post.body}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}


