import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./HomePage2.module.css";


const HomePage2 = ({form, setForm}) => {

  const [blogs, setBlogs] = useState([]);

  
  const getBlogs = async () => {
    const blo = await axios.get(" http://localhost:3004/blogs");
    setBlogs(blo.data);
  };


  useEffect(() => {
    getBlogs();
  }, []);


  return (
    <>
      <div className={classes.container}>
        <form>
          <div className={classes.selectBox}>
            <label htmlFor="countryFilter">Issuing country</label>
            <select id="countryFilter" onChange={(e) => setForm({...form, country: e.target.value})}>
              {blogs && blogs.map((blog) => <option>{blog.country}</option>)}
            </select>
          </div>
          <div className={classes.selectBox}>
            <label htmlFor="metalFilter">Metal</label>
            <select id="metalFilter"  onChange={(e) => setForm({...form, metal: e.target.value})}>
              {blogs && blogs.map((blog) => <option>{blog.metal}</option>)}
            </select>
          </div>
          <div className={classes.selectBox}>
            <label htmlFor="qualityCoin">Quality of the coin</label>
            <select id="qualityCoin"  onChange={(e) => setForm({...form, qualityOftheCoin: e.target.value})}>
              {blogs &&
                blogs.map((blog) => <option>{blog.qualityOftheCoin}</option>)}
            </select>
          </div>
        </form>
        <div>
          <div>
            <p>Price</p>
            <div>
              <label>Min Price:</label>
              <input
                type="number"
                value={form.minPrice}
                onChange={(e) => setForm({...form, minPrice: e.target.value})}
              />
            </div>
            <div>
              <label>Max Price:</label>
              <input
                type="number"
                value={form.maxPrice}
                onChange={(e) => setForm({...form, maxPrice: e.target.value})}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage2;