import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

/** Matches `viewport.themeColor` / primary brand plate */
export const BRAND_ICON_BG = '#1e3a5f'

export async function brandIconImageResponse(size: number) {
  const buf = await readFile(join(process.cwd(), 'public', 'logo.png'))
  const src = `data:image/png;base64,${buf.toString('base64')}`
  const inner = Math.round(size * 0.68)

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
          borderRadius: Math.max(4, Math.round(size * 0.18)),
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
