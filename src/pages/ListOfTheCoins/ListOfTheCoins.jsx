import React, { useState, useEffect } from "react";
import Search from "../../components/search";
import classes from "./ListOfTheCoins.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CoinAbout from "../../components/CoinAbout/CoinAbout";

const ListOfTheCoins = () => {
  const [blogs, setBlogs] = useState();
  const navigate = useNavigate();

  const getBlogs = async () => {
    const blo = await axios.get(" http://localhost:3004/blogs");
    setBlogs(blo.data);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  function handleClick(id) {
    navigate(`/coinsdescription/${id}`);
  }

  return (
    <>
      <div className={classes.container}>
        <Search title="List of the coins" list="Homepage-List of the coins" />
        <div className={classes.coinBox}>
          {blogs &&
            blogs.map((blog) => (
              <CoinAbout
                handleClick={() => handleClick(blog.id)}
                key={blog.id}
                LinkToObverseImage={blog.LinkToObverseImage}
                shortDescription={blog.shortDescription}
                topicName={blog.topicName}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default ListOfTheCoins;
