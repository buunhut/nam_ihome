import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import TopMenu from "../components/TopMenu";
import { useDispatch, useSelector } from "react-redux";
import { updateLogin } from "../redux/dataSlice";

import { Image } from "antd";

const Detail = () => {
  const dispatch = useDispatch();
  const { ten } = useParams();
  const { products, selectedCategory } = useSelector(
    (state) => state.dataSlice
  );
  const [detail, setDetail] = useState("");

  useEffect(() => {
    const find = products.find((item) => item.ma === ten);
    setDetail(find);
  }, [ten, products]);

  const tinhDonGiaTheoM2 = (data) => {
    try {
      // 1. Chuyển "2,2 tỷ" thành số
      const giaBanStr = data.giaBan
        .toLowerCase()
        .replace(",", ".") // chuyển 2,2 => 2.2
        .replace(/[^0-9.]/g, ""); // giữ lại số và dấu chấm

      const giaBan = parseFloat(giaBanStr) * 1_000_000_000; // nhân với 1 tỷ

      if (isNaN(giaBan) || giaBan === 0) {
        throw new Error("Không xác định được giá bán hợp lệ.");
      }

      // 2. Tìm số công nhận m2 từ chuỗi dienTich (VD: "công nhận 533m2")
      const dienTichMatch = data.dienTich.match(/công nhận\s+([\d.]+)/i);
      const dienTich = dienTichMatch ? parseFloat(dienTichMatch[1]) : null;

      if (!dienTich) {
        throw new Error("Không tìm thấy diện tích công nhận.");
      }

      // 3. Tính đơn giá
      const donGia = giaBan / dienTich;

      return {
        donGia, // đơn giá tính theo đồng/m2
      };
    } catch (error) {
      console.error("Lỗi khi tính đơn giá:", error.message);
      return null;
    }
  };

  const formatDonGiaToShortText = (value) => {
    if (!value || isNaN(value)) return "Không hợp lệ";

    if (value >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(2) + " tỷ";
    } else if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(2) + " triệu";
    } else if (value >= 1_000) {
      return (value / 1_000).toFixed(2) + " nghìn";
    } else {
      return value.toString();
    }
  };

  const [copy, setCopy] = useState(false);

  const handleClickCopy = () => {
    //viết dùm copy text của cả ul thay vì mình phải dùng chuột tô
    try {
      const ulElement = document.querySelector("#detail .content ul");
      if (!ulElement) return;

      // Lấy text của tất cả <li>
      const text = Array.from(ulElement.querySelectorAll("li"))
        .map((li) => li.innerText)
        .join("\n");

      navigator.clipboard.writeText(text).then(() => {
        // alert("Đã copy thông tin!");
        setCopy(true);
      });
    } catch (err) {
      console.error("Lỗi copy:", err);
    }
  };

  const { login } = useSelector((state) => state.dataSlice);

  useEffect(() => {
    dispatch(updateLogin(localStorage.getItem("login")));
  }, []);

  const [phoneNumber, setPhoneNumber] = useState("");

  const handleOpenApp = (app) => {
    if (!phoneNumber) {
      alert("Không tìm thấy số điện thoại!");
      return;
    }

    switch (app) {
      case "google":
        // Google search số điện thoại
        window.open(`https://www.google.com/search?q=${phoneNumber}`, "_blank");
        break;
      case "facebook":
        // Tìm trên Facebook (search query)
        window.open(
          `https://www.facebook.com/search/top?q=${phoneNumber}`,
          "_blank"
        );
        break;
      case "zalo":
        // Mở Zalo (giao thức zalo:// chỉ hoạt động trên mobile)
        window.open(`https://zalo.me/${phoneNumber}`, "_blank");
        break;
      case "viber":
        // Mở Viber
        window.open(`viber://add?number=${phoneNumber}`, "_blank");
        break;
      case "whatsapp":
        // Mở WhatsApp chat
        window.open(`https://wa.me/${phoneNumber}`, "_blank");
        break;
      default:
        break;
    }
  };

  const [images, setImages] = useState([]);

  useEffect(() => {
    if (detail?.chuNha) {
      // Lấy số điện thoại, bỏ hết ký tự không phải số
      const onlyNumber = detail.chuNha.replace(/\D/g, "");
      setPhoneNumber(onlyNumber);
    }
    window.scrollTo({
      top: 0,
      // behavior: "smooth",
    });

    if (detail?.allPhoto?.length > 0) {
      detail?.allPhoto?.map((item) =>
        setImages((prevState) => [...prevState, `/img/${item}`])
      );

      console.log("first", images);
    }
  }, [detail]);

  // console.log(detail?.allPhoto);

  return (
    <>
      <TopMenu data={true} />

      <div className="navMenu">
        <ul>
          <li>
            <NavLink to={"/"}>Home \</NavLink>
          </li>
          <li>
            <NavLink to={"/portfolio"}>Nhà Đất \</NavLink>
          </li>
          <li>
            <NavLink to={"/portfolio"}>{selectedCategory}</NavLink>
          </li>
        </ul>
      </div>

      <div id="detail">
        <div className="content">
          <h1>{detail.proName}</h1>

          <ul>
            {login && (
              <button type="button" className="copy" onClick={handleClickCopy}>
                <i
                  className="fa-solid fa-copy"
                  style={{ color: copy ? "orangered" : "" }}
                ></i>
              </button>
            )}
            <li>Địa chỉ: {detail.address}</li>
            <li>Diện tích: {detail.dienTich}</li>
            <li>Kết cấu: {detail.ketCau}</li>
            <li>Giá bán: {detail.giaBan}</li>
            <li>
              Đơn giá:{" "}
              {detail && tinhDonGiaTheoM2(detail)
                ? formatDonGiaToShortText(tinhDonGiaTheoM2(detail).donGia) +
                  "/m2"
                : "Không xác định"}
            </li>

            <li>Hợp đồng thuê: {detail.hopDong}</li>
            <li>Hướng: {detail.huong}</li>
            <li>Pháp lý: {detail.phapLy}</li>

            <li>Vị trí: {detail.viTri}</li>

            {login && <li>Chủ nhà: {detail.chuNha}</li>}
          </ul>

          {login && (
            <div className="checkIcon">
              <button type="button" onClick={() => handleOpenApp("google")}>
                <i className="fa-brands fa-google"></i>
              </button>
              <button type="button" onClick={() => handleOpenApp("facebook")}>
                <i className="fa-brands fa-facebook"></i>
              </button>
              <button type="button" onClick={() => handleOpenApp("zalo")}>
                <i className="fa-solid fa-z"></i>
              </button>
              <button type="button" onClick={() => handleOpenApp("viber")}>
                <i className="fa-brands fa-viber"></i>
              </button>
              <button type="button" onClick={() => handleOpenApp("whatsapp")}>
                <i className="fa-brands fa-whatsapp"></i>
              </button>
            </div>
          )}

          <div className="photo">
            {detail?.allPhoto?.map((item, index) => {
              if (item.endsWith(".mp4")) {
                return (
                  <video key={index} controls width="100%">
                    <source src={`/img/${item}`} type="video/mp4" />
                    Trình duyệt của bạn không hỗ trợ thẻ video.
                  </video>
                );
              } else {
                return (
                  <Image.PreviewGroup items={images} key={index}>
                    <Image width={510} src={`/img/${item}`} />
                  </Image.PreviewGroup>
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
