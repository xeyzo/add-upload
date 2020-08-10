const cloudinary = require("cloudinary").v2;


cloudinary.config({
    cloud_name: "dt3n313zv",
    api_key: "379445928677526",
    api_secret: "t5_cWwyy-B8OtojJowMdONQ5AKg"
  });


    class UploadController{
        static async uploadImgCloud(req, res){
        const data = {
            image: req.body.image
        }
        cloudinary.uploader.upload(data.image)
        .then((result) => {
            res.status(200).send({
              message: "success",
              result,
            });
          }).catch((error) => {
            res.status(500).send({
              message: "failure",
              error,
            });
          });
    }
}

module.exports = UploadController;

