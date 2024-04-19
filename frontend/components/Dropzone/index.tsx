"use client"
import React, { useCallback, useMemo } from "react"
import Uppy, { UploadResult, UppyFile } from "@uppy/core"
import Webcam from "@uppy/webcam"
import { Dashboard } from "@uppy/react"
import Russian from "@uppy/locales/lib/ru_RU"
import Tus from "@uppy/tus"
import Url from "@uppy/url"
import ScreenCapture from "@uppy/screen-capture"
import Audio from "@uppy/audio"
import Dropbox from "@uppy/dropbox"
import { v4 as uuidv4 } from "uuid"
import ImageEditor from "@uppy/image-editor"

import "@uppy/core/dist/style.min.css"
import "@uppy/dashboard/dist/style.min.css"
import "@uppy/webcam/dist/style.min.css"
import "@uppy/screen-capture/dist/style.min.css"
import "@uppy/audio/dist/style.min.css"
import "@uppy/image-editor/dist/style.min.css"

import "./style.css"
import VideoCropPlugin from "@/packages/uppy-video-trim-plugin"

type DropzoneProps = {
  className?: string
  onDone?: () => void
  onFinish?: (result: UploadResult) => void
  onFileAdded?: (file: UppyFile) => void
  onCancel?: () => void
  onDragOver?: () => void
}

const TUS_ENDPOINT = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/upload/resumable`
const FOLDER_NAME = "uploaded"

export default function Dropzone({
  className,
  onDone,
  onCancel,
  onFinish,
  onFileAdded,
  onDragOver,
}: DropzoneProps) {
  const locale = {
    ...Russian,
    strings: {
      ...Russian.strings,
      myDevice: "Загрузить",
    },
  }

  const uppy = useMemo(() => {
    return (
      new Uppy({ locale })
        .use(Webcam)
        .use(Audio)
        .use(ScreenCapture)
        .use(Tus, {
          endpoint: TUS_ENDPOINT,
          headers: {
            authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          },
          uploadDataDuringCreation: true,
          chunkSize: 6 * 1024 * 1024,
          allowedMetaFields: [
            "bucketName",
            "objectName",
            "contentType",
            "cacheControl",
          ],
        })
        .use(Url, {
          companionUrl: "http://localhost:3020",
        })
        .use(Dropbox, {
          companionUrl: "http://localhost:3020",
        })
        // .use(ImageEditor)
        .use(VideoCropPlugin)
    )
  }, [])

  const onUppyComplete = useCallback(
    (result: UploadResult) => {
      onFinish?.(result)
    },
    [onFinish]
  )
  const onUppyCancelAll = useCallback(() => {
    onCancel?.()
  }, [onCancel])

  uppy.on("file-added", (file) => {
    const supabaseMetadata = {
      bucketName: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
      objectName: `${FOLDER_NAME}/${file.name}/${uuidv4()}.${file.extension}`,
      contentType: file.type,
    }

    file.meta = {
      ...file.meta,
      ...supabaseMetadata,
    }

    onFileAdded?.(file)
  })

  uppy.on("complete", onUppyComplete)
  uppy.on("cancel-all", onUppyCancelAll)

  return (
    <Dashboard
      theme="dark"
      className={className}
      uppy={uppy}
      onDragOver={onDragOver}
      doneButtonHandler={onDone}
      showLinkToFileUploadResult
      metaFields={[
        { id: "name", name: "Name", placeholder: "file name" },
        {
          id: "caption",
          name: "Описание",
          placeholder: "Что изображено в файле",
        },
        {
          id: "cover",
          name: "Обложка",
          render({ value, onChange, required, form }, h) {
            return h("input", {
              type: "checkbox",
              required,
              form,
              onChange: (ev: any) => onChange(ev.target.checked ? "on" : ""),
              defaultChecked: value === "on",
            })
          },
        },
      ]}
    />
  )
}
