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
    // gtag('config', 'G-VZF3V90PW7')
    gtag('config', 'AW-17964010415')

    // gtag('config', 'AW-17873077995/AjSoCPSA3P4bEOuNxspC', {
    //   phone_conversion_number: '+36203475029',
    // })
  }
})
