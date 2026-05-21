import React, { useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { usePomodoroTimer } from '../stoer/usePomodoroTimer'
import * as THREE from 'three'

export function Site(props) {
  const group = React.useRef()
  const { nodes, materials, animations } = useGLTF('/3D/26-transformed.glb')
  const { actions } = useAnimations(animations, group)
  const status = usePomodoroTimer((s) => s.status)

  
  useEffect(() => {
    // 🔹 當番茄鐘開始「focus」時，播放動畫一次
    if (status === 'focus') {
      const first = Object.values(actions)[0]
      if (first) {
        first.setLoop(THREE.LoopOnce, 1)
        first.clampWhenFinished = true //停在動畫最後一偵

        first.reset().fadeIn(1).play()
      }
    }
  }, [status, actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh name="ground" geometry={nodes.ground.geometry} material={materials.材質} position={[18.597, -1.028, -0.179]} rotation={[-Math.PI, 0, 0]} scale={[-0.185, -0.085, -0.256]} />
        <mesh name="Circle" geometry={nodes.Circle.geometry} material={nodes.Circle.material} position={[-50.33, -3.351, 19.85]} rotation={[0, 0, -Math.PI / 2]} scale={0.108} />
        {/* <mesh name="立方體" geometry={nodes.立方體.geometry} material={nodes.立方體.material} position={[5.657, 6.801, 16.593]} rotation={[0, 0.699, 0]} /> */}
      </group>
    </group>
  )
}

useGLTF.preload('/26-transformed.glb')
