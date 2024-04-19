import fs from "fs/promises"
import path from "path"
import { Job } from "bull"

import { supabase } from "../../lib/client"
import { createDir } from "../../lib/filesystem"
import { Tables } from "../../types/supabase.types"

module.exports = async (job: Job<Tables<"rofl_files">>) => {
  const filepath = path.join(
    __dirname,
    "../../files/videos/",
    path.basename(job.data.object_name)
  )

  await createDir(filepath)

  job.log("dir created")

  const { data } = await supabase.storage
    .from(job.data.bucket_name)
    .download(job.data.object_name)

  job.log("file downloaded")

  if (!data) {
    return null
  }

  job.log("file exist")

  const buffer = Buffer.from(await data.arrayBuffer())

  await fs.writeFile(filepath, buffer)

  job.log("file writed")

  return { entity: job.data, filepath }
}
