import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "../../components/search";
import CoinAbout from "../../components/CoinAbout/CoinAbout";
import classes from "./AdminPanel.module.css";
import { useNavigate, useParams } from "react-router-dom";

const AdminPanel = () => {
  const [blogs, setBlogs] = useState([]);
  const [filterId, setFilterId] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const { id } = useParams();

  console.log("==============", JSON.parse(id));

  // const searchBy = (arr = [], searchKeys = [], value = '') => {
  //   return arr.filter(item =>
  //     searchKeys.length ? searchKeys.some(key =>
  //       (item[key] || "").toLowerCase().includes(value.toLowerCase())
  //     ) : true
  //   );
  // };

  const getBlogs = async () => {
    const blo = await axios.get(
      `http://localhost:3004/blogs?${filterId ? "topicId=" + filterId : ""}`
    );
    console.log(typeof id);
    if (isNumeric(id)) {
      console.log("ife girdik");
      const filteredBlogs = blo.data.filter((item) => item.topicId == id);
      setBlogs(filteredBlogs);
    } else {
      console.log("ELSEYE KECDIK");

      let filterData = JSON.parse(id);
      console.log("AdminPanel search value", filterData.searchValue);
      const filteredBlogsCommon = blo.data.filter((item) => {
        const searchValueFilter =
          !filterData.searchValue ||
          item.topicName
            .toLowerCase()
            .includes(filterData.searchValue.toLowerCase());
        const minPricePass =
          !filterData.minPrice || item.price >= filterData.minPrice;
        const maxPricePass =
          !filterData.maxPrice || item.price <= filterData.maxPrice;
        const country =
          !filterData.country || item.country == filterData.country;
        const metal =
          !filterData.metal || item.metal.includes(filterData.metal);
        const qualityOftheCoin =
          !filterData.qualityOftheCoin ||
          !item.qualityOftheCoin ||
          item.qualityOftheCoin.includes(filterData.qualityOftheCoin);

        return (
          searchValueFilter &&
          minPricePass &&
          maxPricePass &&
          country &&
          metal &&
          qualityOftheCoin
        );
      });

      console.log("+++++++++++++", filteredBlogsCommon);
      setBlogs(filteredBlogsCommon);
    }
  };

  function isNumeric(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
  }

  useEffect(() => {
    getBlogs();
  }, []);

  async function handleDelete(id) {
    await axios.delete("http://localhost:3004/blogs/" + id);
    getBlogs();
  }

  function handleClick(id) {
    navigate(`/coinsdescription/${id}`);
  }

  const handleEdit = (id) => {
    navigate(`/adminPanel2/${id}`);
  };
  const handleFilter = async () => {
    const results = blogs.filter(
      (blog) => blog.topicName.toLowerCase() == searchTerm.toLowerCase()
    );
    setBlogs(results);
  };
  function handleChange(e) {
    setSearchTerm(e.target.value);
  }
  return (
    <>
      <div className={classes.container}>
        <Search title="Admin Panel" filter="Advanced filter" />
        {blogs &&
          blogs.map((blog) => (
            <>
              <div className={classes.box}>
                <CoinAbout
                  handleClick={() => handleClick(blog.id)}
                  key={blog.id}
                  LinkToObverseImage={blog.LinkToObverseImage}
                  shortDescription={blog.shortDescription}
                  topicName={blog.topicName}
                />
                <div className={classes.buttons}>
                  <button
                    className={classes.save}
                    onClick={() => handleEdit(blog.id)}
                  >
                    Edit
                  </button>
                  <button
                    className={classes.cancel}
                    onClick={() => handleDelete(blog.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </>
          ))}
        <div className={classes.add}>
          <Link to="/add">
            <div className={classes.circle}>+</div>
            <span className={classes.newIcon}>Add a new icon</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
