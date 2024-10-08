import DePointsClient from '@/src/FE/components/DePointsClient'

const DePoints = async() => {

const res = await fetch(process.env.baseURL!+"/api/getDePoints",{next:{revalidate:false,tags:['denonymous_box_0102','raieneidmie_00','depoints_tag']}})
const [data,error] = await res.json() as [{points:number,auth:boolean},string]
if(error){

}

  return (
 <DePointsClient points={data.points} auth={data.auth} />
  )
}

export default DePoints