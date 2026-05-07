// Konvertuje všetky JPG v frontend/public/titulne/ na WebP
// Premenuje na čisté ASCII názvy (bez medzier, bez diakritiky)
// Spustenie: node convert-titulne.mjs

import sharp from 'sharp'
import { readdirSync, statSync, unlinkSync } from 'fs'
import { join, extname, basename } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIR = join(__dirname, 'frontend/public/titulne')

function toAscii(name) {
  return name
    .toLowerCase()
    .replace(/á/g, 'a').replace(/ä/g, 'a')
    .replace(/č/g, 'c')
    .replace(/ď/g, 'd')
    .replace(/é/g, 'e').replace(/ě/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ľ/g, 'l').replace(/ĺ/g, 'l')
    .replace(/ň/g, 'n')
    .replace(/ó/g, 'o').replace(/ô/g, 'o')
    .replace(/ř/g, 'r').replace(/ŕ/g, 'r')
    .replace(/š/g, 's').replace(/ś/g, 's')
    .replace(/ť/g, 't')
    .replace(/ú/g, 'u').replace(/ů/g, 'u')
    .replace(/ý/g, 'y')
    .replace(/ž/g, 'z').replace(/ź/g, 'z')
    .replace(/ć/g, 'c')
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_\-]/g, '')
}

const QUALITY   = 82
const MAX_WIDTH = 1200

const files = readdirSync(DIR).filter(f => /\.(jpg|jpeg|JPG|JPEG)$/.test(f))

console.log(`Konvertujem ${files.length} súborov...\n`)

const mapping = []
let total = 0

for (const file of files) {
  const inputPath  = join(DIR, file)
  const baseName   = basename(file, extname(file))
  const outputName = toAscii(baseName) + '.webp'
  const outputPath = join(DIR, outputName)

  try {
    const info = await sharp(inputPath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outputPath)

    const inputSize  = statSync(inputPath).size
    const outputSize = info.size
    const saving     = Math.round((1 - outputSize / inputSize) * 100)

    console.log(`✓ ${file}`)
    console.log(`  → ${outputName}  (${(outputSize/1024).toFixed(0)} KB, -${saving}%)`)

    mapping.push({ old: `/titulne/${file}`, new: `/titulne/${outputName}` })
    unlinkSync(inputPath)
    total++
  } catch (err) {
    console.error(`✗ ${file}: ${err.message}`)
  }
}

console.log(`\nHotovo! ${total} súborov konvertovaných.`)
console.log('\nMapping pre Gallery.jsx:')
mapping.forEach(m => console.log(`  "${m.old}" → "${m.new}"`))
