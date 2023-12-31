import { useTexture } from "@react-three/drei"
import * as THREE from 'three'

const TextureMaterial = ({
  material,
  texture_url,
  color = 0x000000,
  scale = 1,
  pos_x = 0,
  pos_y = 0
}) => {

  let
    texture,
    ctx,
    canvas_texture

  // COMMENT:
  // - compared to what I do in VideoMaterial.jsx, I draw the texture to a canvas
  //   which in turn is easier to manipulate (scale, position, etc.)
  // - in VideoMaterial.jsx, I use texture.repeat.set() and texture.offset.set()
  //   to manipulate the texture. it works, but is kinda weird..
  if (texture_url) {
    texture = useTexture(texture_url)

    const larger_dimension = Math.max(texture.image.width, texture.image.height)

    ctx = document.createElement('canvas').getContext('2d')
    ctx.canvas.width = larger_dimension
    ctx.canvas.height = larger_dimension
    ctx.scale(scale, scale)

    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
    ctx.drawImage(
      texture.image,
      pos_x,
      pos_y,
      texture.image.width,
      texture.image.height
    )

    canvas_texture = new THREE.CanvasTexture(ctx.canvas)
  }

  return (
    <meshStandardMaterial
      map={canvas_texture}
      color={texture_url ? 0xffffff : color}
      roughness={material.roughness}
    />
  )
}

export default TextureMaterial