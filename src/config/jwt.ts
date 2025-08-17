import { JwtHelper } from "../utils/JwtHelper";
import config from ".";

export const helper = new JwtHelper(config.jwt.secret as string )

