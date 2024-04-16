'use client'
import Loading from '@/app/loading'
import React from 'react'
import { useFormStatus } from 'react-dom'

function DeleteAccountButton({clickable}:{clickable:boolean}) {
const {pending} = useFormStatus()

  return (
  )
}

export default DeleteAccountButton