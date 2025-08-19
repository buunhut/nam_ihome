import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopMenu from "../components/TopMenu";
import { useNavigate } from "react-router-dom";
import { updateSelectedCategory } from "../redux/dataSlice";

const Portfolio = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, selectedCategory } = useSelector(
    (state) => state.dataSlice
  );
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [keyword, setKeyword] = useState("");

  // Lấy danh sách category không trùng
  const uniqueCategories = [
    ...new Set(products.flatMap((product) => product.categories)),
  ];

  const handleSearchProduct = (e) => {
    const { value } = e.target;
    setKeyword(value);
  };

  useEffect(() => {
    // Bước 1: lọc theo category
    let productsAfterCategoryFilter = [];

    if (selectedCategory === "All") {
      // Lọc trùng theo ma (bỏ trùng tên)
      const uniqueMap = new Map();
      products.forEach((sp) => {
        const key = sp.ma.trim().toLowerCase();
        if (!uniqueMap.has(key)) {
          uniqueMap.set(key, sp);
        }
      });
      productsAfterCategoryFilter = Array.from(uniqueMap.values());
    } else {
      productsAfterCategoryFilter = products.filter((sp) =>
        sp.categories.includes(selectedCategory)
      );
    }

    // Bước 2: lọc theo từ khóa
    if (keyword.trim() !== "") {
      const lowerKeyword = keyword.toLowerCase();
      productsAfterCategoryFilter = productsAfterCategoryFilter.filter(
        (sp) =>
          sp.proName.toLowerCase().includes(lowerKeyword) ||
          sp.title?.toLowerCase().includes(lowerKeyword) ||
          sp.ma.toLowerCase().includes(lowerKeyword) ||
          sp.giaBan.toLowerCase().includes(lowerKeyword) ||
          sp.chuNha.toLowerCase().includes(lowerKeyword) ||
          sp.address.toLowerCase().includes(lowerKeyword)
      );
    }

    setFilteredProducts(productsAfterCategoryFilter);
  }, [selectedCategory, products, keyword]);

  return (
    <div id="portfolio">
      {/* trượt xuống 200px thì menu xuất hiện, có hiệu ứng giản từ trên xuống*/}
      <TopMenu />

      <div className="banner"></div>
      <div className="content">
        {/* Tabs */}
        <div className="tab">
          <ul>
            <li
              style={{
                borderBottom:
                  selectedCategory === "All" ? "3px solid black" : "",
                color: selectedCategory === "All" ? "black" : "",
              }}
              onClick={() => dispatch(updateSelectedCategory("All"))}
            >
              All
            </li>
            {uniqueCategories.map((cat, index) => (
              <li
                key={index}
                style={{
                  borderBottom:
                    selectedCategory === cat ? "3px solid black" : "",
                  color: selectedCategory === cat ? "black" : "",
                }}
                onClick={() => {
                  dispatch(updateSelectedCategory(cat));
                }}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        <div className="searchBar">
          <input
            type="text"
            placeholder="Tìm kiếm,..."
            onChange={handleSearchProduct}
          />
        </div>

        {/* Products */}
        <div className="product">
          {filteredProducts.map((item, index) => (
            <div
              className="productItem"
              key={`${selectedCategory}-${index}`}
              onClick={() => {
                navigate(`${item.ma}`);
              }}
            >
              <div className="imgWrapper">
                <img
                  src={`/img/${item.allPhoto[[0]]}`}
                  alt={item.proName || "No photo"}
                />
              </div>
              <p className="proName">{item.proName}</p>
              <p className="title">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
