/**
 * Скрипт за допълнителна оптимизация на LCP изображенията
 * Този скрипт създава още по-малки версии на изображенията за LCP
 *
 * За да използвате:
 * 1. Изпълнете: node commands/optimize-lcp-images.js
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// Пътища
const PUBLIC_DIR = path.join(__dirname, "../public");
const MOBILE_IMAGE = path.join(PUBLIC_DIR, "lawyer-mobile.webp");
const DESKTOP_IMAGE = path.join(PUBLIC_DIR, "lawyer-desktop.webp");

// Нови пътища - без да заменяме оригиналните
const MOBILE_OPTIMIZED = path.join(PUBLIC_DIR, "lawyer-mobile-lcp.webp");
const DESKTOP_OPTIMIZED = path.join(PUBLIC_DIR, "lawyer-desktop-lcp.webp");

async function optimizeLCPImages() {
  console.log("Започва допълнителна оптимизация на LCP изображения...");

  try {
    // Мобилно изображение с максимална оптимизация
    if (fs.existsSync(MOBILE_IMAGE)) {
      await sharp(MOBILE_IMAGE)
        .webp({
          quality: 60, // По-ниско качество
          effort: 6,
          nearLossless: false,
          smartSubsample: true,
          reductionEffort: 6,
        })
        .toFile(MOBILE_OPTIMIZED);

      const originalSize = (fs.statSync(MOBILE_IMAGE).size / 1024).toFixed(2);
      const optimizedSize = (fs.statSync(MOBILE_OPTIMIZED).size / 1024).toFixed(
        2
      );

      console.log(`Мобилно LCP изображение оптимизирано успешно!`);
      console.log(
        `Оригинален размер: ${originalSize} KB, Оптимизиран: ${optimizedSize} KB`
      );
      console.log(
        `Процент намаление: ${(
          100 -
          (optimizedSize / originalSize) * 100
        ).toFixed(2)}%`
      );
      console.log(
        `Новото оптимизирано изображение е записано като: lawyer-mobile-lcp.webp`
      );
    } else {
      console.warn("Не е намерен мобилен файл за оптимизация!");
    }

    // Десктоп изображение с максимална оптимизация
    if (fs.existsSync(DESKTOP_IMAGE)) {
      await sharp(DESKTOP_IMAGE)
        .webp({
          quality: 70, // По-добро качество за десктоп
          effort: 6,
          nearLossless: false,
          smartSubsample: true,
          reductionEffort: 6,
        })
        .toFile(DESKTOP_OPTIMIZED);

      const originalSize = (fs.statSync(DESKTOP_IMAGE).size / 1024).toFixed(2);
      const optimizedSize = (
        fs.statSync(DESKTOP_OPTIMIZED).size / 1024
      ).toFixed(2);

      console.log(`Десктоп LCP изображение оптимизирано успешно!`);
      console.log(
        `Оригинален размер: ${originalSize} KB, Оптимизиран: ${optimizedSize} KB`
      );
      console.log(
        `Процент намаление: ${(
          100 -
          (optimizedSize / originalSize) * 100
        ).toFixed(2)}%`
      );
      console.log(
        `Новото оптимизирано изображение е записано като: lawyer-desktop-lcp.webp`
      );
    } else {
      console.warn("Не е намерен десктоп файл за оптимизация!");
    }

    console.log("\nЗАБЕЛЕЖКА:");
    console.log("1. Оптимизираните изображения са записани с нови имена");
    console.log(
      "2. За да ги използвате, моля, актуализирайте компонентите в кода да сочат към:"
    );
    console.log("   - /lawyer-mobile-lcp.webp (за мобилни)");
    console.log("   - /lawyer-desktop-lcp.webp (за десктоп)");

    console.log("\nОптимизацията приключи успешно!");
  } catch (error) {
    console.error("Грешка при оптимизация на LCP изображения:", error);
  }
}

// Стартираме оптимизацията
optimizeLCPImages();
