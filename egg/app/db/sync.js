const User = require("./User");
const Blog = require("./Blog");

User.sync({force:true});
Blog.sync({force:true});
