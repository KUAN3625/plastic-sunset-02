import { DirectionalLight, Fog } from "three"
import { ContactShadows, Environment, Sky } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette, Pixelation } from '@react-three/postprocessing'

const DLight = () => {



    return (

        <>
            <Environment
                files=" /HDR/rosendal_park_sunset_2k.hdr"
                background={false}
                environmentIntensity={0.5}
                castShadow
            />
<directionalLight
  position={[30, 60, -30]}
  intensity={1.3}
  color={'#ffdca8'}
  castShadow
  shadow-mapSize-width={1024}
  shadow-mapSize-height={1024}
/>


<EffectComposer>
  {/* <Noise opacity={0.02} />  */}
  <Pixelation granularity={2} /> 
<Bloom intensity={0.25} luminanceThreshold={0.9} mipmapBlur />
  <Vignette eskil={false} offset={0.1} darkness={-1.3} />

  </EffectComposer> 


{/* 霧 */}
<fog attach="fog" args={['#ffeed8', 10, 250]} />

{/* 上面特效暫時關閉 */}


        </>
    )
}

export default DLight