"use client"
import { UploadResult, UppyFile } from "@uppy/core"
import dynamic from "next/dynamic"
import { forwardRef, useState } from "react"
import RoflForm from "./RoflForm"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"

const Dropzone = dynamic(() => import("@/components/Dropzone"), { ssr: false })

type MemeCreationState = "upload" | "filling"
type CreateMemeProps = {
  onFileAdded?: (file: UppyFile) => void
  onUploadCancel?: () => void
  onFileDragOver?: () => void
  onRoflSubmit?: () => void
}

export type RoflCreationItem = {
  title: string
  files: UppyFile[]
}

export default forwardRef<HTMLDivElement, CreateMemeProps>(
  ({ onFileAdded, onUploadCancel, onFileDragOver, onRoflSubmit }, ref) => {
    const router = useRouter()
    const [state, setState] = useState<MemeCreationState>("upload")
    const [rofl, setRofl] = useState<RoflCreationItem>({
      title: "",
      files: [],
    })

    const onUploadFinish = (result: UploadResult) => {
      setRofl((val) => ({ ...val, files: result.successful }))
    }

    const onUploadDone = () => {
      setState("filling")
    }

    const onRoflChange = (newRofl: RoflCreationItem) => {
      setRofl(newRofl)
    }

    const onSubmit = async () => {
      const supabase = createClient()

      const { data: roflItem, error } = await supabase
        .from("rofls")
        .insert({ title: rofl.title })
        .select()
        .limit(1)
        .single()

      if (error || !roflItem) {
        error && console.error(error)
        return
      }

      await supabase.from("rofl_files").insert(
        rofl.files.map((file) => ({
          meme_id: roflItem.id,
          bucket_name: file.meta.bucketName as unknown as string,
          object_name: file.meta.objectName as unknown as string,
        }))
      )

      setRofl({
        title: "",
        files: [],
      })
      setState("upload")

      onRoflSubmit?.()

      router.push("/r/" + roflItem.slug)
    }

    const getContent = () => {
      if (state === "upload") {
        return (
          <Dropzone
            onFileAdded={onFileAdded}
            onFinish={onUploadFinish}
            onCancel={onUploadCancel}
            onDone={onUploadDone}
            onDragOver={onFileDragOver}
          />
        )
      }

      return (
        <RoflForm value={rofl} onChange={onRoflChange} onSubmit={onSubmit} />
      )
    }

    return <div ref={ref}>{getContent()}</div>
  }
)
