import React from 'react'

const AuthenticatedPointsModal = ({points}:{points:number}) => {
  return (
   <section>
    <h1>You earned {points} Points! 🎉  </h1>
    <p>Earn more points by performing various actions</p>
    <p>We have also hidden various easter eggs round the app 😉 so play around and discover</p>
   </section>
  )
}

export default AuthenticatedPointsModal