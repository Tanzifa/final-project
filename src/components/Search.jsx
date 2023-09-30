import React from "react";
import classes from "../components/Search.module.css";
import ArrowDown from "../assets/images/downArrow.png";
import ArrowUp from "../assets/images/up-arrow-5.png";

const Search = ({
  title,
  list,
  filter,
  toggleClick,
  isFilterVisible,
  handleInputChange,
  handleSearch,
  showIcon = true,
}) => {
  const [inputValue, setInputValue] = React.useState("");
  //......Axtaris komponenti
  return (
    <>
      <h2>{title}</h2>
      <span>{list}</span>
      <div className={classes.inputField}>
        <label className={classes.field} htmlFor="field">
          Input field
        </label>
        <br />
        <input
          onChange={(e) => {
            if (handleInputChange) handleInputChange(e);
            setInputValue(e.target.value);
          }}
          value={inputValue}
          type="text"
          name="field"
          id="field"
        />
        <button
          type="submit"
          onClick={() => handleSearch(inputValue)}
          className={classes.btn}
        >
          Search
        </button>
        <div className={classes.filter} onClick={toggleClick}>
          {filter}
          {showIcon && (
            <img src={isFilterVisible ? ArrowDown : ArrowUp} alt="arrow" />
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
