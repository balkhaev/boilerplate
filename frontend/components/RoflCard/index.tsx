"use client"
import { Card, CardActionArea, CardHeader } from "@mui/material"
import Link from "next/link"

import { Tables } from "@/types/supabase.types"
import RoflMedia from "../RoflMedia"

type RoflCardProps = {
  rofl: Tables<"rofls"> & { files: Tables<"rofl_files">[] } & {
    creator?: Tables<"profiles">
  }
}

export default function RoflCard({ rofl }: RoflCardProps) {
  const subheader = []

  if (rofl.creator) {
    subheader.push(rofl.creator.email)
  }

  subheader.push(`${rofl.files.length} файлов`)
  subheader.push(`155 просмотров`)

  return (
    <Card variant="outlined">
      <CardActionArea LinkComponent={Link} href={`/r/${rofl.slug}`}>
        <CardHeader
          title={rofl.title}
          subheader={subheader.join(" • ")}
        ></CardHeader>
      </CardActionArea>
      <RoflMedia
        objectName={rofl.files[0].object_name}
        bucketName={rofl.files[0].bucket_name}
      ></RoflMedia>
    </Card>
  )
}
