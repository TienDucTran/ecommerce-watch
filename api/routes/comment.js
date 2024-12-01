const express = require('express');
const router = express.Router();
const {Comment} = require("../models/Comment");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");


router.post("/saveComment", async (req, res) => {

    const comment = new Comment(req.body)

    comment.save((err, comment) => {
        console.log(err)
        if (err) return res.json({ success: false, err })

        Comment.find({ '_id': comment._id })
            .populate('writer')
            .exec((err, result) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({ success: true, result })
            })
    })
})
// GET: Fetch comments for a specific productId
router.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    // Fetch comments where 'postId' matches productId
    const comments = await Comment.find({ productId })
      .populate('writer')
      .exec();

    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
router.get("/" , async (req, res) => {
    Comment.find({ "postId": req.params.id,})
        .populate('writer')
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            res.status(200).json(comments)
        })
});
//DELETE
router.delete("/:id", async (req, res) => {
    try {
      await  Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("Comment has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;