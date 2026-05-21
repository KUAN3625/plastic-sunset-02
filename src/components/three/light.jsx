import { Environment } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, Pixelation } from '@react-three/postprocessing'
import { useEffectsStore } from '../stoer/useEffectsStore'

const DLight = () => {
  const quality = useEffectsStore((s) => s.effectsQuality)
  const pixelGranularity = useEffectsStore((s) => s.pixelGranularity)

  const shadowMapSize = quality > 40 ? 1024 : 512

  return (
    <>
      {/* HDR 環境光 */}
      <Environment
        files="/HDR/rosendal_park_sunset_2k.hdr"
        background={false}
        environmentIntensity={0.45}
      />

      {/* 半球光：模擬夕陽天空（上）與地面反彈（下） */}
      <hemisphereLight
        skyColor="#ffd080"
        groundColor="#7a4e28"
        intensity={0.5}
      />

      {/* 主光源：夕陽方向斜光 */}
      <directionalLight
        position={[30, 60, -30]}
        intensity={1.2}
        color="#ffc878"
        castShadow
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
        shadow-camera-near={1}
        shadow-camera-far={180}
        shadow-camera-left={-60}
        shadow-camera-right={60}
        shadow-camera-top={60}
        shadow-camera-bottom={-60}
        shadow-bias={-0.001}
      />

      {/* 補光：前側低角度暖色逆光，為陰影面填色 */}
      <directionalLight
        position={[-15, 8, 25]}
        intensity={0.22}
        color="#ff9a50"
      />

      {quality > 0 && (
        <EffectComposer>
          {pixelGranularity > 0 && <Pixelation granularity={pixelGranularity} />}
          {quality > 40 && <Bloom intensity={0.3} luminanceThreshold={0.85} mipmapBlur={quality > 70} />}
          <Vignette eskil={false} offset={0.1} darkness={-1.3} />
        </EffectComposer>
      )}

      <fog attach="fog" args={['#fde8c0', 12, 220]} />
    </>
  )
}

export default DLight
