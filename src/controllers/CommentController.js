const { comment } = require("../models");

const response = {
  data: [],
  message: "Your Message",
  status: "success",
};

class CommentController {
  static async getCommentId(req, res) {
  const { id } = req.params;
  const commentId = await comment.findByPk(id);
  try {
    if (!commentId) throw new Error("comment not found");
    response.data = commentId;
    response.status = "success";
    res.json(response);
  } catch (error) {
    response.message = error.message;
    response.data = {};
    response.status = "failed";
    res.status(404).json(response);
  }
}   

  static async getComment(req, res) {
    try {
      const allComment = await comment.findAll({});
      if (allComment.length !== 0) {
          response.data = allComment;
          response.message = "succes"
          res.status(200).json(response);
      } else {
          response.status = "failed!";
          response.message = "Data not found!";
          res.status(400).json(response);
      }
  }catch(err) {
      response.status = "failed";
      response.message = err.message;
      res.status(400).json(response);
    }
  }



  static async saveComment(req, res) {
    const { body } = req;
    try {
      const save = await comment.create({
        content:body.content,
        status:body.status,
        userId:body.userId,
        email:body.email,
        url:body.url,
        postId:body.postId
      });
      response.data = save;
      response.message = "Succes save data";
      res.status(201).json(response);
    } catch (error) {
      response.data = [];
      response.message = "failed save data";
      res.status(400).json(response);
    }
  }

  static async updateComment(req, res){
    const { id } = req.params;
    const { content, userId, status, email, url, postId } = req.body;
    const getComment = await comment.update({ content, userId, status, email, url, postId },
    {
        where: {
            id: id
        }
    });
    try {
        if (getComment) {
            response.message = "update data berhasil";
            response.data = await comment.findByPk(id);
            res.status(200).json(response);
        }
    } catch (err) {
        response.data = [];
        response.message = err.message;
        res.status(400).json(response);
    }
  }

  static async deleteComment(req, res) {
    const { id } = req.params;
    const delComment = await comment.destroy({ where: {
        id: id
    }});

    try {
        if (delComment) {
            const dataComment = await comment.findAll({});
            response.data = dataComment;
            response.message = "Delete succes";
            res.status(200).json(response);
        }
    } catch (err) {
        response.status = "Data tidak ada";
        response.message = err.message;
        res.status(400).json(response);
    }
  }
  
}

  


module.exports = CommentController;
