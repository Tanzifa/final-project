import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./CoinAbout.module.css";

const CoinAbout = ({
  LinkToObverseImage,
  topicName,
  shortDescription,
  key,
  handleClick,
}) => (
  <div className={classes.coinAbout} onClick={handleClick}>
    <div key={key} className={classes.imgBox}>
      <img src={LinkToObverseImage} />
    </div>

    <div className={classes.coinDescription}>
      <span className={classes.title}>{topicName}</span>
      <p className={classes.description}>{shortDescription}</p>
    </div>
  </div>
);

export default CoinAbout;
