import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const useSearch = () => {
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:3004/categories");
      setCategories(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchValue !== "") {
      const filtered = categories.filter((category) =>
        category.topic.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(categories);
    }
  }, [searchValue, categories]);
  return <>categories, searchValue, setSearchValue, filteredData,</>;
};

export default useSearch;
