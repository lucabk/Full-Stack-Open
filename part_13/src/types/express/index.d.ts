// Declaration Merging
import { Blog } from "../../models";

// include  '"typeRoots": ["./src/types"]' in tsconfig.json
declare global {
  namespace Express {
    export interface Request {
      blog?: Blog;
    }
  }
}