import { useState, useEffect } from "react";
import classes from "./AdminPanel2.Module.css";
import { useParams } from "react-router-dom";
import Title from "../../components/Title/Title";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../Fonts.css";
const AdminPanel2 = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);

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

  const getBlogs = async () => {
    const blo = await axios.get(" http://localhost:3004/blogs/" + id);
    setValues(blo.data);
  };

  useEffect(() => {
    getBlogs();
  }, [id]);

  const handleChange = (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
    input.value = "";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(" http://localhost:3004/blogs/" + id, values);
    navigate(`/adminpanel`);
  };

  function cancelClick() {
    navigate(`/adminpanel`);
  }
  return (
    <>
      <div className={classes.container}>
        <Title title="Admin Panel" />
        <form
          onSubmit={(e) => handleSubmit(e)}
          className={classes.adminPanelForm}
        >
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
                  // defaultValue={blogs.topicName}
                  value={values.coinName}
                />
              </div>
              <div className={classes.inputBox}>
                <label htmlFor="faceValue">Face Value</label>
                <br />
                <input
                  onChange={handleChange}
                  value={values.faceValue}
                  // defaultValue={blogs.faceValue}
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
                // defaultValue={blogs.shortDescription}
                id="shortDescription"
                value={values.shortDescription}
              ></textarea>
            </div>

            <div className={classes.inputBoxes}>
              <div className={classes.inputBox}>
                <label htmlFor="obverseImage">Link to obverse image</label>
                <br />
                <input
                  type="text"
                  onChange={handleChange}
                  name="obverseImage"
                  // defaultValue={blogs.obverseImage}
                  id="obverseImage"
                  value={values.LinkToObverseImage}
                />
              </div>
              <div className={classes.inputBox}>
                <label htmlFor="reverseImage">Link to obverse image</label>
                <br />
                <input
                  type="text"
                  name="reverseImage"
                  id="reverseImage"
                  // defaultValue={blogs.reverseImage}
                  onChange={handleChange}
                  value={values.LinkToReverseImage}
                />
              </div>
            </div>
          </div>

          <div className={classes.boxpart}>
            <div className={classes.inputBoxes}>
              <div className="inputBox">
                <label htmlFor="YearOfIssue">Year of issue</label>
                <br />
                <input
                  type="text"
                  name="YearOfIssue"
                  id="YearOfIssue"
                  onChange={handleChange}
                  // defaultValue={blogs.YearOfIssue}
                  value={values.YearOfIssue}
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
                  defaultValue={blogs.price}
                  value={values.price}
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
                // defaultValue={blogs.longDescription}

                value={values.longDescription}
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
                // defaultValue={blogs.country}
                value={values.country}
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
                defaultValue={blogs.country}
                onChange={handleChange}
                value={values.qualityOftheCoin}
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
                defaultValue={blogs.country}
                value={values.metal}
              />
            </div>
            <div className={classes.inputBox}>
              <label htmlFor="weight">Weight</label>
              <br />
              <input
                type="text"
                name="weight"
                id="weight"
                defaultValue={blogs.weight}
                onChange={handleChange}
                value={values.Weight}
              />
            </div>
            <div className={classes.clickButtons}>
              <button className={classes.save}>Save</button>
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

export default AdminPanel2;
