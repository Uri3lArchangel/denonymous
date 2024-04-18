'use client'
import React, { useEffect } from 'react'
// import {run} from '@/ads/tags'
import Script from 'next/script'
import { inpagePushAd } from './inpagepush-adblock'
import { pushNotAd } from './push-notifciation-ad'
import { popunderAD } from './popunder'


function Tags() {

  return (
<>
<Script id='ads-scripts-1' strategy='afterInteractive'>
  {`${inpagePushAd}`}
</Script>
<Script id='ads-scripts-2' strategy='afterInteractive'>
  {`${pushNotAd}`}
</Script>
<Script id='ads-scripts-3' strategy='afterInteractive'>
  {`${popunderAD}`}
</Script>
</>    )
}

export default Tags