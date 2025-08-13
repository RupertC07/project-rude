// import { Router } from "express";
// import * as userController from "../controllers/userController"

// const userRouter = Router();

// /**
//  * @swagger
//  * tags:
//  *   name: Users
//  *   description: User management
//  */

// /**
//  * @swagger
//  * /user:
//  *   post:
//  *     summary: Create a new user
//  *     tags: [Users]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/CreateUser'
//  *     responses:
//  *       201:
//  *         description: User created successfully
//  *       400:
//  *         description: Bad request
//  */
// userRouter.post("/", userController.createUser);

// /**
//  * @swagger
//  * /user:
//  *   get:
//  *     summary: List all users
//  *     tags: [Users]
//  *     responses:
//  *       200:
//  *         description: List of users
//  */
// userRouter.get("/", userController.listUsers);

// /**
//  * @swagger
//  * /user/{id}:
//  *   get:
//  *     summary: Get a user by ID
//  *     tags: [Users]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: User ID
//  *     responses:
//  *       200:
//  *         description: A user object
//  *       404:
//  *         description: User not found
//  */
// userRouter.get("/:id", userController.getUserById);



// export default userRouter