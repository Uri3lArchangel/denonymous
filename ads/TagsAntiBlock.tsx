'use client'
import Script from 'next/script'
import React, { useEffect } from 'react'
import { push } from './Push';

function TagsAntiBlock() {
    useEffect(()=>{
        const a = document.getElementById('adtag') as HTMLDivElement;
        a.innerHTML=push
    },[])
  return (
    <>
<section id='adtag'></section>
<Script data-cfasync="false" id='ads-scripts-1' src='/assets/inpagePushAnti-adblock.js' async >
</Script> </> )
}


export default TagsAntiBlock