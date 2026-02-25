export default defineNuxtPlugin(() => {
  if (process.client) {
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17964010415'
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    function gtag() {
      dataLayer.push(arguments)
    }
    window.gtag = gtag

    gtag('js', new Date())
    gtag('config', 'G-5SRVCK6Z8D')
    gtag('config', 'AW-17964010415')

    gtag('config', 'AW-17964010415/ITK5COrC7_4bEK-X9PVC', {
      phone_conversion_number: '+36 20 347 5029',
    })
  }
})
