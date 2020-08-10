const { user } = require("../models");

const response = {
  status: true,
  message: "",
  data: [],
};

class UserController {
  static async saveUser(req, res) {
    const { body } = req;

    try {
      const save = await user.create({
        username: body.username,
        password : body.password,
        salt : body.salt,
        email: body.email,
        profile: body.profile,
      });
      response.data=save;
      response.message = "sukses simpan data";
      res.status(201).json(response);
    } catch (error) {
      response.status = false;
      response.message = error.message;
      res.status(400).json(response);
    }
  }


  static async updateUser(req, res) {
    const { id } = req.params;
    const { username, password, salt, email, profile } = req.body;
    const getData = await user.update({ username, password, salt, email, profile },
    {
        where: {
            id: id
        }
    });

    try {
        if (getData) {
            response.message = "update data berhasil";
            response.data = await user.findByPk(id);
            res.status(200).json(response);
        }
    } catch (err) {
        response.status = "gagal memperbarui data";
        response.message = err.message;
        res.status(400).json(response);
    }
}


static async getUser(req, res){
  try {
    const allUser = await user.findAll({});
    if (allUser.length !== 0) {
        response.data = allUser;
        response.message = "succes"
        res.status(200).json(response);
    } else {
        response.status = "failed!";
        response.message = "Data not found!";
        res.status(400).json(response);
    }
} catch (err) {
    response.status = "failed";
    response.message = err.message;
    res.status(400).json(response);
  }
}


  static async getUserId(req, res) {
    const { id } = req.params;
    const userdetail = await user.findByPk(id);
    try {
      if (!userdetail) throw new Error("User not found");
      response.data = userdetail;
      response.status = "success";
      res.json(response);
    } catch (error) {
      response.message = error.message;
      response.data = {};
      response.status = "fail";
      res.status(404).json(response);
    }
  }   
    static async deleteUser(req, res) {
      const { id } = req.params;
      const delUser = await user.destroy({ where: {
          id: id
      }});

      try {
          if (delUser) {
              const dataUser = await user.findAll({});
              response.data = dataUser;
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




module.exports = UserController;
