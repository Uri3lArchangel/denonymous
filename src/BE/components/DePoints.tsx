import DePointsClient from '@/src/FE/components/DePointsClient'
import { URLRESOLVE } from '@/src/core/lib/helpers'

const DePoints = async() => {
const res = await fetch(URLRESOLVE("/api/getDePoints"))
const [data,error] = await res.json() as [{points:number,auth:boolean},string]
if(error){

}

  return (
 <DePointsClient points={data.points} auth={data.auth} />
  )
}

export default DePoints