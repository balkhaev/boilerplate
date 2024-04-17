import { createClient } from "@/utils/supabase/client"
import { Box } from "@mui/material"
import RoflMediaContent from "./RoflMediaContent"

type RoflMediaProps = {
  bucketName: string
  objectName: string
  autoplay?: boolean
}

export default function RoflMedia({
  bucketName,
  objectName,
  autoplay,
}: RoflMediaProps) {
  const supabase = createClient()

  console.log(objectName)
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucketName).getPublicUrl(objectName)

  if (!publicUrl) {
    return null
  }

  return (
    <Box
      sx={{
        aspectRatio: 16 / 7,
        bgcolor: "#000000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <RoflMediaContent publicUrl={publicUrl} autoplay={autoplay} />
    </Box>
  )
}
