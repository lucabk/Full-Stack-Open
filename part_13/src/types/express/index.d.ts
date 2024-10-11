// Declaration Merging
import { JwtPayload } from "jsonwebtoken";
import { Blog } from "../../models";

// include  '"typeRoots": ["./src/types"]' in tsconfig.json
declare global {
  namespace Express {
    export interface Request {
      blog?: Blog;
      decodedToken:JwtPayload|string
    }
  }
}