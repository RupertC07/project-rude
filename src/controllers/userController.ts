// import { NextFunction, Request, Response } from "express";
// import { AppDataSource } from "../config/dataSource";
// import { User } from "../models/user";
// import ApiResponse from "../utils/ApiResponse";
// import { userInfo } from "os";
// import logger from "../config/logger";
// import { ObjectId } from "mongodb";

// export const createUser = async (req:Request, res:Response) =>{
//     const {firstName, lastName} = req.body
//     const userRepo = AppDataSource.getRepository(User);

//     const new_user = userRepo.create({
//         firstName,
//         lastName
//     })

//     await userRepo.save(new_user)

//     return ApiResponse.success({
//         res,
//         data: new_user,
//         message: "Successfully created",
//         code: 201
//     })
// }

// export const listUsers = async (req: Request, res:Response) =>{
//      const page = parseInt(req.query.page as string) || 1;
//     const limit = parseInt(req.query.limit as string) || 10;
//     const search = (req.query.search as string) || "";

//     const userRepo = AppDataSource.getRepository(User)

//     const skip = (page - 1) * limit;

//     const query: any = {};

//      if (search) {
//       query["$or"] = [
//         { firstName: { $regex: search, $options: "i" } },
//         { lastName: { $regex: search, $options: "i" } },
//       ];
//     }

//     const [users, total] = await Promise.all([
//       userRepo.find({
//         where: query,
//         skip,
//         take: limit,
//       }),
//       userRepo.count({ where: query }),
//     ]);

//     return ApiResponse.success({
//       res,
//       data: {
//         users,
//         total,
//         page,
//         limit,
//         totalPages: Math.ceil(total / limit),
//       },
//       message: "Users fetched successfully",
//       code:200
//     });


// }

// export const  getUserById = async (req: Request, res:Response, next:NextFunction) =>{

    
//     try {
//         const {id} = req.params
    

//     if (!id){
//         logger.error("Missing id", {req})
//         return ApiResponse.failed({
//             res,
//             data:null,
//             message: "Id is required",
//             code: 400
//         })
//     }

//     const objectId = new ObjectId(id as string)
//     const userRepo = AppDataSource.getRepository(User)

//     const user = await userRepo.findOne({
//          where:{
//             _id:objectId
//          }
//     })

//     if(!user) return ApiResponse.failed({res,data:null,message:"user not found", code:404})
//     return ApiResponse.success({
//         res,
//         data:user,
//         message:"user fetched successfully",
//         code:200
//     })
//     } catch (error) {
//         next(error)
//     }

// }