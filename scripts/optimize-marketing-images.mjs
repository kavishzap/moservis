import sharp from "sharp"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(__dirname, "..", "public")

const targets = [
  { name: "zotservisportrait", maxWidth: 900, quality: 82 },
  { name: "zotservislandscape", maxWidth: 1600, quality: 82 },
  { name: "zotservismap", maxWidth: 832, quality: 85 },
]

for (const { name, maxWidth, quality } of targets) {
  const input = path.join(publicDir, `${name}.png`)
  const output = path.join(publicDir, `${name}.webp`)

  const info = await sharp(input)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality, effort: 4 })
    .toFile(output)

  console.log(`${name}.webp — ${Math.round(info.size / 1024)}KB (${info.width}x${info.height})`)
}
