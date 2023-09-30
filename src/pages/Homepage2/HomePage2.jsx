import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./HomePage2.module.css";
import "../../Fonts.css";
const HomePage2 = ({ form, setForm }) => {
  const [blogs, setBlogs] = useState([]);
  const [countries, setCountries] = useState([]);
  const [metals, setMetals] = useState([]);
  const [quality, setQualityOfTheCoin] = useState([]);
  const getBlogs = async () => {
    const blo = await axios.get(" http://localhost:3004/blogs");
    setBlogs(blo.data);
    setCountries([...new Set(blo.data.map((blog) => blog.country))]); //optionlarda her birinin bir defe gorsenmesi ucun
    setMetals([...new Set(blo.data.map((blog) => blog.metal))]);
    setQualityOfTheCoin([
      ...new Set(blo.data.map((blog) => blog.qualityOftheCoin)),
    ]);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <>
      <div className={classes.container}>
        <form>
          <div className={classes.selectBoxes}>
            <div className={classes.selectBox}>
              <label htmlFor="countryFilter">Issuing country</label>
              <select
                id="countryFilter"
                onChange={(e) => setForm({ ...form, country: e.target.value })}
              >
                {countries &&
                  countries.map((country, i) => (
                    <option key={i}>{country}</option>
                  ))}
              </select>
            </div>
            <div>
              <p className={classes.priceHead}>Price</p>
              <div className={classes.priceBox}>
                <div>
                  <label>from</label>
                  <input
                    type="number"
                    value={form.minPrice}
                    onChange={(e) =>
                      setForm({ ...form, minPrice: e.target.value })
                    }
                  />
                </div>
                <div className={classes.maxPrice}>
                  <label>to</label>
                  <input
                    type="number"
                    value={form.maxPrice}
                    onChange={(e) =>
                      setForm({ ...form, maxPrice: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={classes.selectBoxes}>
            <div className={classes.selectBox}>
              <label htmlFor="metalFilter">Metal</label>
              <select
                id="metalFilter"
                onChange={(e) => setForm({ ...form, metal: e.target.value })}
              >
                {metals &&
                  metals.map((metal, i) => <option key={i}>{metal}</option>)}
              </select>
            </div>
            <div>
              <p className={classes.priceHead}>Year of issue</p>
              <div className={classes.priceBox}>
                <div>
                  <label>from</label>
                  <input
                    type="number"
                    value={form.minYearOfIssue}
                    onChange={(e) =>
                      setForm({ ...form, minYearOfIssue: e.target.value })
                    }
                  />
                </div>
                <div className={classes.maxPrice}>
                  <label>to</label>
                  <input
                    type="number"
                    value={form.maxYearOfIssue}
                    onChange={(e) =>
                      setForm({ ...form, maxYearOfIssue: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={classes.selectBox}>
            <label htmlFor="qualityCoin">Quality of the coin</label>
            <select
              id="qualityCoin"
              onChange={(e) =>
                setForm({ ...form, qualityOftheCoin: e.target.value })
              }
            >
              {quality &&
                quality.map((qualityOftheCoin, i) => (
                  <option key={i}>{qualityOftheCoin}</option>
                ))}
            </select>
          </div>
        </form>
        <div></div>
      </div>
    </>
  );
};

export default HomePage2;
