import { useControls, folder } from "leva";

const DefaultMaterial = () => {
  const { color, metalness, roughness } = useControls({
    "Material": folder({
      color: "#e8e8e8",
      metalness: {
        value: 0, min: 0, max: 1,
      },
      roughness: {
        value: 1, min: 0, max: 1,
      }
    })
   
  });

  return (
    <meshStandardMaterial metalness={metalness}  roughness={roughness} color={color}></meshStandardMaterial>
  )
}

export default DefaultMaterial;