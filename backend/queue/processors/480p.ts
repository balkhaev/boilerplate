import path from "path"
import { toHls } from "../../lib/ffmpeg"

module.exports = async (job) => {
  const filepath = path.join(__dirname, "../../files/hls", job.data.filename)

  await toHls(job.data.filepath, filepath, {
    width: 842,
    height: 480,
    bitrate: "1400k",
    maxrate: "1498k",
    bufsize: "2100k",
  })

  return { filepath }
}
