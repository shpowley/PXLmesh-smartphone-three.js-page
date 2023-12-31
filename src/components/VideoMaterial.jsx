import { useVideoTexture } from "@react-three/drei"

let video_element

const VideoMaterial = ({
  video_url,
  material,
  finishPlayingEvent,
  muted = true,
  loop = true,
  flip_x = false,
  flip_y = false,
  scale_x = 1,
  scale_y = 1,
  offset_x = 0,
  offset_y = 0,
}) => {

  if (video_element) {
    video_element.pause()
    video_element.muted = true
    video_element.currentTime = 0
    video_element = null
  }

  if (!video_url) {
    return <meshStandardMaterial color={0x000000} roughness={material.roughness} />
  }

  // DREI: useVideoTexture
  // https://github.com/pmndrs/drei#usetexture
  const texture = useVideoTexture(video_url)

  // shrink/grow/flip texture
  texture.repeat.set(
    scale_x * (flip_x ? -1 : 1),
    scale_y * (flip_y ? -1 : 1)
  )

  texture.center.set(0.5, 0.5) // set texture center for repeat options (also moves texture, but texture.offset.set() seems better for that)
  texture.offset.set(offset_x, offset_y) // move texture (better to think of a viewport moving)

  video_element = texture.source.data

  video_element.addEventListener('ended', () => {
    finishPlayingEvent(false)
  })

  // NOTE:
  // - onload event doesn't seem to be available for useVideoTexture
  //   using setTimeout as a workaround -- a bit hacky
  setTimeout(() => {
    if (video_element) {
      // HTML DOM Video Object
      // https://www.w3schools.com/jsref/dom_obj_video.asp
      video_element.currentTime = 0
      video_element.muted = muted
      video_element.loop = loop
      video_element.play()
    }
  }, 200)

  return <meshStandardMaterial
    map={texture}
    roughness={material.roughness}
  />
}

export default VideoMaterial