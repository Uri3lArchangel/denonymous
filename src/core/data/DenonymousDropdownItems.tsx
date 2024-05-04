import { DisableMediaButtons_audio, DisableMediaButtons_image, DisableMediaButtons_video } from "@/src/FE/components/subcomponents/DisableMediaButtons";
import { MenuProps } from "antd";


export const DenonymousMediaSettingDropdownItems: (status:{video:boolean,image:boolean,audio:boolean},key_:string,owner:string)=>MenuProps["items"] =(status:{video:boolean,image:boolean,audio:boolean},key_:string,owner:string)=>{
    return [

{
    key:"1",
    label:(
<DisableMediaButtons_video status={status} key_={key_} owner={owner} />
        )
},
{
    key:"2",
    label:(
        <DisableMediaButtons_audio  status={status} key_={key_} owner={owner}  />
    )
},{
    key:"3",
    label:(
        <DisableMediaButtons_image  status={status} key_={key_} owner={owner}  />
    )
}
]

}