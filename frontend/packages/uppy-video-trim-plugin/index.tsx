import Uppy, { UppyFile, UIPlugin, UIPluginOptions } from "@uppy/core"
import { FFmpeg } from "@ffmpeg/ffmpeg"
import { fetchFile } from "@ffmpeg/util"
import { h } from "preact"
import styles from "./styles.module.css"

const ffmpeg = new FFmpeg()

ffmpeg.load()

interface VideoCropPluginOptions extends UIPluginOptions {
  outputName: string
}

class VideoCropPlugin extends UIPlugin<any> {
  opts: VideoCropPluginOptions
  fileTimeings: Record<string, { startTime: string; endTime: string }>

  constructor(uppy: Uppy, opts: Partial<VideoCropPluginOptions> = {}) {
    super(uppy, opts)
    this.id = opts.id || "VideoCropPlugin"
    this.type = "editor"
    this.fileTimeings = {}

    const defaultOptions: VideoCropPluginOptions = {
      outputName: "output.mp4",
    }

    this.opts = Object.assign({}, defaultOptions, opts)
  }

  canEditFile(file: UppyFile): boolean {
    if (!file.type || file.isRemote) {
      return false
    }

    const fileTypeSpecific = file.type.split("/")[1]

    if (/^(mp4|mov|avi)$/.test(fileTypeSpecific)) {
      return true
    }

    return false
  }

  install() {
    this.setPluginState({
      currentVideo: null,
    })
  }

  uninstall(): void {
    const { currentVideo } = this.getPluginState()

    if (currentVideo) {
      const file = this.uppy.getFile(currentVideo.id)
      this.uppy.emit("file-editor:cancel", file)
    }

    this.unmount()
  }

  setTiming(fileId: string, timing: string, type: "startTime" | "endTime") {
    if (!this.fileTimeings[fileId]) {
      this.fileTimeings[fileId] = {
        startTime: "",
        endTime: "",
      }
    }

    this.fileTimeings[fileId][type] = timing
  }

  render() {
    const { currentVideo } = this.getPluginState()

    if (currentVideo === null || currentVideo?.isRemote) {
      return null
    }

    console.log("render", currentVideo.data)

    return h("div", {
      class: styles.wrapper,
      children: [
        h("div", {
          class: styles.placeholder,
          children: h("video", {
            controls: true,
            class: styles.video,
            children: h("source", {
              src: URL.createObjectURL(currentVideo.data),
            }),
          }),
        }),
        h("input", {
          type: "text",
          placeholder: "Start time (hh:mm:ss)",
          onChange: (e) => {
            this.setTiming(currentVideo.id, e.currentTarget.value, "startTime")
          },
        }),
        h("input", {
          type: "text",
          placeholder: "End time (hh:mm:ss)",
          onChange: (e) => {
            this.setTiming(currentVideo.id, e.currentTarget.value, "endTime")
          },
        }),
      ],
    })
  }

  async save() {
    const { currentVideo } = this.getPluginState()

    console.log("save", currentVideo)

    if (currentVideo === null || currentVideo.isRemote) {
      return null
    }

    const { startTime, endTime } = this.fileTimeings[currentVideo.id] ?? {}

    if (!startTime || !endTime) {
      return
    }

    await this.cropVideo(currentVideo, startTime, endTime)
  }

  selectFile = (file: UppyFile) => {
    console.log("selectFile", file)
    this.uppy.emit("file-editor:start", file)
    this.setPluginState({
      currentVideo: file,
    })
  }

  async cropVideo(file: UppyFile, startTime: string, endTime: string) {
    ffmpeg.writeFile(file.name, await fetchFile(file.data))

    await ffmpeg.exec([
      "-i",
      file.name,
      "-ss",
      startTime,
      "-to",
      endTime,
      "-c",
      "copy",
      this.opts.outputName,
    ])

    const data = await ffmpeg.readFile(this.opts.outputName)

    this.uppy.setFileState(file.id, {
      data: new File([data], file.name, { type: file.type }),
      size: data.length / 1_048_576,
      preview: undefined,
    })
    // this.setPluginState({
    //   currentVideo: this.uppy.getFile(file.id),
    // })
  }
}

export default VideoCropPlugin
