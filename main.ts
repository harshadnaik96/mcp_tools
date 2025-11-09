import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import server from "./init";
import { registerCommands } from "./commands";

// Import all tool servers
import "./servers/react-nextjs";
import "./servers/typescript";
import "./servers/css-expert";
import "./servers/tailwind-expert";

async function main() {
  // Register the command system
  registerCommands(server);

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Expert Tools Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
