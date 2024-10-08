import DePointsClient from '@/src/FE/components/DePointsClient'
import { cookieKey } from '@/src/core/data/constants'
import { verifyUserDataToken } from '@/src/core/lib/JWTFuctions'
import { cookies } from 'next/headers'



const DePoints = async() => {
  let data :{points:number,auth:boolean}
  const cookie = cookies().get(cookieKey)
  if(!cookie||!cookie.value){
      data= {points:0,auth:false}
  }else{
  const user = verifyUserDataToken(cookie.value)
  if(!user){
    data= {points:0,auth:false}
  }
  else{
  data= {points:0,auth:true}

const res = await fetch(process.env.baseURL!+"/api/getDePoints",{method:"POST",body:(JSON.stringify({username:user.username})),next:{revalidate:false,tags:['denonymous_box_0102','raieneidmie_00','depoints_tag']}})
const [d,error] = await res.json() as [{points:number,auth:boolean},string]
if(error){

}
data.points=d.points
}

  }

  return (
 <DePointsClient points={data.points} auth={data.auth} />
  )
}

export default DePoints