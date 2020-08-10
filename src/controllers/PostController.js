const { post } = require("../models");

const response = {
  data: [],
  message: "Your Message",
  status: "success",
};

class PostController {
  static async getPost(req, res){
  try {
    const allPost = await post.findAll({});
    if (allPost.length !== 0) {
        response.data = allPost;
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

static async getPostId(req, res) {
  const { id } = req.params;
  const postId = await post.findByPk(id);
  try {
    if (!postId) throw new Error("post not found");
    response.data = postId;
    response.status = "success";
    res.json(response);
  } catch (error) {
    response.message = error.message;
    response.data = {};
    response.status = "failed";
    res.status(404).json(response);
  }
}   

  static async savePost(req, res) {
    const { body } = req;
    try {
      const insert = await post.create({
        title:body.title,
        content:body.content,
        tags:body.tags,
        status:body.status,
        userId:body.userId,
      });
      response.data = insert;
      response.message = "Succes save data";
      res.status(201).json(response);
    } catch (error) {
      response.data = [];
      response.message = "failed save data";
      res.status(400).json(response);
    }
  }

  static async updatePost(req, res){
    const { id } = req.params;
    const { username, password, salt, email, profile } = req.body;
    const getData = await post.update({ username, password, salt, email, profile },
      {
          where: {
              id: id
          }
      });
  
      try {
          if (getData) {
              response.message = "update data berhasil";
              response.data = await post.findByPk(id);
              res.status(200).json(response);
          }
      } catch (err) {
          response.status = "gagal memperbarui data";
          response.message = err.message;
          res.status(400).json(response);
      }
  }


  static async deletePost(req, res) {
    const { id } = req.params;
    const delPost = await post.destroy({ where: {
        id: id
    }});

    try {
        if (delPost) {
            const dataPost = await post.findAll({});
            response.data = dataPost;
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


  


module.exports = PostController;
