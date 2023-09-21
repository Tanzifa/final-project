import React from "react";
import classes from "../components/Search.module.css";

const Search = ({
  title,
  list,
  filter,
  handleClick,
  handleFilter,
  handleChange,
}) => {
  return (
    <>
      <h2>{title}</h2>
      <span>{list}</span>
      <form>
        <label htmlFor="field">Input field</label>
        <br />
        <input
          type="text"
          name="field"
          id="field"
          onChange={() => handleChange(e)}
        />
        <button className={classes.btn} onClick={handleFilter}>
          Search
        </button>

        <p onClick={handleClick} className={classes.filter}>
          {filter}
        </p>
      </form>
    </>
  );
};

export default Search;
