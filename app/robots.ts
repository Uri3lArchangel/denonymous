import { MetadataRoute } from "next";

export default function robots():MetadataRoute.Robots{
    return{
        rules:[
            {
                userAgent:"*",
                allow:['/','/auth/*','/images/logo.avif','/images/delogo.avif','/favicon.ico'],
                disallow:['/notifications/','/settings/','/api/','/images/','/auth/new-password/','/r/']
            }
        ]
    }
}
