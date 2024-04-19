import { createClient } from "@supabase/supabase-js"
import fs from "fs/promises"
import path from "path"

import { Database } from "../types/supabase.types"

export const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const uploadFile = async (
  filepath: string,
  bucketName: string,
  folder?: string
) => {
  const file = await fs.readFile(filepath)
  const filename = path.basename(filepath)

  const res = await supabase.storage
    .from(bucketName)
    .upload(folder ? `${folder}/${filename}` : filename, file)

  await fs.unlink(filepath)

  return res
}

export default supabase
