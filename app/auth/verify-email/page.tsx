import React from 'react'

function page() {
  return (
    <div>
        <button>resend verification link</button>
        <label htmlFor="email_change">change email address</label>
        <input type="email" id='email_change' placeholder='abc...@gmail.com' />
        <button>Change email</button>
    </div>
  )
}

export default page