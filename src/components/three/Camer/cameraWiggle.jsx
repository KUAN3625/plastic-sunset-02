import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import useCameraStore from '../../stoer/usebr'
import { useEffectsStore } from '../../stoer/useEffectsStore'

export const CameraWiggle = () => {
  const {
    cameraPosition,
    cameraRotation,
    fov,
    near,
    far,
  } = useCameraStore()

  const quality = useEffectsStore((s) => s.effectsQuality)
  const wiggleGroup = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const freq = 0.3
    const amp = (quality / 100) * 0.004

    if (wiggleGroup.current) {
      wiggleGroup.current.rotation.x = Math.sin(t * freq * 1.2) * amp
      wiggleGroup.current.rotation.y = Math.sin(t * freq * 1.8) * amp
      wiggleGroup.current.rotation.z = Math.sin(t * freq * 2.0) * amp * 0.5
    }
  })

  return (
    <group ref={wiggleGroup}>
      <PerspectiveCamera
        makeDefault
        position={cameraPosition}
        rotation={cameraRotation}
        fov={fov}
        near={near}
        far={far}
      />
    </group>
  )
}
