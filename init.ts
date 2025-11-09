import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const server = new McpServer({
  name: "wizard",
  version: "1.0.0",
  capabilities: {
    prompts: true, // Declare that this server supports prompts
  },
});

export default server;
