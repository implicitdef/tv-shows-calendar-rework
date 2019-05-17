import { useEffect } from 'react'

export default function PlainLook() {
  useEffect(() => {
    document.title = 'Localhost-'
    document.body.classList.add('plain')
  }, [])
  return null
}
