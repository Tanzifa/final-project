// useSearchLogic.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useSearchLogic = (initialState = {}) => {
  const [categories, setcategories] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSerachValue] = useState("");
  const [isFilterVisible, setVisibilityFilter] = useState([]);

  const [obj, setObj] = useState({
    searchValue: "",
    minPrice: "",
    maxPrice: "",
    country: "",
    metal: "",
    qualityOftheCoin: "",
  });

  const navigate = useNavigate();

  const getcategories = async () => {
    const top = await axios.get("http://localhost:3004/categories");
    setcategories(top.data);
  };

  useEffect(() => {
    getcategories();
  }, []);

  const handleSearch = (value) => {
    console.log("Search value:", value);
    setSerachValue(value);

    let newObj = {
      ...obj,
      searchValue: value,
    };
    navigate(`/adminpanel/${JSON.stringify(newObj)}`);
  };

  const handleInputChange = (value) => {
    console.log("Input changed:", value);
  };

  return {
    categories,
    filteredData,
    isFilterVisible,
    searchValue,
    handleSearch,
    handleInputChange,
    setVisibilityFilter,
    obj,
    setObj,
  };
};
