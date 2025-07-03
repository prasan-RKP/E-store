// This is a separate component for decorative floating spheres
function FloatingSphere({ position, size, color }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
    </mesh>
  )
}

export default FloatingSphere
