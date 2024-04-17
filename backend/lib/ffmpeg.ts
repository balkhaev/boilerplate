import ffprobeInstaller from "@ffprobe-installer/ffprobe"
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg"
import ffmpeg from "fluent-ffmpeg"

ffmpeg.setFfprobePath(ffprobeInstaller.path)
ffmpeg.setFfmpegPath(ffmpegInstaller.path)

type Config = {
  width: number
  height: number
  bitrate: string
  maxrate: string
  bufsize: string
}

export const toHls = (
  inputPath: string,
  outputPath: string,
  config: Config
) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .addOptions([
        "-profile:v main",
        `-vf scale=w=${config.width}:h=${config.height}:force_original_aspect_ratio=decrease`,
        "-c:a aac",
        "-ar 48000",
        "-b:a 96k",
        "-c:v h264",
        "-crf 20",
        "-g 48",
        "-keyint_min 48",
        "-sc_threshold 0",
        `-b:v ${config.bitrate}`,
        `-maxrate ${config.maxrate}`,
        `-bufsize ${config.bufsize}`,
        "-hls_time 10",
        "-hls_playlist_type vod",
        "-f hls",
      ])
      .output(outputPath)
      .on("end", resolve)
      .on("error", reject)
      .run()
  })
}

export default ffmpeg
