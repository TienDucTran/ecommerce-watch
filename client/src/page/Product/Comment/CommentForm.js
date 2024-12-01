import React, { useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Comment.module.scss";
import { userRequest } from "../../../requestMethods";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const CommentForm = ({ setDataCmt, dataCmt, productId }) => {
  const commentsRef = useRef(null);
  const userInfo = useSelector((state) => state.user.userInfo);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const postComment = async () => {
    try {
      const res = await userRequest.post("/comment/saveComment", {
        name: userInfo.username,
        body: comment,
        productId: productId,
      });
      dataCmt.push({ name: userInfo.username, body: comment, productId: productId});
      setComment("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (userInfo) {
      postComment();
      commentsRef.current.focus();
    } else {
      toast("Please login to comment!", {
        onClick: () => {
          // Navigate to the home route when toast is clicked
          navigate("/login");
        },
      });
    }
  };

  return  (
    <div className={cx("wrapper")}>
      <div>
        <div className={cx("comment-input")}>
          <input
            ref={commentsRef}
            placeholder="text"
            type="text"
            className={cx("input")}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button className={cx("btn-submit")} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  ) 
};

export default CommentForm;
