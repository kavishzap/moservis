import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

/** Amber-500 — matches `viewport.themeColor` / tab theme */
export const BRAND_ICON_BG = '#e28e00'

const ICON_FILENAME = 'zotserviceicon.png'

export async function brandIconImageResponse(size: number) {
  const buf = await readFile(join(process.cwd(), 'public', ICON_FILENAME))
  const src = `data:image/png;base64,${buf.toString('base64')}`
  const inner = Math.round(size * 0.85)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: BRAND_ICON_BG,
          borderRadius: size / 2,
        }}
      >
        <img
          alt=""
          src={src}
          width={inner}
          height={inner}
          style={{ objectFit: 'contain' }}
        />
      </div>
    ),
    { width: size, height: size },
  )
}
