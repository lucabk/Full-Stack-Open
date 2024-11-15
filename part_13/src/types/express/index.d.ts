// Declaration Merging
import { JwtPayload } from "jsonwebtoken";
import { Blog, ReadingList, User } from "../../models";

// include  '"typeRoots": ["./src/types"]' in tsconfig.json
declare global {
  namespace Express {
    export interface Request {
      blog?: Blog
      decodedToken:JwtPayload|string
      readingList:ReadingList
      user: User
    }
  }
}

declare module 'express-session' {
  interface SessionData {
    userId?: number;
    token?: string;
  }
}
