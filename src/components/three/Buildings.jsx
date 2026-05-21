import * as THREE from 'three'

const GROUND_Y = -1.5

// [x, z, width, height, depth, color]
const BUILDINGS = [
  // ── 左側遠景 ──────────────────────────
  [-22,  -48,  7, 14, 6,  '#c8a882'],
  [-34,  -42,  6,  9, 5,  '#b89468'],
  [-46,  -55,  8, 18, 7,  '#d2b08a'],
  [-14,  -60,  5, 10, 5,  '#c0966e'],
  [-56,  -48,  9, 12, 8,  '#bea07a'],

  // ── 右側遠景 ──────────────────────────
  [ 46,  -44,  8, 13, 7,  '#c8a882'],
  [ 58,  -52,  7, 17, 6,  '#d2b08a'],
  [ 34,  -58,  6, 10, 5,  '#b89468'],
  [ 68,  -46,  9, 14, 9,  '#bea07a'],
  [ 26,  -64,  5,  9, 5,  '#c0966e'],
]

const Building = ({ x, z, w, h, d, color }) => {
  const y = GROUND_Y + h / 2
  return (
    <mesh position={[x, y, z]} castShadow receiveShadow>
      <boxGeometry args={[w, h, d]} />
      <meshStandardMaterial
        color={color}
        roughness={0.85}
        metalness={0.05}
      />
    </mesh>
  )
}

export const Buildings = () => (
  <group>
    {BUILDINGS.map(([x, z, w, h, d, color], i) => (
      <Building key={i} x={x} z={z} w={w} h={h} d={d} color={color} />
    ))}
  </group>
)
