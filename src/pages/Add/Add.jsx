import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Title from "../../components/Title/Title";
import classes from "./Add.module.css";
import { Navigate, useNavigate } from "react-router-dom";

const Add = () => {
  const [blogs, setBlogs] = useState();
  const [values, setValues] = useState({
    topicName: "",
    faceValue: "",
    shortDescription: "",
    longDescription: "",
    YearOfIssue: "",
    price: "",
    country: "",
    metal: "",
    LinkToObverseImage: "",
    LinkToReverseImage: "",
    qualityOftheCoin: "",
    Weight: "",
  });

  const navigate = useNavigate();

  const getBlogs = async () => {
    const blo = await axios.get(" http://localhost:3004/blogs/");
    setBlogs(blo.data);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const handleChange = (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(" http://localhost:3004/blogs/", values);
    navigate(`/adminpanel`);
  };
  function cancelClick() {
    navigate(`/adminpanel`);
  }
  return (
    <>
      <div className={classes.container}>
        <Title title="Admin Panel" />
        <form className={classes.adminPanelForm}>
          <div className={classes.boxpart}>
            <div className={classes.inputBoxes}>
              <div className={classes.inputBox}>
                <label htmlFor="topicName">Coin name</label>
                <br />
                <input
                  type="text"
                  name="topicName"
                  onChange={handleChange}
                  id="topicName"
                />
              </div>
              <div className={classes.inputBox}>
                <label htmlFor="faceValue">Face Value</label>
                <br />
                <input
                  onChange={handleChange}
                  type="text"
                  name="faceValue"
                  id="faceValue"
                />
              </div>
            </div>

            <div className={classes.inputBox}>
              <label htmlFor="shortDescription">Short description</label>
              <br />
              <textarea
                onChange={handleChange}
                name="shortDescription"
                id=""
              ></textarea>
            </div>

            <div className={classes.inputBoxes}>
              <div className={classes.inputBox}>
                <label htmlFor="LinkToObverseImage">
                  Link to obverse image
                </label>
                <br />
                <input
                  type="text"
                  onChange={handleChange}
                  name="LinkToObverseImage"
                  id="obverseImage"
                />
              </div>
              <div className={classes.inputBox}>
                <label htmlFor="reverseImage">Link to obverse image</label>
                <br />
                <input
                  type="text"
                  name="reverseImage"
                  id="reverseImage"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className={classes.boxpart}>
            <div className={classes.inputBoxes}>
              <div className={classes.inputBox}>
                <label htmlFor="YearOfIssue">Year of issue</label>
                <br />
                <input
                  type="text"
                  name="YearOfIssue"
                  id="YearOfIssue"
                  onChange={handleChange}
                />
              </div>
              <div className={classes.inputBox}>
                <label htmlFor="price">Price</label>
                <br />
                <input
                  type="text"
                  name="price"
                  id="price"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={classes.inputBox}>
              <label htmlFor="longDescription">Long description</label>
              <br />
              <textarea
                name="longDescription"
                id=""
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <div className={classes.boxpart}>
            <div className={classes.inputBox}>
              <label htmlFor="country">Country</label>
              <br />
              <input
                type="text"
                name="country"
                id="country"
                onChange={handleChange}
              />
            </div>

            <div className={classes.inputBox}>
              <label htmlFor="qualityOftheCoin">Quality of the coin</label>
              <br />
              <input
                type="text"
                name="qualityOftheCoin"
                id="qualityOftheCoin"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={classes.boxpart}>
            <div className={classes.inputBox}>
              <label htmlFor="metal">Metal</label>
              <br />
              <input
                type="text"
                name="metal"
                id="metal"
                onChange={handleChange}
              />
            </div>
            <div className={classes.inputBox}>
              <label htmlFor="weight">Weight</label>
              <br />
              <input
                type="text"
                name="weight"
                id="weight"
                onChange={handleChange}
              />
            </div>
            <div className={classes.clickButtons}>
              <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
                className={classes.save}
              >
                Save
              </button>
              <button
                className={classes.cancel}
                onClick={() => {
                  cancelClick();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Add;
