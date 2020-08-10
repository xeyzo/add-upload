const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

const rootIndex = require("./src/routes/index");
const routerUsers = require("./src/routes/users");
const routerPost = require("./src/routes/posts");
const routerComment = require("./src/routes/comments");
const routerUpload = require("./src/routes/uploads");


app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use("/", rootIndex);
app.use("/users", routerUsers);
app.use("/posts", routerPost);
app.use("/comments", routerComment);
app.use("/uploads", routerUpload);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
