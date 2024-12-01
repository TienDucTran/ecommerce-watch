
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from './ProductItem.module.scss'
const cx = classNames.bind(styles)
function ProductItem({ data, onclick }) {
    return (
        <Link to={`/productdetail/${data._id}`} className={cx('wrapper')} onClick={onclick} >
            <img src={data.image} alt="" className={cx("product-avatar")} />
            <div className={cx('info')}>
                <span className={cx('product-title')}>{data.title}</span>
                <p className={cx('product-color')}>
                    <div
                        style={{ backgroundColor: data.color }}
                        className={cx("color-btn")}
                     ></div>
                    <span className={cx("color")}>{data.color}</span>
                </p>
            </div>
        </Link>
    );
}

export default ProductItem;