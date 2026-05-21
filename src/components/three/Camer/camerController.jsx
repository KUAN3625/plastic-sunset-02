import { useThree } from "@react-three/fiber"
import { useEffect } from "react"
import useCameraStore from "../../stoer/usebr"


const CameraController = () => {
  const { camera } = useThree()
  const { 
    cameraPosition,
    cameraRotation,
    fov,
    near,
    far,
  } = useCameraStore()

  useEffect(() => {
    camera.position.set(...cameraPosition)
    camera.rotation.set(...cameraRotation)
    camera.fov = fov
    camera.near = near
    camera.far = far
    camera.updateProjectionMatrix()
  }, [cameraPosition,cameraRotation,fov,near,far])

  return null
}

export default CameraController
