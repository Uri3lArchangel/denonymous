import DePointsClient from '@/src/FE/components/DePointsClient'
import { cookieKey } from '@/src/core/data/constants'
import { verifyUserDataToken } from '@/src/core/lib/JWTFuctions'
import { cookies } from 'next/headers'

const DePoints = () => {
    let points = 0
    const cookie = cookies().get(cookieKey)
    if(cookie && cookie.value){
        const data = verifyUserDataToken(cookie.value)
        if(data){
        points = data.points
        }
    }

  return (
 <DePointsClient points={points} />
  )
}

export default DePoints