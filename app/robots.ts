import { MetadataRoute } from "next";

export default function robots():MetadataRoute.Robots{
    return{
        rules:[
            {
                userAgent:"*",
                allow:['/','/auth/*','/images/logo.avif','/images/delogo.avif','/favicon.ico','/r/','/settings/','/notifications/','/terms','/policy'],
                disallow:['/api/','/images/','/auth/new-password/']
            }
        ]
    }
}
