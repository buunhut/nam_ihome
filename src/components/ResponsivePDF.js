// import React, { useState, useRef, useEffect } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import "./ResponsivePDF.css";

// // Cấu hình PDF.js worker
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// const ResponsivePDF = ({ fileUrl }) => {
//   const [numPages, setNumPages] = useState(null);
//   const [width, setWidth] = useState(800); // Default width
//   const containerRef = useRef();

//   useEffect(() => {
//     const handleResize = () => {
//       if (containerRef.current) {
//         const newWidth = containerRef.current.offsetWidth;
//         setWidth(newWidth > 800 ? 800 : newWidth - 10); // Giới hạn max 800px
//       }
//     };

//     handleResize(); // Resize lần đầu
//     window.addEventListener("resize", handleResize); // Resize khi thay đổi màn hình

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div className="pdf-wrapper" ref={containerRef}>
//       <Document
//         file={fileUrl}
//         onLoadSuccess={({ numPages }) => setNumPages(numPages)}
//         loading="Đang tải PDF..."
//       >
//         {Array.from(new Array(numPages), (el, index) => (
//           <Page key={index} pageNumber={index + 1} width={width} />
//         ))}
//       </Document>
//     </div>
//   );
// };

// export default ResponsivePDF;
