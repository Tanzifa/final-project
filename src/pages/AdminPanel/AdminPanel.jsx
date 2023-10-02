import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "../../components/Search";
import CoinAbout from "../../components/CoinAbout/CoinAbout";
import classes from "./AdminPanel.module.css";
import { useNavigate, useParams } from "react-router-dom";
import "../../Fonts.css";
const AdminPanel = () => {
  const [blogs, setBlogs] = useState([]);
  const [filterId, setFilterId] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const { id } = useParams();

  const getBlogs = async () => {
    const blo = await axios.get(
      `http://localhost:3004/blogs?${filterId ? "topicId=" + filterId : ""}`
    );

    console.log(typeof id);
    console.log(!id);
    if (!id) {
      //id yoxdursa hamisini oxxuyur
      console.log("AdminPanel link without id");
      setBlogs(blo.data);
    } else if (isNumeric(id)) {
      //id ededdirse id-ye uygun kategoriyanin coinlerini admin panelde gosterir
      console.log("ife girdik");
      const filteredBlogs = blo.data.filter((item) => item.topicId == id);
      setBlogs(filteredBlogs);
    } else {
      //eks halda yeni homepage2-daki sorguya uygun coinleri gosterir
      console.log("ELSEYE KECDIK");

      let filterData = JSON.parse(id); //id-ini obyekte cevirir
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
        const minYearOfIssuePass =
          !filterData.minYearOfIssue || item.price >= filterData.minYearOfIssue;
        const maxYearOfIssuePass =
          !filterData.maxYearOfIssue || item.price <= filterData.maxYearOfIssue;
        const country =
          !filterData.country || item.country == filterData.country;
        const metal =
          !filterData.metal || item.metal.includes(filterData.metal);
        const qualityOftheCoin =
          !filterData.qualityOftheCoin ||
          // !item.qualityOftheCoin ||
          item.qualityOftheCoin.includes(filterData.qualityOftheCoin);

        return (
          searchValueFilter &&
          minPricePass &&
          maxPricePass &&
          minYearOfIssuePass &&
          maxYearOfIssuePass &&
          country &&
          metal &&
          qualityOftheCoin
        );
      });

      setBlogs(filteredBlogsCommon);
    }
  };

  function isNumeric(str) {
    //id-nin eded oldugunu yoxlamaq ucun funksiya
    return !isNaN(str) && !isNaN(parseFloat(str));
  }

  useEffect(() => {
    getBlogs();
  }, []);

  async function handleDelete(id) {
    //id-ye uygun blogu silir
    await axios.delete("http://localhost:3004/blogs/" + id);
    getBlogs();
  }

  function handleClick(id) {
    //coine-basilanda coinsdescriptiona gedir
    navigate(`/coinsdescription/${id}`);
  }

  const handleEdit = (id) => {
    //edit ucun adminpanel-2ye gedir
    navigate(`/adminPanel2/${id}`);
  };

  function handleInputChange(event) {
    //inputdan gelen melumatlari searchValue-ya yazir
    setSearchValue(event.target.value);
  }

  function handleSearch() {
    //search inputuna yazilan melumatla coinin topicName muqayise edilir.hemin adli blog varsa onlari gosterir
    const result = blogs.filter((blog) =>
      blog.topicName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setBlogs(result);
  }

  return (
    <>
      <div className={classes.container}>
        <Search
          title="Admin Panel"
          handleInputChange={handleInputChange}
          handleSearch={handleSearch}
          showIcon={false}
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
