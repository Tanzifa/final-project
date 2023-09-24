import React from "react";
import classes from "../components/Search.module.css";
import ArrowDown from "../assets/images/arrowDown.png";
import ArrowUp from "../assets/images/arrowUp.png";

const Search = ({
  title,
  list,
  filter,
  toggleClick,
  isFilterVisible,
  handleInputChange,
  handleSearch,
}) => {
  // Локальное состояние для хранения значения поля ввода
  const [inputValue, setInputValue] = React.useState("");

  return (
    <>
      <h2>{title}</h2>
      <span>{list}</span>
      <div>
        <label htmlFor="field">Input field</label>
        <br />
        <input
          onChange={(e) => {
            if (handleInputChange) handleInputChange(e.target.value);
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
          <img src={isFilterVisible ? ArrowDown : ArrowUp} alt="arrow" />
        </div>
      </div>
    </>
  );
};

export default Search;
