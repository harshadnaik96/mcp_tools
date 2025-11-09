import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import server from "./init";
import { registerCommands, commands } from "./commands";

// Import all tool servers
import "./servers/react-nextjs";
import "./servers/typescript";
import "./servers/css-expert";
import "./servers/tailwind-expert";
import express from "express";

async function main() {
  // Register the command system
  registerCommands(server);

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Expert Tools Server running on stdio");

  // Start a simple HTTP API to expose command outputs (useful for EC2/docker)
  const app = express();

  app.get("/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.get("/command/:name", (req, res) => {
    const name = req.params.name;
    const cmd = commands.find((c) => c.name === name);
    if (!cmd) {
      return res.status(404).json({ error: "command not found" });
    }
    return res.json({
      name: cmd.name,
      description: cmd.description,
      content: cmd.execute(),
    });
  });

  const port = Number(process.env.PORT || 8080);
  app.listen(port, () => {
    console.error(`HTTP API listening on :${port}`);
  });
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
