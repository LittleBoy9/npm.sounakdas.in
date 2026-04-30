import { useEffect } from 'react'

interface Props {
  gaId: string
}

export function GoogleAnalytics({ gaId }: Props) {
  useEffect(() => {
    if (!gaId) return

    const loader = document.createElement('script')
    loader.id = 'ga-loader'
    loader.async = true
    loader.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    document.head.appendChild(loader)

    const init = document.createElement('script')
    init.id = 'ga-init'
    init.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`
    document.head.appendChild(init)

    return () => {
      document.getElementById('ga-loader')?.remove()
      document.getElementById('ga-init')?.remove()
    }
  }, [gaId])

  return null
}
