import React, { useState, useEffect } from "react";
import Search from "../../components/Search";
import classes from "./ListOfTheCoins.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CoinAbout from "../../components/CoinAbout/CoinAbout";
import HomePage2 from "../Homepage2/Homepage2";
import "../../Fonts.css";
const ListOfTheCoins = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [isFilterVisible, setVisibilityFilter] = useState(true);
  const navigate = useNavigate();
  const [obj, setObj] = useState({
    minPrice: "",
    maxPrice: "",
    minYearOfIssue: "",
    maxYearOfIssue: "",
  });
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
    const currentInputValue = event.target.value;
    setSearchValue(currentInputValue);
    console.log("Current input value: ", currentInputValue);

    let newObj = {
      ...obj,
      searchValue: currentInputValue,
    };

    let filtredList = filterSearch(newObj);

    setFilteredBlogs(filtredList);

    setVisibilityFilter(true);
  }

  function handleSearch() {
    let newObj = {
      ...obj,
      searchValue: searchValue,
    };

    console.log(newObj);

    let filtredList = filterSearch(newObj);

    setFilteredBlogs(filtredList);

    setVisibilityFilter(true);
  }

  function filterSearch(filterData) {
    console.log("ListOfTheCoins filterSearch", filterData);
    const filteredBlogsCommon = blogs.filter((item) => {
      const searchValueFilter =
        !filterData.searchValue ||
        item.topicName
          .toLowerCase()
          .includes(filterData.searchValue.toLowerCase());
      const minPricePass =
        !filterData.minPrice || item.price >= filterData.minPrice;
      const maxPricePass =
        !filterData.maxPrice || item.price <= filterData.maxPrice;
      const minYearOfIssuePass =
        !filterData.minYearOfIssue || item.price >= filterData.minYearOfIssue;
      const maxYearOfIssuePass =
        !filterData.maxYearOfIssue || item.price <= filterData.maxYearOfIssue;
      const country = !filterData.country || item.country == filterData.country;
      const metal = !filterData.metal || item.metal.includes(filterData.metal);
      const qualityOftheCoin =
        !filterData.qualityOftheCoin ||
        // !item.qualityOftheCoin ||
        item.qualityOftheCoin.includes(filterData.qualityOftheCoin);

      return (
        searchValueFilter &&
        minPricePass &&
        maxPricePass &&
        minYearOfIssuePass &&
        maxYearOfIssuePass &&
        country &&
        metal &&
        qualityOftheCoin
      );
    });

    return filteredBlogsCommon;
  }

  return (
    <>
      <div className={classes.container}>
        <Search
          title="List of the coins"
          list="Homepage-List of the coins"
          handleInputChange={handleInputChange}
          handleSearch={handleSearch}
          isFilterVisible={isFilterVisible}
          toggleClick={() => setVisibilityFilter(!isFilterVisible)}
          filter="Advanced filter"
          showIcon={true}
        />
        {isFilterVisible ? (
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
        ) : (
          <HomePage2
            searchValue={searchValue}
            handleSearch={handleSearch}
            form={obj}
            setForm={(obj) => setObj(obj)}
          />
        )}
      </div>
    </>
  );
};

export default ListOfTheCoins;
