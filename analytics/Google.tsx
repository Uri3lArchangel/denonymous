import Script from 'next/script'
import React from 'react'

function GoogleAnalytics() {
  return (
 
<Script async src="https://www.googletagmanager.com/gtag/js?id=G-RS8B8EZPE2">
  {`<!-- Google tag (gtag.js) -->
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  
    gtag('config', 'G-RS8B8EZPE2');
`}
</Script>

)
}

export default GoogleAnalytics