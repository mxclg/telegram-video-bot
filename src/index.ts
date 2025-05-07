import { Telegraf } from "telegraf";
import dotenv from "dotenv";

dotenv.config();

const bot = new Telegraf(process.env.TG_BOT_TOKEN!);

bot.start((contex) => {
  contex.reply("Hi! Ready to battle!");
});

bot.launch();
