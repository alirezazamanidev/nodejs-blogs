const { createServer } = require("http");
const BlogModel = require("./model/blog.model");

const { parse } = require("url");

const server = createServer(async (req, res) => {
    const url = parse(req.url, true);
    
  if (url.pathname === "/api/blogs") {
    res.writeHead(200, { "content-type": "application/json" });
    const blogs = await BlogModel.findAll();
    res.write(JSON.stringify({ blogs }));
    res.end();
  } else if (url.pathname === "/api/blog" && url.query?.id) {
    const blogId = parseInt(url.query.id);
    if (isNaN(blogId)) {
      res.writeHead(400, { "content-type": "application/json" });
      return res.end(JSON.stringify({ // return res
        message:"id is not valid!",
        statusCode:400
      }));
    
    }
    const blog = await BlogModel.findOne(url.query.id);
    if (!blog) {
      res.writeHead(404, { "content-type": "application/json" });
      return res.end(
        JSON.stringify({
          message: "The Blog not found",
          statusCode: 404,
        })
      );
    }
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ blog }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
