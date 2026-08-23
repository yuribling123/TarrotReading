const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inputDir = path.join(
  __dirname,
  "../public/images/cards/rider-waite"
);

const outputDir = path.join(
  __dirname,
  "../public/images/cards/rider-waite-webp"
);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(inputDir);

Promise.all(
  files
    .filter((file) => /\.(jpg|jpeg|png)$/i.test(file))
    .map(async (file) => {
      const inputPath = path.join(inputDir, file);

      const outputName =
        path.parse(file).name + ".webp";

      const outputPath = path.join(outputDir, outputName);

      await sharp(inputPath)
        .resize({
          width: 480,
          height: 800,
          fit: "cover",
        })
        .webp({
          quality: 85,
        })
        .toFile(outputPath);

      console.log(`Converted: ${file}`);
    })
).then(() => {
  console.log("All tarot cards compressed.");
});