import { ExpressAdapter } from "@bull-board/express"
import { createBullBoard } from "@bull-board/api"
import { BullAdapter } from "@bull-board/api/bullAdapter"

import {
  hls360Queue,
  hls480Queue,
  hls720Queue,
  thumbnailQueue,
  downloadQueue,
} from "./queues"

const serverAdapter = new ExpressAdapter()

serverAdapter.setBasePath("/queues")

createBullBoard({
  queues: [
    hls360Queue,
    hls480Queue,
    hls720Queue,
    thumbnailQueue,
    downloadQueue,
  ].map((queue) => new BullAdapter(queue)),
  serverAdapter,
})

export default serverAdapter
