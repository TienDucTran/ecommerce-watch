import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ProductList.module.scss";
import BannerSlideShow from "../../components/BannerSlideShow/BannerSlideShow";
import images from "../../constant/imageHome";
import Products from "../../components/Products/Products";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

import { useLocation } from "react-router-dom";
const cx = classNames.bind(styles);

const bannerHome = [{ image: images.banner2 }];
const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState('price');
  const handleChange = (e) => {
  const { name, value } = e.target;
  if ((name === 'color' && value === 'Color') ) {
    // Xóa bộ lọc màu nếu giá trị là "Color"
    const { color, ...restFilters } = filter;
    setFilter(restFilters);
  } else {
    // Cập nhật bộ lọc màu và các thuộc tính khác
    setFilter({
      ...filter,
      [name]: value,
    });
  }
  setSort('price');
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSort(value);
  };
  // console.log(cat);
  // console.log(sort)
  return (
    <div className={cx("wrapper")}>
      <BannerSlideShow dataBanner={bannerHome} />
      <div className={cx("container")}>
        <div className={cx("name")}>Products</div>
        <div className={cx("select-block")}>
          <div className={cx("select-pa")}>
            <select
              className={cx("select")}
              name="color"
              onChange={handleChange}
              value={filter.color || 'Color'}
            >
              <option>Color</option>
              <option>silver</option>
              <option>gold</option>
              <option>blue</option>
              <option>black</option>
              <option>gray</option>
              <option>white</option>
            </select>
          </div>
          <div className={cx("select-pa")}>
            <select
              className={cx("select")}
              name="price"
              onChange={handleSortChange}
              value={sort}
              
            >
              <option value="price">Price</option>
              <option value="asc">Price(asc)</option>
              <option value="desc">Price(desc)</option>
            </select>
          </div>
        </div>
      </div>
      <Products cat={cat} filter={filter} sort={sort}/>
      <ScrollToTop />
    </div>
  );
};
export default ProductList;
