import { SpriteAnimator } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { PointLight } from "three";

const Role = () => {
  const lightRef = useRef();

  return (
 

   <>
      <SpriteAnimator
        textureImageURL="/sprite/HD.png"
        textureDataURL="/sprite/HS.json"
        fps={5}
        loop
        autoPlay
        scale={[2, 1.5, 1.5]}
        position={[56, 0.1, 9]}
        alphaTest={0.01}
        asSprite={true}//看板技術，首選方案
        rotation={[0, Math.PI / 3, 0]}//備選方案，手動調節
        roundFramePosition={true}   // 修正「邊界漏光」
        canvasRenderingContext2DSettings={{ willReadFrequently: true }}
      />

            <pointLight
        ref={lightRef}
        position={[56, 3, 13]}
        intensity={12}
        distance={100}
        decay={2}
        color="white"
        
      />
    </>
  );
};

export default Role;
