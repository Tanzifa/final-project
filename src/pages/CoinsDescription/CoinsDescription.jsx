import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from "./CoinsDescription.module.css";
import { Link } from "react-router-dom";

const CoinsDescription = () => {
  const [blog, setBlog] = useState([]);
  const { id } = useParams();

  const getBlogs = async () => {
    const blo = await axios.get("http://localhost:3004/blogs/" + id);
    setBlog(blo.data);
  };

  useEffect(() => {
    getBlogs();
  }, [id]);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.descriptionBox}>
          <div className={classes.coinsImage}>
            <img src={blog.LinkToObverseImage} alt="" />
            <img src={blog.LinkToReverseImage} alt="" />
          </div>
          <div className={classes.contentBox}>
            <div>
              <h3>{blog.topicName}</h3>
              <p>{blog.shortDescription}</p>
              <p>{blog.longDescription}</p>
            </div>
            <div className={classes.coinsTableRow}>
              <div className={classes.border}>
                <p>Issuing Country</p>
                <p>{blog.country}</p>
              </div>
              <div className={classes.border}>
                <p>Composition</p>
                <p>{blog.Composition}</p>
              </div>
              <div className={classes.border}>
                <p>Quality</p>
                <p>{blog.quality}</p>
              </div>
              <div className={classes.border}>
                <p>Denomination</p>
                <p>{blog.denomination}</p>{" "}
                {/* Ассумпция, что у вас есть поле denomination */}
              </div>
              <div className={classes.border}>
                <p>Year</p>
                <p>{blog.YearOfIssue}</p>
              </div>
              <div className={classes.border}>
                <p>Weight</p>
                <p>{blog.Weight}</p>
              </div>
              <div className={classes.border}>
                <p>Price</p>
                <p>{blog.price}</p>
              </div>
            </div>
            <div className={classes.backToList}>
              <Link to="../listofthecoins">Back to list</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoinsDescription;
