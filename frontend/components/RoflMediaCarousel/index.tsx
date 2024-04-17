import { Tables } from "@/types/supabase.types"
import SingleMediaCarousel from "../SingleMediaCarousel"
import RoflMedia from "../RoflMedia"

type RoflMediaCarouselProps = {
  files: Tables<"rofl_files">[]
}

export default function RoflMediaCarousel({ files }: RoflMediaCarouselProps) {
  return (
    <SingleMediaCarousel>
      {files.map((file) => (
        <RoflMedia
          key={file.id}
          objectName={file.object_name}
          bucketName={file.bucket_name}
        ></RoflMedia>
      ))}
    </SingleMediaCarousel>
  )
}
