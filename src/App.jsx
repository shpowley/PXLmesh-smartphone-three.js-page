import { useRef } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import { Leva, useControls } from 'leva'
import { parameterEnabled } from './common/Utils'
import Footer from './components/Footer'

const tone_mapping_options = {
  None: THREE.NoToneMapping,
  Linear: THREE.LinearToneMapping,
  Reinhard: THREE.ReinhardToneMapping,
  Cineon: THREE.CineonToneMapping,
  ACESFilmic: THREE.ACESFilmicToneMapping,
}

const debug_enabled = parameterEnabled('DEBUG') || parameterEnabled('debug')

const AttributionItem = ({ title_href, title, author_href, author }) => {
  return <label>
    <a href={title_href} target='_blank'>{title}</a>
    &nbsp;by <a href={author_href} target='_blank'>{author}</a>
    <br />licensed under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC-BY-4.0</a>
  </label>
}

const App = () => {
  const ref_attributions_modal = useRef()

  const camera_init = {
    fov: 45,
    near: 0.1,
    far: 200,
    position: [0, 0, 6],
  }

  // Tone mapping with React Three Fiber
  // https://discourse.threejs.org/t/tone-mapping-change-tonemapping-type/48266/4
  const controls_gl = useControls(
    'tone mapping',

    {
      tone_mapping: {
        label: 'tone',
        value: THREE.ReinhardToneMapping,
        options: tone_mapping_options,
      },

      tone_exposure: {
        label: 'exposure',
        value: 1.5,
        min: 0,
        max: 5,
        step: 0.1,
      },
    },

    { collapsed: true }
  )

  // modal open/close
  const openDialog = dialog => {
    dialog.style.display = "flex"

    dialog
      .animate([
        { opacity: 0 },
        { opacity: 1 },
      ], {
        delay: 300,
        duration: 700,
        easing: "ease-in-out",
      })
      .onfinish = () => {
        dialog.style.opacity = 1
      }
  }

  const closeDialog = dialog => {
    dialog
      .animate([
        { opacity: 1 },
        { opacity: 0 },
      ], {
        duration: 500,
        easing: "ease-in-out",
      })
      .onfinish = () => {
        dialog.style = null
      }
  }

  return <>
    <Leva
      hidden={!debug_enabled}
      collapsed

      titleBar={{
        drag: false,
        title: 'DEBUG PANEL',
        filter: false,
      }}
    />

    <Canvas
      gl={{
        toneMapping: controls_gl.tone_mapping,
        toneMappingExposure: controls_gl.tone_exposure,
      }}

      // shadows

      camera={{
        fov: camera_init.fov,
        near: camera_init.near,
        far: camera_init.far,
        position: camera_init.position,
      }}
    >
      <Experience camera_init={camera_init} />
    </Canvas>

    {/* MODAL ATTRIBUTIONS DIALOG */}
    <div
      ref={ref_attributions_modal}
      id="modal_copyright"
      className="modal"

      onClick={() => closeDialog(ref_attributions_modal.current)}
    >
      <div
        id="dialog_copyright"
        onClick={e => e.stopPropagation()}
      >
        <label id="label_copyright">Media Attribution</label>

        <div className="dialog_container">
          <div className="copyright_subcontainer">
            <h1>3D Models</h1>
            <AttributionItem
              title={'"Samsung Galaxy S21 Ultra" (Sketchfab)'}
              title_href={'https://skfb.ly/6YtLJ'}
              author={'DatSketch'}
              author_href={'https://sketchfab.com/DatSketch'}
            />
            <AttributionItem
              title={'"Worn Sword" (Sketchfab)'}
              title_href={'https://skfb.ly/6V8SF'}
              author={'Jack Bronswijk'}
              author_href={'https://sketchfab.com/Jack_Bronswijk'}
            />
          </div>
          <div className="copyright_subcontainer">
            <h1>Other</h1>
            <label>Google Play and the Google Play logo are trademarks of Google LLC.</label>
          </div>
        </div>
      </div>
    </div>

    <Footer handlerAttribution={() => openDialog(ref_attributions_modal.current)} />
  </>
}

export default App