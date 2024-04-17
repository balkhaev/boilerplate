import VideoPlayer from "../VideoPlayer"

type RoflMediaContentProps = {
  publicUrl: string
  autoplay?: boolean
}

export default function RoflMediaContent({
  publicUrl,
  autoplay = false,
}: RoflMediaContentProps) {
  if (publicUrl.toLocaleLowerCase().endsWith(".mp4")) {
    return (
      <VideoPlayer
        sources={[{ src: publicUrl, type: "video/mp4" }]}
        controls
        aspectRatio="16:7"
        autoplay={autoplay}
        volume={0.4}
      />
    )
  }

  return (
    <img
      src={publicUrl}
      style={{
        objectFit: "contain",
        height: "100%",
        width: "100%",
        overflow: "hidden",
      }}
    />
  )
}
