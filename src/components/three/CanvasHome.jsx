import { Route } from 'react-router-dom'
import { Canvas, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, Fisheye, Grid, OrbitControls, Preload, useProgress } from '@react-three/drei'
import DLight from './light'
import CameraController from './Camer/camerController'
import { Suspense, useEffect } from 'react'
import Role from './2D/Role/Role'
import SphereByStatus from '../stoer/T'
import { CameraWiggle } from './Camer/cameraWiggle'
import { Site } from './004'
import { Humen } from './005'
import { Sunsevven } from './Home_v6'
import { useAppLoading } from '../../Home/useAppLoading'


function LoaderBridge() {
  const { active } = useProgress()
  const finishLoading = useAppLoading((s) => s.finishLoading)

  useEffect(() => {
    // active = true 表示還在載
    if (!active) {
      finishLoading()
    }
  }, [active, finishLoading])

  return null
}

const DebugState = () => {
  const state = useThree()

  useEffect(() => {
    console.log('R3F State:', state)
  },)
  return
}


const BgCanvas = () => {
useEffect(() => {
  const canvas = document.querySelector('canvas')
  if (canvas) {
    canvas.style.background = 'linear-gradient(to top, #d6783a, #fff6db)'
  }
}, [])



  return (
    <>

    <Canvas
  shadows="baked"
  camera={{ fov: 30, near: 0.1, far: 1000, position: [12.67, -0.46, 29.93] }}
  frameloop="always"
  className="fixed inset-0"
>
  <Suspense fallback={null}>
    <LoaderBridge />

    {/* 原本的東西全部放回來 */}
    <Humen rotation={[0, Math.PI / 3, 0]} scale={0.56} position={[38, -1.15, -2.5]} />
    <DLight />
    <DebugState />
    <CameraWiggle />
    <Sunsevven />
    {/* <OrbitControls/> */}
    {/* <Role position={[0, 0, 1]} /> */}
    {/* <SphereByStatus /> */}
  </Suspense>
</Canvas>

    </>
  )


}


export default BgCanvas;