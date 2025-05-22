import { Context } from "telegraf";

export const startHandler = (ctx: Context) => {
  ctx.reply("Hi! Ready to battle!");
};
