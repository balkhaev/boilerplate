import Queue from "bull"
import path from "path"

const getProcessorPath = (filename: string) =>
  path.join(__dirname, "processors/", filename)

export const downloadQueue = new Queue("download")
export const hls360Queue = new Queue("ffmpeg_hls_360p")
export const hls480Queue = new Queue("ffmpeg_hls_480p")
export const hls720Queue = new Queue("ffmpeg_hls_720p")
export const thumbnailQueue = new Queue("ffmpeg_thumbnail")

hls360Queue.process(getProcessorPath("360p.ts"))
hls480Queue.process(getProcessorPath("480p.ts"))
hls720Queue.process(getProcessorPath("720p.ts"))
downloadQueue.process(getProcessorPath("download.ts"))
thumbnailQueue.process(getProcessorPath("thumbnail.ts"))

downloadQueue.on("completed", (job) => {
  thumbnailQueue.add(job.returnvalue)
  hls360Queue.add(job.returnvalue)
  hls480Queue.add(job.returnvalue)
  hls720Queue.add(job.returnvalue)
})
