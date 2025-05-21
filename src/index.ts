import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import { exec } from "child_process";
import path from "path";
import fs from "fs";

dotenv.config();

const bot = new Telegraf(process.env.TG_BOT_TOKEN!);

bot.start((ctx) => {
  ctx.reply("Hi! Ready to battle!");
});

bot.on("text", async (ctx) => {
  const message = ctx.message.text;

  if (message.startsWith("https://")) {
    const videoUrl = message;
    await ctx.reply("Сейчас скачаю видео…");

    const videoTimeStamp = new Date()
      .toISOString()
      .replace(/[^a-zA-Z0-9]/g, "");
    const videoName = `video_${videoTimeStamp}.mp4`;
    const filePath = path.join("/tmp", videoName);

    exec(`yt-dlp -o "${filePath}" "${videoUrl}"`, async (err) => {
      if (err) {
        await ctx.reply("Не удалось скачать видео 😢");
        return;
      }

      try {
        await ctx.replyWithVideo({ source: filePath });
      } catch {
        await ctx.reply("Не удалось отправить видео.");
      } finally {
        fs.unlink(filePath, () => {});
      }
    });
  } else {
    await ctx.reply("Пожалуйста, пришли ссылку на видео.");
  }
});

bot.launch();
