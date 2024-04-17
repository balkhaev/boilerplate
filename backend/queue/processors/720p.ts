import path from "path"
import { toHls } from "../../lib/ffmpeg"

module.exports = async (job) => {
  const filepath = path.join(__dirname, "../../files/hls", job.data.filename)

  await toHls(job.data.filepath, filepath, {
    width: 1280,
    height: 720,
    bitrate: "2800k",
    maxrate: "2996k",
    bufsize: "4200k",
  })

  return { filepath }
}
