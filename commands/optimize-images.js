/**
 * Скрипт за оптимизиране на изображения с помощта на Sharp
 *
 * За да използвате:
 * 1. Инсталирайте sharp: npm install sharp
 * 2. Изпълнете: node commands/optimize-images.js
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SOURCE_DIR = path.join(__dirname, "../public");
const DESTINATION_DIR = path.join(__dirname, "../public");

// Конфигурация за оптимизация
const config = {
  webp: {
    quality: 75,
    effort: 6,
  },
  avif: {
    quality: 65,
    effort: 9,
  },
  png: {
    quality: 75,
    compressionLevel: 9,
    effort: 10,
  },
  jpeg: {
    quality: 75,
    progressive: true,
    optimizeScans: true,
    mozjpeg: true,
  },
};

// Функция за рекурсивно обхождане на директорията
const processDirectory = async (dirPath) => {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Рекурсивно обхождане на поддиректориите
      await processDirectory(filePath);
    } else {
      // Обработка на файловете
      const ext = path.extname(file).toLowerCase();
      if ([".jpg", ".jpeg", ".png"].includes(ext)) {
        await optimizeImage(filePath);
      }
    }
  }
};

// Функция за оптимизиране на изображение
const optimizeImage = async (filePath) => {
  const fileName = path.basename(filePath, path.extname(filePath));
  const dirName = path.dirname(filePath);

  // Пътища за изходни файлове
  const webpOutputPath = path.join(dirName, `${fileName}.webp`);
  const avifOutputPath = path.join(dirName, `${fileName}.avif`);

  try {
    // Зареждаме изображението чрез Sharp
    const image = sharp(filePath);

    // Създаваме WebP версия
    await image.webp(config.webp).toFile(webpOutputPath);

    console.log(`Създаден WebP: ${webpOutputPath}`);

    // Създаваме AVIF версия (може да отнеме повече време)
    await image.avif(config.avif).toFile(avifOutputPath);

    console.log(`Създаден AVIF: ${avifOutputPath}`);

    // Оптимизираме оригиналното изображение
    if (
      path.extname(filePath).toLowerCase() === ".jpg" ||
      path.extname(filePath).toLowerCase() === ".jpeg"
    ) {
      const optimizedJpg = path.join(
        dirName,
        `${fileName}_optimized${path.extname(filePath)}`
      );
      await image.jpeg(config.jpeg).toFile(optimizedJpg);

      // Заменяме оригинала с оптимизираната версия
      fs.renameSync(optimizedJpg, filePath);
      console.log(`Оптимизиран JPEG: ${filePath}`);
    } else if (path.extname(filePath).toLowerCase() === ".png") {
      const optimizedPng = path.join(
        dirName,
        `${fileName}_optimized${path.extname(filePath)}`
      );
      await image.png(config.png).toFile(optimizedPng);

      // Заменяме оригинала с оптимизираната версия
      fs.renameSync(optimizedPng, filePath);
      console.log(`Оптимизиран PNG: ${filePath}`);
    }
  } catch (err) {
    console.error(`Грешка при обработка на ${filePath}:`, err);
  }
};

// Основен код
(async () => {
  try {
    console.log("Започва оптимизация на изображения...");
    await processDirectory(SOURCE_DIR);
    console.log("Оптимизацията на изображения е завършена успешно!");
  } catch (err) {
    console.error("Възникна грешка при оптимизацията на изображения:", err);
  }
})();
