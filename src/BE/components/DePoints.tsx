import DePointsClient from '@/src/FE/components/DePointsClient'

const DePoints = async() => {
const res = await fetch("/api/getDePoints")
const [data,error] = await res.json() as [{points:number,auth:boolean},string]
if(error){

}

  return (
 <DePointsClient points={data.points} auth={data.auth} />
  )
}

export default DePoints