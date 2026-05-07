// Spustenie: node convert-images.mjs
// Konvertuje všetky JPG/PNG z priečinka "input" na WebP a uloží do "output"

import sharp from 'sharp'
import { readdirSync, mkdirSync, existsSync } from 'fs'
import { join, extname, basename } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const INPUT_DIR  = join(__dirname, 'images-input')   // sem daj JPG fotky
const OUTPUT_DIR = join(__dirname, 'images-output')  // sem prídu WebP výstupy
const QUALITY    = 82   // 80-85 je ideálny pomer kvalita/veľkosť
const MAX_WIDTH  = 1200 // max šírka v px (pre titulné fotky stačí)

if (!existsSync(INPUT_DIR)) {
  mkdirSync(INPUT_DIR)
  console.log(`✓ Vytvorený priečinok: images-input`)
  console.log(`  → Daj tam JPG fotky a spusti skript znova`)
  process.exit(0)
}

mkdirSync(OUTPUT_DIR, { recursive: true })

const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']
const files = readdirSync(INPUT_DIR).filter(f =>
  EXTENSIONS.includes(extname(f).toLowerCase())
)

if (files.length === 0) {
  console.log('Žiadne obrázky v images-input/')
  process.exit(0)
}

console.log(`Konvertujem ${files.length} súborov...\n`)

let total = 0
for (const file of files) {
  const inputPath  = join(INPUT_DIR, file)
  const outputName = basename(file, extname(file)) + '.webp'
  const outputPath = join(OUTPUT_DIR, outputName)

  try {
    const info = await sharp(inputPath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outputPath)

    const inputSize  = (await import('fs')).statSync(inputPath).size
    const outputSize = info.size
    const saving     = Math.round((1 - outputSize / inputSize) * 100)

    console.log(`✓ ${file} → ${outputName}  (${(outputSize/1024).toFixed(0)} KB, -${saving}%)`)
    total++
  } catch (err) {
    console.error(`✗ ${file}: ${err.message}`)
  }
}

console.log(`\nHotovo! ${total} súborov v images-output/`)
console.log(`Skopíruj ich do frontend/public/titulne/`)
