import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Search from "../../components/search";
import classes from "./HomePage2.module.css";
const HomePage2 = () => {
  let k = 0;

  const [blogs, setBlogs] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const getBlogs = async () => {
    const blo = await axios.get(" http://localhost:3004/blogs");
    setBlogs(blo.data);
    console.log(blo.data);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }
  const handleFilter = blogs.filter((blog) => {
    return (
      blog.country.includes(countryFilter) &&
      blog.metal.includes(metalFilter) &&
      blog.price >= (minPrice !== "" ? parseFloat(minPrice) : 0) &&
      blog.price <= (maxPrice !== "" ? parseFloat(maxPrice) : Infinity) &&
      blog.issueYear.includes(issueYearFilter)
    );
  });
  return (
    <>
      <div className={classes.container}>
        <Search
          title="HomePage"
          filter="Advanced filter &#9206;"
          handleClick={handleClick}
          handleFilter={handleFilter}
        />
        <div>
          <div className={classes.selectBox}>
            <label htmlFor="countryFilter">Issuing country</label>
            <select id="countryFilter">
              {blogs && blogs.map((blog) => <option>{blog.country}</option>)}
            </select>
          </div>
          <div className={classes.selectBox}>
            <label htmlFor="metalFilter">Metal</label>
            <select id="metalFilter">
              {blogs && blogs.map((blog) => <option>{blog.metal}</option>)}
            </select>
          </div>
          <div className={classes.selectBox}>
            <label htmlFor="qualityCoin">Quality of the coin</label>
            <select id="qualityCoin">
              {blogs &&
                blogs.map((blog) => <option>{blog.qualityOftheCoin}</option>)}
            </select>
          </div>
        </div>
        <div>
          <div>
            <p>Price</p>
            <div>
              <label>Min Price:</label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            <div>
              <label>Max Price:</label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage2;
