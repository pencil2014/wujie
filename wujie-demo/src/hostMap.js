const map = {
  '//localhost:7700/': '//oss.longsail.com/xxx'
}

export default function hostMap(host) {
  if (process.env.NODE_ENV === 'production') return map[host]
  return host
}
