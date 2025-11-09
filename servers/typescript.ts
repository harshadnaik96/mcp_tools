import server from "../init";
import { TYPESCRIPT_GUIDE } from "../prompts";

server.registerTool(
  "typescript_guidelines",
  {
    description: "Tool to provide expert-level TypeScript guidance",
  },
  (args, extra) => {
    return {
      content: [],
      _meta: {
        instructions: TYPESCRIPT_GUIDE,
        role: "typescript_expert",
      },
    };
  }
);
