import React, { useEffect, useState } from "react";
import Search from "../../components/search";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import classes from "./HomePage.module.css";
const Homepage = () => {
  const [topics, setTopics] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const getTopics = async () => {
    const top = await axios.get("http://localhost:3004/topics");
    setTopics(top.data);
  };
  const getBlogs = async () => {
    const blo = await axios.get(" http://localhost:3004/blogs");
    setBlogs(blo.data);
    console.log(blo.data);
  };
  useEffect(() => {
    getTopics();
    getBlogs();
  }, []);
  const handleBlogClick = (topicId) => {
    navigate(`/adminpanel/${topicId}`);
  };

  return (
    <>
      <div className={classes.container}>
        <Search title="HomePage" filter="Advanced filter" />
        <div className={classes.coinsBoxes}>
          {topics &&
            topics.map((topic) => (
              <div key={topic.id} onClick={() => handleBlogClick(topic.id)}>
                <div className={classes.coinsBox}>{topic.topic}</div>
                <Link to="">Show all</Link>
                <div className={classes.coinImageBox}>
                  <img src={topic.image} alt="title coins image" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Homepage;
