import Script from 'next/script'
import React from 'react'

function GoogleAnalytics() {
  return (

<Script async src="https://www.googletagmanager.com/gtag/js?id=G-CK5FQ4VMSR" strategy='lazyOnload'>
  {`<!-- Google tag (gtag.js) -->
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-CK5FQ4VMSR');
`}
</Script>

)
}

export default GoogleAnalytics