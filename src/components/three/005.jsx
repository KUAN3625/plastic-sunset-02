import React, { useRef, useMemo, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import { usePomodoroTimer } from '../stoer/usePomodoroTimer'
import * as THREE from 'three' // ✅ 別忘了這行！

export function Humen(props) {
  const group = useRef()
  const { scene, animations } = useGLTF('/3D/30_01-transformed.glb')
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { actions } = useAnimations(animations, clone)
  const status = usePomodoroTimer((s) => s.status)

  // ✅ 一開始啟動時讓角色維持 default 動畫
  useEffect(() => {
    const idle = actions['default']
    if (idle) {
      idle.reset().fadeIn(0.5).play()
      idle.setLoop(THREE.LoopRepeat)
    }
  }, [actions])

  
  // ✅ 在 rest 或 done 狀態時播放 GOOD
  useEffect(() => {
       if (!actions) return

    if (status === 'rest' || status === 'done') {
      const good = actions['GOOD']
      const idle = actions['default']
      if (good) {
        // 停掉其他動畫
        Object.values(actions).forEach((a) => a.stop())

        // 播 GOOD 一次
        good.reset()
          .setLoop(THREE.LoopOnce, 1)
          .fadeIn(0.3)
          .play()
        good.clampWhenFinished = true

        console.log(`🎬 播放動畫 GOOD（觸發於 ${status}）`)

        // ⏳ 播完後回到 default
        const duration = good.getClip().duration * 1000 // 秒轉毫秒
        setTimeout(() => {
          if (idle) {
            good.fadeOut(0.3)
            idle.reset().fadeIn(0.5).play()
            idle.setLoop(THREE.LoopRepeat)
            console.log('↩️ GOOD 播完 → 回到 default')
          }
        }, duration + 300) // 加300ms餘裕，避免提早切換
      } else {
        console.warn("⚠️ 找不到動畫 'GOOD'")
      }
    }
  }, [status, actions])

  return <primitive ref={group} object={clone} {...props} />
}

useGLTF.preload('/3D/30_01-transformed.glb')
