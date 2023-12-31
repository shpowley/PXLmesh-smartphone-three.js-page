const Footer = ({ handlerAttribution }) => {
  const current_year = new Date().getFullYear()

  return <div id='pxlmesh_footer'>
    <span id='footer_left'>PXLmesh, LLC | Copyright © {current_year}</span>
    <span id='footer_attribution' onClick={handlerAttribution}>Attribution</span>
  </div>
}

export default Footer