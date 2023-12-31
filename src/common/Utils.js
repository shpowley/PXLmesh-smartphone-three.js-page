const URL_PARAMS = new URLSearchParams(window.location.search)

// GET URL PARAMETER KEY
const parameterEnabled = key => {
  const param = URL_PARAMS.get(key)

  if (param === null || param === "false") {
    return false
  }
  else {
    return true
  }
}

export { parameterEnabled }