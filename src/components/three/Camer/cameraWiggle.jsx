import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import useCameraStore from '../../stoer/usebr'
import * as THREE from 'three'

export const CameraWiggle = () => {
  const {
    cameraPosition,
    cameraRotation,
    fov,
    near,
    far,
  } = useCameraStore()

  const wiggleGroup = useRef()

  // 👉 每幀讓 group.rotation 加一點 sin 抖動
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const freq = 0.3 // 頻率
    const amp = 0.004 // 幅度，越小越穩

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
