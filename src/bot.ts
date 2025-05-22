import { Telegraf } from "telegraf";
import dotenv from "dotenv";

import { startHandler } from "./handlers/start";
import { linkHandler } from "./handlers/linkHandler";

dotenv.config();

export const bot = new Telegraf(process.env.TG_BOT_TOKEN!);

bot.start(startHandler);
bot.on("text", linkHandler);
