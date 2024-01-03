import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';

const es = initEdgeStore.create();
const edgeStoreRouter = es.router({
    denonymousImages:es.imageBucket({
        
    }),
    denonymousVideos:es.fileBucket(),
    denonymousAudios:es.fileBucket()
})

const handler = createEdgeStoreNextHandler({
    router:edgeStoreRouter
})

export { handler as GET,handler as POST}
export type EdgeStoreRouter = typeof edgeStoreRouter