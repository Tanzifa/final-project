import React, { useState, useEffect } from "react";
import classes from "./AdminPanel2.Module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminPanel2 = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);

  const [values, setValues] = useState({
    coinName: "",
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

  const getBlogs = async () => {
    const blo = await axios.get(" http://localhost:3004/blogs/" + id);
    setBlogs(blo.data);
  };

  useEffect(() => {
    getBlogs();
  }, [id]);

  const handleChange = (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = async () => {
    const data = {
      coinName: values.coinName,
      faceValue: values.faceValue,
      shortDescription: values.shortDescription,
      longDescription: values.longDescription,
      YearOfIssue: values.YearOfIssue,
      price: values.price,
      country: values.country,
      metal: values.metal,
      LinkToObverseImage: values.LinkToObverseImage,
      LinkToReverseImage: values.LinkToReverseImage,
      qualityOftheCoin: values.qualityOftheCoin,
      Weight: values.Weight,
    };

    await axios.put(" http://localhost:3004/blogs/" + id, data);
    navigate("/adminpanel");
  };
  function cancelClick() {
    navigate(`/adminpanel`);
  }
  return (
    <>
      <form className={classes.adminPanelForm}>
        <div className={classes.container}>
          <div className={classes.boxpart}>
            <div>
              <div className={classes.inputBox}>
                <label htmlFor="coinName">Coin name</label>
                <br />
                <input
                  type="text"
                  name="coinName"
                  onChange={handleChange}
                  id="coinName"
                  value={blogs.coinName}
                />
              </div>
              <div className={classes.inputBox}>
                <label htmlFor="faceValue">Face Value</label>
                <br />
                <input
                  onChange={handleChange}
                  value={blogs.faceValue}
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
                value={blogs.shortDescription}
              ></textarea>
            </div>

            <div>
              <div className={classes.inputBox}>
                <label htmlFor="obverseImage">Link to obverse image</label>
                <br />
                <input
                  type="text"
                  onChange={handleChange}
                  name="obverseImage"
                  id="obverseImage"
                  value={blogs.LinkToObverseImage}
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
                  value={blogs.LinkToReverseImage}
                />
              </div>
            </div>
          </div>

          <div className={classes.boxpart}>
            <div>
              <div className={classes.inputBox}>
                <label htmlFor="YearOfIssue">Year of issue</label>
                <br />
                <input
                  type="text"
                  name="YearOfIssue"
                  id="YearOfIssue"
                  onChange={handleChange}
                  value={blogs.YearOfIssue}
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
                  value={blogs.price}
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
                value={blogs.longDescription}
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
                value={blogs.country}
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
                value={blogs.qualityOftheCoin}
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
                value={blogs.metal}
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
                value={blogs.Weight}
              />
            </div>

            <button onClick={() => handleSubmit()} className={classes.save}>
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
    </>
  );
};

export default AdminPanel2;
