import { Job } from "bull"
import path from "path"

import ffmpeg from "../../lib/ffmpeg"
import { Tables } from "../../types/supabase.types"
import { supabase, uploadFile } from "../../lib/client"
import { changeExt, createDir } from "../../lib/filesystem"

type JobData = { entity: Tables<"rofl_files">; filepath: string }

const THUMBNAIL_BUCKET = "public_rofls"

module.exports = async (job: Job<JobData>) => {
  const filepath = path.join(
    __dirname,
    "../../files/thumbnails",
    changeExt(path.basename(job.data.entity.object_name), "png")
  )

  await createDir(filepath)

  await new Promise((resolve, reject) => {
    ffmpeg(job.data.filepath)
      .screenshots({
        count: 1,
        filename: path.basename(filepath),
        folder: path.dirname(filepath),
        timestamps: ["25%"],
      })
      .on("end", resolve)
      .on("error", reject)
  })

  const res = await uploadFile(filepath, THUMBNAIL_BUCKET, "thumbnails")

  if (res.data) {
    await supabase
      .from("rofl_files")
      .update({
        preview_bucket_name: THUMBNAIL_BUCKET,
        preview_object_name: res.data.path,
      })
      .eq("id", job.data.entity.id)
  }

  return {
    ...job.data,
    filepath,
    res,
  }
}
