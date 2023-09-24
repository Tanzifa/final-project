import React, { useEffect, useState } from "react";
import Search from "../../components/search";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import classes from "./HomePage.module.css";
import HomePage2 from "../Homepage2/Homepage2";

const Homepage = () => {
  const [categories, setcategories] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [isFilterVisible, setVisibilityFilter] = useState([]);
  const [searchValue, setSerachValue] = useState("");

  const navigate = useNavigate();

  const getcategories = async () => {
    const top = await axios.get("http://localhost:3004/categories");
    setcategories(top.data);
  };

  const getBlogs = async () => {
    const blo = await axios.get(" http://localhost:3004/blogs");
    setBlogs(blo.data);
    console.log(blo.data);
  };

  useEffect(() => {
    getcategories();
    getBlogs();
  }, []);

  const handleBlogClick = (topicId) => {
    navigate(`/adminpanel/${topicId}`);
  };

  const handleSearch = (value) => {
    console.log("ZEYNEBUN VALUESI", value);
    console.log("ZEYNEBUN VALUESI", value);
    setSerachValue(value);

    let newObj = {
      ...obj,
      searchValue: value,
    };
    navigate(`/adminpanel/${JSON.stringify(newObj)}`);
  };

  const handleInputChange = (value) => {
    console.log("Input changed:", value);
    // тут ваш код обработки набора текста
  };

  const [obj, setObj] = useState({
    minPrice: "",
    maxPrice: "",
  });

  let data =
    searchValue !== "" && searchValue !== " " ? filteredData : categories;

  return (
    <div className={classes.container}>
      <Search
        handleSearch={handleSearch} // вызывается при клике на кнопку поиска
        handleInputChange={handleInputChange} // вызывается во время набора
        isFilterVisible={isFilterVisible}
        title="HomePage"
        toggleClick={() => setVisibilityFilter(!isFilterVisible)}
        filter="Advanced filter"
      />
      {isFilterVisible ? (
        <div className={classes.coinsBoxes}>
          {data &&
            data.map((topic) => (
              <div
                key={topic.id}
                onClick={() => handleBlogClick(topic.id, topic.category)}
              >
                <div className={classes.coinsBox}>{topic.topic}</div>
                <Link to="">Show all</Link>
                <div className={classes.coinImageBox}>
                  <img src={topic.image} alt="title coins image" />
                </div>
              </div>
            ))}
        </div>
      ) : (
        <HomePage2
          searchValue={searchValue}
          handleSearch={handleSearch}
          form={obj}
          setForm={(obj) => setObj(obj)}
        />
      )}
    </div>
  );
};

export default Homepage;
