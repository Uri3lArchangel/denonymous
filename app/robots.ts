import { MetadataRoute } from "next";

export default function robots():MetadataRoute.Robots{
    return{
        rules:[
            {
                userAgent:"*",
                allow:['/','/auth/*','/images/logo.png','/images/delogo.png','/r/'],
                disallow:['/notifications/','/settings/','/api/','/images/','/auth/new-password/']
            }
        ]
    }
}
