import Script from 'next/script'
import React from 'react'

function GoogleAnalytics() {
  return (
<Script async src="https://www.googletagmanager.com/gtag/js?id=G-QS4R8JWB80" strategy='afterInteractive'>
  {`<!-- Google tag (gtag.js) -->
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-QS4R8JWB80');
`}
</Script>

)
}

export default GoogleAnalytics