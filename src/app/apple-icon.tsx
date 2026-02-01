import { ImageResponse } from 'next/og'

export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 120,
          background: '#0A0A0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          borderRadius: 32,
          position: 'relative',
        }}
      >
        W
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            right: 24,
            width: 24,
            height: 24,
            background: '#FF4D00',
            borderRadius: '50%',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
