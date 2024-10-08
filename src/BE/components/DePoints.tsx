import DePointsClient from '@/src/FE/components/DePointsClient'
import { cookieKey } from '@/src/core/data/constants'
import { verifyUserDataToken } from '@/src/core/lib/JWTFuctions'
import { cookies } from 'next/headers'



const DePoints = async() => {
  


  

  return (
 <DePointsClient />
  )
}

export default DePoints