import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send(`<h1>Hello, Welcome to RESTFul Blog API</h1>
        <h2>Endpoints</h2>    
        <p><b>GET /users</b> - Get all users</p>
        <p><b>GET /users/:id</b> - Retrieve a specific user by their ID, including all blog posts authored by that user</p>
        <p><b>POST /users</b> - Create a new user</p>
        <p><b>GET /posts</b> - Get all posts (include's author details for each post)</p>
        <p><b>GET /posts/:id</b> - Get a specific post (include's author details for that post)</p>
        <p><b>POST /posts</b> - Create a new post</p>
        <p><b>PUT /posts/:id</b> - Update a post</p>
        <p><b>Delete /posts/:id</b> - Delete a given post</p>`);
});

app.get("/users", async (req, res) => {
  try {
    const findAllUser = await prisma.user.findMany();
    res.status(200).json(findAllUser);
  } catch (e) {
    res.status(500).json({ Message: "Can't fetch users!" });
  }
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const findSpecificUser = await prisma.user.findUnique({
      where: { id },
      include: { posts: true },
    });

    if (!findSpecificUser) {
      return res.status(404).json({ Error: "User can't br found!" });
    } else {
      res.json(findSpecificUser);
    }
  } catch (e) {
    res.status(500).json({ Error: "Can't fetch user!" });
  }
});

app.post("/users", async (req, res) => {
  const { firstName, lastName, emailAddress, userName } = req.body;
  try {
    const createUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        emailAddress,
        userName,
      },
    });
    res.status(200).json(createUser);
  } catch (e) {
    res.status(500).json({ Error: "Can't create user" });
  }
});

app.get("/posts", async (_req, res) => {
  try {
    const findAllPost = await prisma.post.findMany({
      where: { isDeleted: false },
      include: { author: true },
    });
    res.json(findAllPost);
  } catch (e) {
    res.status(500).json({ message: "Can't load post!" });
  }
});

app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const findSpecificPost = await prisma.post.findUnique({
      where: {
        id,
        isDeleted: false,
      },
      include: { author: true },
    });

    if (!findSpecificPost) {
      res.status(404).json({ error: " Post not found!" });
    } else {
      res.json(findSpecificPost);
    }
  } catch (e) {
    res.status(500).json({ message: "Can't load that post!" });
  }
});

app.post("/posts", async (req, res) => {
  const { title, content, authorId } = req.body;
  try {
    const userExist = await prisma.user.findFirst({
      where: {
        id: authorId,
      },
    });

    if (!userExist) {
      res.status(404).json({ error: "user not found" });
    }

    const createPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });
    res.status(201).json(createPost);
  } catch (e) {
    res.status(500).json({ message: "Can't create post!" });
  }
});

app.put("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const postExist = await prisma.post.findUnique({
      where: { id },
    });

    if (!postExist) {
      res.status(404).json({ error: "Post does not exist!" });
    }

    const upadatedPost = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
      },
    });
    res.status(200).json(upadatedPost);
  } catch (e) {
    res.status(500).json({ message: "Can't update post!" });
  }
});

app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const postExist = await prisma.post.findUnique({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!postExist) {
      res.status(404).json({ error: "Post does not exist!" });
    }

    const deletedPost = await prisma.post.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });
    res
      .status(200)
      .json({ message: "Post Deleted Successfully!", post: deletedPost });
  } catch (e) {
    res.status(500).json({ Message: "Can't delete post!" });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
