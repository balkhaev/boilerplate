"use client"
import { Box } from "@mui/material"
import { useEffect, useRef } from "react"
import videojs from "video.js"
import type { VideoJsPlayerOptions, VideoJsPlayer } from "video.js"
import "video.js/dist/video-js.css"

type VideoPlayerProps = VideoJsPlayerOptions & {
  onReady: (player: VideoJsPlayer) => {}
}

export default function VideoPlayer({ onReady, ...options }: VideoPlayerProps) {
  const playerRef = useRef<VideoJsPlayer | null>(null)
  const videoRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      const videoElement = document.createElement("video-js")

      videoElement.classList.add("vjs-big-play-centered")
      videoRef.current.appendChild(videoElement)

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready")
        onReady && onReady(player)
      }))
    } else {
      const player = playerRef.current

      player.autoplay(options.autoplay)
      player.src(options.sources)
    }
  }, [options, videoRef])

  useEffect(() => {
    const player = playerRef.current

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose()
        playerRef.current = null
      }
    }
  }, [playerRef])

  return (
    <Box
      data-vjs-player
      sx={{ display: "flex", width: "100%", height: "100%" }}
    >
      <Box
        sx={{ display: "flex", width: "100%", height: "100%" }}
        ref={videoRef}
      />
    </Box>
  )
}
