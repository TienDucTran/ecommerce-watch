import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../redux/cartSlice";
import { useLocation, useNavigate   } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import { toast, ToastContainer } from "react-toastify";
import Describe from "./Describe/Describe";
import Comment from "./Comment/Comment";
import { useTranslation } from "react-i18next";


const cx = classNames.bind(styles);

const productTab = [
  {
    title: "Describe",
    titleVn: "Miêu tả",
  },
  {
    title: "Comments",
    titleVn: "Bình luận",
  },
];

const Product = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [product, setProduct] = useState([]);
  const [active, setActive] = useState(0);
  const id = location.pathname.split("/")[2];
  const [cartQuantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate ();
  

  const addCard = () => {
    if(userInfo){
      dispatch(add({ ...product, cartQuantity }));
      toast("add to cart", {
        onClick: () => {
          // Navigate to the home route when toast is clicked
          navigate('/cart');
        },
      });
    }else{
      toast("Please login to add to cart", {
        onClick: () => {
          // Navigate to the home route when toast is clicked
          navigate('/login');
    }
  })
}
}
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  const handleQuantity = (type) => {
    if (type === "dec") {
      cartQuantity > 1 && setQuantity(cartQuantity - 1);
    } else {
      setQuantity(cartQuantity + 1);
    }
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <div className={cx("container")}>
      <div
        className={cx("block-top")}
        data-aos="fade-down"
        data-aos-duration="600"
      >
        <div className={cx("left")}>
          <img src={product.image} alt="" className={cx("img")} />
          {/* <div className={cx("image-list")}>
            <div className={cx("image-item")}>
              <img src={product.image} alt="" className={cx("img")} />
            </div>
            <div className={cx("image-item")}>
              <img src={product.image} alt="" className={cx("img")} />
            </div>
          </div> */}
        </div>
        <div className={cx("right")}>
          <div className={cx("block-name")}>
            <div className={cx("name")}>{product.title}</div>
            <div className={cx("price")}>
              {i18n.language === "vn" ? (
                <span>
                  {(product.price * 23000).toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              ) : (
                <span>${product.price}</span>
              )}
            </div>
          </div>
          <div className={cx("color")}>
            <div className={cx("title")}>
              {" "}
              {i18n.language === "vn" ? (
                <span>MÀU SẮC</span>
              ) : (
                <span>COLOR</span>
              )}
            </div>
            <button
              style={{ backgroundColor: product.color }}
              className={cx("color-btn")}
            ></button>
          </div>
          <div className={cx("quantity")}>
            <span className={cx("title")}>
              {" "}
              {i18n.language === "vn" ? (
                <span>SÓ LƯỢNG:</span>
              ) : (
                <span>QUANTITY:</span>
              )}
            </span>
            <div className={cx("count")}>{cartQuantity}</div>
          </div>
          <div>
            <button className={cx("btn-add")} onClick={addCard}>
              {i18n.language === "vn" ? (
                <span>Thêm vào cart</span>
              ) : (
                <span>add to cart</span>
              )}
            </button>
          </div>
          <div className={cx("des")}>
            <p className={cx("p")}>
              {" "}
              {i18n.language === "vn" ? (
                <span>Miễn phí vận chuyển</span>
              ) : (
                <span>FreeShip</span>
              )}
            </p>
            <p className={cx("p")}>
              {" "}
              {i18n.language === "vn" ? (
                <span>Đổi trả miễn phí</span>
              ) : (
                <span>Free Return</span>
              )}
            </p>
            <p className={cx("p")}>
              {i18n.language === "vn" ? (
                <span>
                  Các loại thuế và phí hải quan sẽ được áp dụng khi giao hàng
                  theo quy định của Hải quan Việt Nam
                </span>
              ) : (
                <span>
                  {" "}
                  Customs taxes and fees will be applied upon delivery in
                  accordance with Vietnam Customs regulations
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
      <div className={cx("productTab")}>
        {productTab.map((item, index) => (
          <div
            className={cx(
              active === index ? "productTab-item-active" : "productTab-item"
            )}
            key={index}
            onClick={() => setActive(index)}
          >
            {i18n.language === "vn" ? item.titleVn : item.title}
          </div>
        ))}
      </div>
      <div>{active === 0 ? <Describe product={product} /> : <Comment productId={product._id} />}</div>
      <ToastContainer />
    </div>
  );
};
export default Product;
