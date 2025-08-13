import { Response } from "express";
import config from "../config";

type ResponseParamsType = {
  res: Response;
  data: unknown;
  message?: string;
  code: number;
  requestId?: string | undefined;
  
};

class ApiResponse {
  static success({
    res,
    data,
    message,
    code,
    requestId
    
  }: ResponseParamsType): void {
    res.status(code).json({
      status: "success",
      message,
      data,
      code,
      requestId
    });
  }

  static failed({ res, data, message, code, requestId }: ResponseParamsType): void {
   
    const env = config.app.env
    res.status(code).json({
      status: "failed",
      data,
      message: env === "prduction"? "Internal Server Eror" : message,
      code,
      requestId,
    });
  }
}

export default ApiResponse;