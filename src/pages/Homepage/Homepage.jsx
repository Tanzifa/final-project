import React, { useEffect, useState } from "react";
import Search from "../../components/Search";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import classes from "./HomePage.module.css";
import HomePage2 from "../Homepage2/Homepage2";
import "../../Fonts.css";

const Homepage = () => {
  const [categories, setcategories] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [isFilterVisible, setVisibilityFilter] = useState(true);
  const [searchValue, setSerachValue] = useState("");

  const navigate = useNavigate();

  //kategoriyalari oxuyur
  const getcategories = async () => {
    const top = await axios.get("http://localhost:3004/categories");
    setcategories(top.data);
  };
  //bloglari oxuyur
  const getBlogs = async () => {
    const blo = await axios.get(" http://localhost:3004/blogs");
    setBlogs(blo.data);
    console.log(blo.data);
  };

  useEffect(() => {
    getcategories();
    getBlogs();
  }, []);
  //kateqoriyanin ustune basanda admin panelde hemin kategoriyadaki coinleri gosterir
  const handleBlogClick = (topicId) => {
    navigate(`/adminpanel/${topicId}`);
  };

  //search onclick olunanda axtarisda verdiyimiz kriteriyalara uygun melumatlar8i admin panelde gosterir
  const handleSearch = (value) => {
    console.log("ZEYNEBUN VALUESI", value);
    console.log("ZEYNEBUN VALUESI", value);
    setSerachValue(value);

    let newObj = {
      ...obj,
      searchValue: value,
    };
    navigate(`/adminpanel/${JSON.stringify(newObj)}`); //newObj obyekti  stringe cevirir
  };
// ozunde search input ve homepage2 inputlarinin valuelerini saxlayir
  const [obj, setObj] = useState({
    minPrice: "",
    maxPrice: "",
    minYearOfIssue: "",
    maxYearOfIssue: "",
  });

  let data =
    searchValue !== "" && searchValue !== " " ? filteredData : categories;

  return (
    <div className={classes.container}>
      <Search
        handleSearch={handleSearch}
        // handleInputChange={handleInputChange}
        title="HomePage"
        isFilterVisible={isFilterVisible}
        toggleClick={() => setVisibilityFilter(!isFilterVisible)}
        filter="Advanced filter"
        showIcon={true}
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
                <Link to="">Show all &#10095;</Link>
                <div className={classes.coinImage}>
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
