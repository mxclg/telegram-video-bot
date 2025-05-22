import { Context } from "telegraf";
import { exec } from "child_process";
import path from "path";
import fs from "fs";

export const linkHandler = async (ctx: Context) => {
  if (!ctx.message || !("text" in ctx.message)) {
    await ctx.reply("Это не текстовое сообщение.");
    return;
  }

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
    await ctx.reply("Пожалуйста, пришли корректную ссылку на видео.");
  }
};
