import fs from "fs/promises"
import path from "path"

const pathExist = (dirpath: string) =>
  fs.access(dirpath).then(
    () => true,
    () => false
  )

export const createDir = async (filepath: string) => {
  const dirpath = path.dirname(filepath)
  const dirExisted = await pathExist(dirpath)

  if (!dirExisted) {
    await fs.mkdir(dirpath, { recursive: true })
  }
}

export const changeExt = (filename: string, ext: string) => {
  return path.format({ ...path.parse(filename), base: "", ext })
}
