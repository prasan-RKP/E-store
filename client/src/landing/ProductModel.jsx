import { useGLTF, Float } from "@react-three/drei"

// This is a separate component for the 3D model
// In a real implementation, you would use your own 3D model
function ProductModel({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 2.5 }) {
  // Replace this with your actual model path
  const { scene } = useGLTF("/assets/3d/duck.glb")

  return (
    <Float rotationIntensity={0.4} floatIntensity={1.5} speed={1.5}>
      <primitive object={scene} position={position} rotation={rotation} scale={scale} />
    </Float>
  )
}

export default ProductModel
