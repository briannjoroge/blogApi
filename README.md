# Blog RESTFul API

A simple **RESTful API** for managing users and blog posts, built with:

- Express.js (server framework)
- Prisma ORM (database interaction)
- PostgreSQL (relational database)

This API allows **creating, fetching, updating, and deleting posts**, with support for **soft deletion**.

## Endpoints

## 1. Users

### GET /users

- Returns a list of all users.

  ![get /users img](./Assets/get-all-users.PNG)

### GET /users/:id

- Returns a specific user by ID along with their blog posts.
  ![get/users/:id img](./Assets/get-specific-user.PNG)

### POST /users

- Creates a new user with random variables available in POSTMAN.

#### Request body

```json
{
  "firstName": "{{$randomFirstName}}",
  "lastName": "{{$randomLastName}}",
  "emailAddress": "{{$randomEmail}}",
  "userName": "{{$randomUserName}}"
}
```

![POST /users img](./Assets/create-new-user.PNG)

## 2. Posts

### GET /posts

- Get all posts including author details for each post.
- The returned post should not include post where **isDeleted** is **true**.

![GET /posts img](./Assets/get-all-posts.PNG)

### GET /posts/:id

Returns a specific post by post Id.

![GET /posts/:id img](./Assets/get-specific-post.PNG)

### POST /posts

- Creates a new blog post with random variables available in POSTMAN. This is linked to a specific user by authorId (userId).

![POST /posts img](./Assets/create-new-post.PNG)

### PUT /posts/:id

- Update a specific post by post Id and **only if it's not deleted.**

#### Request body

```json
{
  "title": "{{$randomLoremWords}}",
  "content": "{{$randomLoremParagraph}}"
}
```

![PUT /posts/:id img](./Assets/update-specific-post.PNG)

### DELETE /posts/:id

- We perform soft deletion on posts, where by we set the isDeleted to true.

- When querring data we hide posts which have the value **isDeleted** set to **true.**

![DELETE /posts/:id img](./Assets/delete-specific-post.PNG)

**Made by** [Brian Njoroge](https://github.com/briannjoroge) with 💓
