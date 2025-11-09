import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  REACT_NEXTJS_GUIDE,
  TYPESCRIPT_GUIDE,
  CSS_TAILWIND_GUIDE,
  API_DESIGN_GUIDE,
  TESTING_GUIDE,
} from "../prompts";

export interface Command {
  name: string;
  description: string;
  execute: () => string;
}

export const commands: Command[] = [
  {
    name: "react-nextjs",
    description: "Get expert-level React and Next.js guidance",
    execute: () => REACT_NEXTJS_GUIDE,
  },
  {
    name: "typescript",
    description: "Get expert-level TypeScript guidance",
    execute: () => TYPESCRIPT_GUIDE,
  },
  {
    name: "css-tailwind",
    description: "Get expert-level CSS and Tailwind guidance",
    execute: () => CSS_TAILWIND_GUIDE,
  },
  {
    name: "api-design",
    description: "Get expert-level API design guidance",
    execute: () => API_DESIGN_GUIDE,
  },
  {
    name: "testing",
    description: "Get expert-level testing guidance",
    execute: () => TESTING_GUIDE,
  },
];

export function registerCommands(server: McpServer) {
  // Register prompts for each command
  commands.forEach((command) => {
    server.registerPrompt(
      command.name,
      {
        description: command.description,
      },
      async (args, extra) => {
        return {
          messages: [
            {
              role: "assistant",
              content: {
                type: "text",
                text: command.execute(),
              },
            },
          ],
          _meta: {
            instructions: command.execute(),
            role: `${command.name}_expert`,
          },
        };
      }
    );
  });
}
