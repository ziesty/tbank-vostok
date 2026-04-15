/**
 * Generates icon-192.png and icon-512.png for the PWA manifest.
 * Runs once: node generate-icons.mjs
 */
import zlib from 'zlib'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ── CRC-32 table ────────────────────────────────────────────────────────────
const crcTable = (() => {
  const t = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[n] = c
  }
  return t
})()

function crc32(buf) {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

// ── PNG chunk helper ─────────────────────────────────────────────────────────
function pngChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii')
  const lenBuf = Buffer.allocUnsafe(4)
  lenBuf.writeUInt32BE(data.length)
  const crcBuf = Buffer.allocUnsafe(4)
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])))
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf])
}

// ── Draw icon into a pixel buffer ────────────────────────────────────────────
function drawIcon(size) {
  // RGBA flat array
  const px = new Uint8Array(size * size * 4)

  const set = (x, y, r, g, b, a = 255) => {
    if (x < 0 || y < 0 || x >= size || y >= size) return
    const i = (y * size + x) * 4
    px[i] = r; px[i + 1] = g; px[i + 2] = b; px[i + 3] = a
  }

  const fillCircle = (cx, cy, radius, r, g, b) => {
    for (let y = -radius; y <= radius; y++)
      for (let x = -radius; x <= radius; x++)
        if (x * x + y * y <= radius * radius)
          set(cx + x, cy + y, r, g, b)
  }

  const fillRect = (x1, y1, x2, y2, r, g, b) => {
    for (let y = y1; y <= y2; y++)
      for (let x = x1; x <= x2; x++)
        set(x, y, r, g, b)
  }

  const s = size
  const cx = s >> 1
  const cy = s >> 1

  // Background: dark circle
  fillCircle(cx, cy, s >> 1, 28, 28, 30)

  // Yellow shield shape (simplified rounded rect)
  const sw = Math.round(s * 0.52)
  const sh = Math.round(s * 0.58)
  const sx = cx - (sw >> 1)
  const sy = cy - (sh >> 1) - Math.round(s * 0.02)
  fillRect(sx, sy, sx + sw, sy + sh, 255, 221, 45)

  // Shield bottom point
  const tip = sy + sh + Math.round(s * 0.10)
  for (let dy = 0; dy <= Math.round(s * 0.10); dy++) {
    const half = Math.round((sw >> 1) * (1 - dy / Math.round(s * 0.10)))
    fillRect(cx - half, sy + sh + dy, cx + half, sy + sh + dy, 255, 221, 45)
  }

  // Dark "T" letter centred on shield
  const tw = Math.round(sw * 0.55)
  const th = Math.round(sh * 0.55)
  const tx = cx - (tw >> 1)
  const ty = sy + Math.round(sh * 0.18)
  const bar = Math.round(th * 0.28)  // crossbar height
  const stem = Math.round(tw * 0.22) // stem width

  // crossbar
  fillRect(tx, ty, tx + tw, ty + bar, 28, 28, 30)
  // stem
  fillRect(cx - (stem >> 1), ty + bar, cx + (stem >> 1), ty + th, 28, 28, 30)

  return px
}

// ── Encode pixel buffer to PNG ───────────────────────────────────────────────
function toPNG(size, rgba) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])

  // IHDR
  const ihdr = Buffer.allocUnsafe(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8   // bit depth
  ihdr[9] = 6   // RGBA
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0

  // Raw scanlines with filter byte 0
  const raw = Buffer.allocUnsafe(size * (1 + size * 4))
  for (let y = 0; y < size; y++) {
    raw[y * (1 + size * 4)] = 0
    for (let x = 0; x < size; x++) {
      const src = (y * size + x) * 4
      const dst = y * (1 + size * 4) + 1 + x * 4
      raw[dst] = rgba[src]; raw[dst + 1] = rgba[src + 1]
      raw[dst + 2] = rgba[src + 2]; raw[dst + 3] = rgba[src + 3]
    }
  }

  const idat = zlib.deflateSync(raw, { level: 9 })

  return Buffer.concat([
    sig,
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', idat),
    pngChunk('IEND', Buffer.alloc(0)),
  ])
}

// ── Main ─────────────────────────────────────────────────────────────────────
for (const size of [192, 512]) {
  const pixels = drawIcon(size)
  const png = toPNG(size, pixels)
  const out = path.join(__dirname, 'public', `icon-${size}.png`)
  fs.writeFileSync(out, png)
  console.log(`✓ public/icon-${size}.png  (${png.length} bytes)`)
}
