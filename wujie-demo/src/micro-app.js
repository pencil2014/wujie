
import lifecycles from './lifecycle'
import credentialsFetch from './fetch'
let isProduction =  process.env.NODE_ENV === 'production'
const degrade =
  window.localStorage.getItem('degrade') === 'true' ||
  !window.Proxy ||
  !window.CustomElementRegistry
const microApps = [
  {
    name: 'wms',
    url: 'http://192.168.1.15:7700/',
    attrs: isProduction ? { src: hostMap("//localhost:7700/") } : {},
    exec: true,
    alive: true,
    degrade,
    fetch: credentialsFetch,
    ...lifecycles,
    wmsAttrs: isProduction ? { src: hostMap("//localhost:7700/") } : {},
  }
]

export default microApps