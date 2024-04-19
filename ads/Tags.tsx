'use client'
import React, { useEffect } from 'react'
// import {run} from '@/ads/tags'
import Script from 'next/script'


function Tags() {

  return (
< >
<Script data-cfasync="false"  id='ads-scripts-1' src='/assets/pushAnti-adblock.js' strategy='afterInteractive'>
</Script>

<Script data-cfasync="false" id='ads-scripts-2' src='/assets/inpagePushAnti-adblock.js' strategy='afterInteractive'>
</Script>
</>    )
}

export default Tags