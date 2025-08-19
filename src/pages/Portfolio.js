// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import TopMenu from "../components/TopMenu";
// import { useNavigate } from "react-router-dom";
// import { updateSelectedCategory } from "../redux/dataSlice";

// const Portfolio = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { products, selectedCategory } = useSelector(
//     (state) => state.dataSlice
//   );
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   const [keyword, setKeyword] = useState("");

//   // Lấy danh sách category không trùng
//   const uniqueCategories = [
//     ...new Set(products.flatMap((product) => product.categories)),
//   ];

//   const handleSearchProduct = (e) => {
//     const { value } = e.target;
//     setKeyword(value);
//   };

//   useEffect(() => {
//     // Bước 1: lọc theo category
//     let productsAfterCategoryFilter = [];

//     if (selectedCategory === "All") {
//       // Lọc trùng theo ma (bỏ trùng tên)
//       const uniqueMap = new Map();
//       products.forEach((sp) => {
//         const key = sp.ma.trim().toLowerCase();
//         if (!uniqueMap.has(key)) {
//           uniqueMap.set(key, sp);
//         }
//       });
//       productsAfterCategoryFilter = Array.from(uniqueMap.values());
//     } else {
//       productsAfterCategoryFilter = products.filter((sp) =>
//         sp.categories.includes(selectedCategory)
//       );
//     }

//     // Bước 2: lọc theo từ khóa
//     if (keyword.trim() !== "") {
//       const lowerKeyword = keyword.toLowerCase();
//       productsAfterCategoryFilter = productsAfterCategoryFilter.filter(
//         (sp) =>
//           sp.proName.toLowerCase().includes(lowerKeyword) ||
//           sp.title?.toLowerCase().includes(lowerKeyword) ||
//           sp.ma.toLowerCase().includes(lowerKeyword) ||
//           sp.giaBan.toLowerCase().includes(lowerKeyword) ||
//           sp.chuNha.toLowerCase().includes(lowerKeyword) ||
//           sp.address.toLowerCase().includes(lowerKeyword)
//       );
//     }

//     setFilteredProducts(productsAfterCategoryFilter);
//   }, [selectedCategory, products, keyword]);

//   return (
//     <div id="portfolio">
//       {/* trượt xuống 200px thì menu xuất hiện, có hiệu ứng giản từ trên xuống*/}
//       <TopMenu />

//       <div className="banner"></div>
//       <div className="content">
//         {/* Tabs */}
//         <div className="tab">
//           <ul>
//             <li
//               style={{
//                 borderBottom:
//                   selectedCategory === "All" ? "3px solid black" : "",
//                 color: selectedCategory === "All" ? "black" : "",
//               }}
//               onClick={() => dispatch(updateSelectedCategory("All"))}
//             >
//               All
//             </li>
//             {uniqueCategories.map((cat, index) => (
//               <li
//                 key={index}
//                 style={{
//                   borderBottom:
//                     selectedCategory === cat ? "3px solid black" : "",
//                   color: selectedCategory === cat ? "black" : "",
//                 }}
//                 onClick={() => {
//                   dispatch(updateSelectedCategory(cat));
//                 }}
//               >
//                 {cat}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="searchBar">
//           <input
//             type="text"
//             placeholder="Tìm kiếm,..."
//             onChange={handleSearchProduct}
//           />

//           <select name="" id="">
//             <option value="">Dưới 3 tỷ</option>
//             <option value="">Từ 3 tỷ đến 6 tỷ</option>
//             <option value="">Từ 6 tỷ đến 10 tỷ</option>
//             <option value="">Từ 10 tỷ đến 20 tỷ</option>
//             <option value="">Từ 20 tỷ đến 50 tỷ</option>
//             <option value="">Từ 50 tỷ đến 100 tỷ</option>
//             <option value="">Từ 100 tỷ đến 200 tỷ</option>
//             <option value="">Trên 200 tỷ</option>
//           </select>
//         </div>

//         {/* Products */}
//         <div className="product">
//           {filteredProducts.map((item, index) => (
//             <div
//               className="productItem"
//               key={`${selectedCategory}-${index}`}
//               onClick={() => {
//                 navigate(`${item.ma}`);
//               }}
//             >
//               <div className="imgWrapper">
//                 <img
//                   src={`/img/${item.allPhoto[[0]]}`}
//                   alt={item.proName || "No photo"}
//                 />
//               </div>
//               <p className="proName">{item.proName}</p>
//               <p className="title">{item.title}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Portfolio;

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
  const [priceFilter, setPriceFilter] = useState(""); // lọc theo giá
  const [sortOrder, setSortOrder] = useState(""); // sắp xếp giá asc | desc

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

    // Bước 3: lọc theo giá
    if (priceFilter !== "") {
      const [min, max] = priceFilter.split("-").map(Number);

      productsAfterCategoryFilter = productsAfterCategoryFilter.filter((sp) => {
        const gia = Number(sp.giaBan.replace(/\D/g, "")); // bỏ ký tự không phải số
        if (!isNaN(min) && isNaN(max)) return gia >= min; // chỉ có min
        if (isNaN(min) && !isNaN(max)) return gia <= max; // chỉ có max
        return gia >= min && gia <= max;
      });
    }

    // Bước 4: sắp xếp theo giá
    if (sortOrder !== "") {
      productsAfterCategoryFilter.sort((a, b) => {
        const giaA = Number(a.giaBan.replace(/\D/g, ""));
        const giaB = Number(b.giaBan.replace(/\D/g, ""));
        return sortOrder === "asc" ? giaA - giaB : giaB - giaA;
      });
    }

    setFilteredProducts(productsAfterCategoryFilter);
  }, [selectedCategory, products, keyword, priceFilter, sortOrder]);

  return (
    <div id="portfolio">
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

          {/* Lọc giá */}
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="">Tất cả</option>
            <option value="0-3">Dưới 3 tỷ</option>
            <option value="3-6">3 tỷ → 6 tỷ</option>
            <option value="6-10">6 tỷ → 10 tỷ</option>
            <option value="10-20">10 tỷ → 20 tỷ</option>
            <option value="20-50">20 tỷ → 50 tỷ</option>
            <option value="50-100">50 tỷ → 100 tỷ</option>
            <option value="100-200">100 tỷ → 200 tỷ</option>
            <option value="200-1000000000">Trên 200 tỷ</option>
          </select>

          {/* Sắp xếp giá */}
          {/* <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Mặc định</option>
            <option value="asc">Giá tăng dần</option>
            <option value="desc">Giá giảm dần</option>
          </select> */}
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
              {/* <p className="price">{item.giaBan}</p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
