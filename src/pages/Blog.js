// import React, { useEffect, useState } from "react";
// import TopMenu from "../components/TopMenu";
// import { useSelector } from "react-redux";
// import "./blog.scss"; // Thêm file CSS mới
// import ResponsivePDF from "../components/ResponsivePDF";

// const Blog = () => {
//   const { baiPhanTich } = useSelector((state) => state.dataSlice);
//   const [openPhanTich, setOpenPhanTich] = useState("");

//   useEffect(() => {
//     if (baiPhanTich.length > 0) {
//       setOpenPhanTich(baiPhanTich[0].file);
//     }
//   }, [baiPhanTich]);

//   return (
//     <div id="blog" className="blog-container">
//       <TopMenu />
//       <h1 className="blog-title">Tổng hợp các bài phân tích thị trường</h1>
//       <ul className="blog-list">
//         {baiPhanTich?.map((item, index) => {
//           return (
//             <li
//               key={index}
//               onClick={() => {
//                 setOpenPhanTich(item.file);
//               }}
//               className={`blog-item ${
//                 item.file === openPhanTich ? "active" : ""
//               }`}
//             >
//               {item.name}
//             </li>
//           );
//         })}
//       </ul>
//       {openPhanTich && <ResponsivePDF fileUrl={`/pdf/${openPhanTich}`} />}
//     </div>
//   );
// };

// export default Blog;
