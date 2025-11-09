import server from "../init";
import { REACT_NEXTJS_GUIDE } from "../prompts";

server.registerTool(
  "react_nextjs_guidelines",
  {
    description: "Tool to provide expert-level React.js and Next.js guidance",
  },
  (args, extra) => {
    return {
      content: [],
      _meta: {
        instructions: REACT_NEXTJS_GUIDE,
        role: "react_nextjs_expert",
      },
    };
  }
);
