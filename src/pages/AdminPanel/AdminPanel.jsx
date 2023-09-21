import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "../../components/search";
import CoinAbout from "../../components/CoinAbout/CoinAbout";
import AdminPanel2 from "../AdminPanel2/AdminPanel2";
import classes from "./AdminPanel.module.css";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [blogs, setBlogs] = useState([]);
  const [filterId, setFilterId] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const getBlogs = async () => {
    const blo = await axios.get(
      `http://localhost:3004/blogs?${filterId ? "topicId=" + filterId : ""}`
    );
    setBlogs(blo.data);
    console.log(blo.data);
  };

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
        <Search
          title="Admin Panel"
          handleFilter={handleFilter}
          handleChange={handleChange}
        />
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
