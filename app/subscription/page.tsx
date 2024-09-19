import Subscription from "./Subscription";

// const fetchIPGeoLocationCurrency = async()=>{
//   const res = await fetch(process.env.baseURL+"/api/ipgeolocation",{next:{revalidate:0},method:"POST",body:JSON.stringify({})})
//   const [data,error] = await res.json(); 
//   if(error){
//     console.log(error)
//     return {price:3.50,currency:'USD'}
//   }
//   return data as {price:number,currency:string};

// }


const page = async() => {
  // const {price,currency} = await fetchIPGeoLocationCurrency();
  return (
    <Subscription />
  );
};

export default page;
