import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { usePomodoroTimer } from '../src/components/stoer/usePomodoroTimer'
import * as THREE from 'three'

export function GODD(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/3D/30-transformed.glb')
  const { actions } = useAnimations(animations, group)
  const status = usePomodoroTimer((s) => s.status)

  useEffect(() => {
    // 🔹 當番茄鐘進入「focus」狀態時播放動畫一次
    if (status === 'focus') {
      const first = Object.values(actions)[0]
      if (first) {
        first.setLoop(THREE.LoopOnce, 1)
        first.clampWhenFinished = true // 動畫停在最後一幀
        first.reset().fadeIn(1).play()
      }
    }
  }, [status, actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="ground"
          geometry={nodes.ground.geometry}
          material={materials['BG-2']}
        />
         <mesh
          name="the_way"
          geometry={nodes.the_way.geometry}
          material={materials.BG}
        />
      
              <mesh
          name="Cube002"
          geometry={nodes.Cube002.geometry}
          material={nodes.Cube002.material}
          position={[37.694, 3.416, 4.672]}
          rotation={[0, -0.436, 0]}
          scale={[1.851, 0.737, 0.137]}
        />
        <mesh
          name="立方體"
          geometry={nodes.立方體.geometry}
          material={materials.BG}
          position={[5.657, 6.801, 16.593]}
          rotation={[0, 0.699, 0]}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/3D/30-transformed.glb')
