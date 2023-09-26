import React from "react";
import classes from "./Title.module.css";

const Title = ({ title }) => {
  return <div className={classes.head}>{title}</div>;
};

export default Title;
