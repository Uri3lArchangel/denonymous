import Script from 'next/script'
import React from 'react'

function GoogleAnalytics() {
  return (
<Script>
  {`<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-QS4R8JWB80"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-QS4R8JWB80');
</script>`}
</Script>

)
}

export default GoogleAnalytics