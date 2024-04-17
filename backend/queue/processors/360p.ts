import path from "path"
import { supabase, uploadFile } from "../../lib/client"
import { toHls } from "../../lib/ffmpeg"

module.exports = async (job) => {
  const filepath = path.join(__dirname, "../../files/hls", job.data.filename)

  await toHls(job.data.filepath, filepath, {
    width: 640,
    height: 360,
    bitrate: "800k",
    maxrate: "856k",
    bufsize: "1200k",
  })

  const res = await uploadFile(filepath, "rofls")

  if (res.data) {
    await supabase
      .from("rofl_files")
      .update({
        preview_bucket_name: "rofls",
        preview_object_name: res.data.path,
      })
      .eq("id", job.data.entity.id)
  }

  return { filepath }
}
