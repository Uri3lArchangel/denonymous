import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';

const es = initEdgeStore.create();
const edgeStoreRouter = es.router({
    denonymousMedia:es.fileBucket({
        maxSize:1024*1024*60
    }),
})

const handler = createEdgeStoreNextHandler({
    router:edgeStoreRouter
})

export { handler as GET,handler as POST}
export type EdgeStoreRouter = typeof edgeStoreRouter