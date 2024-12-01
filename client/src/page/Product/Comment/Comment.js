import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Comment.module.scss";
import { userRequest } from "../../../requestMethods";
import CommentForm from "./CommentForm";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import ScrollToTop from "../../../components/ScrollToTop/ScrollToTop";

const cx = classNames.bind(styles);

const Comment = ({ productId }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [data, setData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);

  const handleDelete = (id) => {
    const postComment = async () => {
      try {
        const res = await userRequest.delete(`/comment/${id}`);
      } catch (err) {
        console.log(err);
      }
    };
    postComment();
  };

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await userRequest.get(`/comment/${productId}`);
        const sortedComments = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setData(sortedComments);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComment();
  }, [data]);

  const loadMoreComments = () => {
    setVisibleCount(prevCount => prevCount + 10);
  };

  return (
    <div className={cx("wrapper")}>
      {/* <div className={cx("comment-title")}>Users Comment</div> */}
      <div className={cx("comment-content")}>
      {data.slice(0, visibleCount).map((item, i) => (
          <div className={cx("comment-text")} key={i}>
            <div className={cx("comment-auth")} >
              {item.name}{" "}
              <span className={cx("comment-time")}>
                {format(item.createdAt)}
              </span>
            </div>
            <div className={cx("comment-desc")}>{item.body}</div>
            <div className={cx("btn-block")}>
            {userInfo?.username === item.name && (
                <button onClick={() => handleDelete(item._id)} className={cx("btn-check")}>
                  Delete
                </button>
              )}
              {userInfo && userInfo.username !== item.name && (
                <button className={cx("btn-check")}>
                  Reply
                </button>
              )}
            </div>
          </div>
        ))}
          {visibleCount < data.length && (
          <button onClick={loadMoreComments} className={cx("btn-load-more")}>
            Show more
          </button>
        )}
        
      </div>
      <CommentForm dataCmt={data} productId={productId} />
      <ScrollToTop />
    </div>
  );
};
export default Comment;
