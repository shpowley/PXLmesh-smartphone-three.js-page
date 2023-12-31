import { useTexture } from "@react-three/drei"

const FallbackMaterial = ({ video_url }) => {
  const texture = useTexture(video_url)

  return <meshBasicMaterial map={texture} />
}

export default FallbackMaterial