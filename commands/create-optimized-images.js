/**
 * Скрипт за създаване на оптимизирани версии на изображенията
 * за мобилни и десктоп устройства
 *
 * За да използвате:
 * 1. Инсталирайте sharp: npm install sharp
 * 2. Изпълнете: node commands/create-optimized-images.js
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// Пътища
const PUBLIC_DIR = path.join(__dirname, "../public");
const SOURCE_IMAGE = path.join(PUBLIC_DIR, "lawyer.jpg"); // Оригиналното изображение
const SOURCE_WEBP = path.join(PUBLIC_DIR, "lawyer.webp"); // WebP версия, ако съществува

// Конфигурация
const MOBILE_WIDTH = 640;
const MOBILE_HEIGHT = 400;
const DESKTOP_WIDTH = 955;
const DESKTOP_HEIGHT = 776;

const MOBILE_OUTPUT = path.join(PUBLIC_DIR, "lawyer-mobile.webp");
const DESKTOP_OUTPUT = path.join(PUBLIC_DIR, "lawyer-desktop.webp");

// Функция за оптимизиране на изображението
async function optimizeImages() {
  console.log("Започва създаване на оптимизирани изображения...");

  // Определяме изходното изображение
  const sourceImage = fs.existsSync(SOURCE_WEBP) ? SOURCE_WEBP : SOURCE_IMAGE;
  console.log(`Използване на изходно изображение: ${sourceImage}`);

  try {
    // Създаваме мобилна версия
    await sharp(sourceImage)
      .resize(MOBILE_WIDTH, MOBILE_HEIGHT, {
        fit: "cover",
        position: "center",
      })
      .webp({
        quality: 75,
        effort: 6,
        nearLossless: true,
        smartSubsample: true,
      })
      .toFile(MOBILE_OUTPUT);

    console.log(`Мобилната версия е създадена успешно: ${MOBILE_OUTPUT}`);

    // Създаваме десктоп версия
    await sharp(sourceImage)
      .resize(DESKTOP_WIDTH, DESKTOP_HEIGHT, {
        fit: "cover",
        position: "center",
      })
      .webp({
        quality: 75,
        effort: 6,
        nearLossless: true,
        smartSubsample: true,
      })
      .toFile(DESKTOP_OUTPUT);

    console.log(`Десктоп версията е създадена успешно: ${DESKTOP_OUTPUT}`);

    // Проверяваме размерите на файловете
    const mobileSize = (fs.statSync(MOBILE_OUTPUT).size / 1024).toFixed(2);
    const desktopSize = (fs.statSync(DESKTOP_OUTPUT).size / 1024).toFixed(2);

    console.log(`Размер на мобилна версия: ${mobileSize} KB`);
    console.log(`Размер на десктоп версия: ${desktopSize} KB`);

    console.log("Всички изображения са оптимизирани успешно!");
  } catch (error) {
    console.error("Грешка при оптимизиране на изображенията:", error);
  }
}

// Стартиране на скрипта
optimizeImages();
