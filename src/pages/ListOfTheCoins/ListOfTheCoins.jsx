import React, { useState, useEffect } from "react";
import Search from "../../components/Search";
import classes from "./ListOfTheCoins.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CoinAbout from "../../components/CoinAbout/CoinAbout";

const ListOfTheCoins = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const navigate = useNavigate();

  const getBlogs = async () => {
    const blo = await axios.get("http://localhost:3004/blogs");
    setBlogs(blo.data);
    setFilteredBlogs(blo.data); // Başlangıçta tüm blogları göster
  };

  useEffect(() => {
    getBlogs();
  }, []);

  function handleClick(id) {
    navigate(`/coinsdescription/${id}`);
  }

  function handleInputChange(event) {
    setSearchValue(event.target.value);
  }

  function handleSearch() {
    const result = blogs.filter((blog) =>
      blog.topicName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredBlogs(result);
  }

  return (
    <>
      <div className={classes.container}>
        <Search
          title="List of the coins"
          list="Homepage-List of the coins"
          handleInputChange={handleInputChange}
          handleSearch={handleSearch}
        />
        <div className={classes.coinBox}>
          {filteredBlogs.map((blog) => (
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
