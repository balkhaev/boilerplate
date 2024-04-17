"use client"
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from "@mui/material"
import { Tables } from "@/types/supabase.types"
import RoflMedia from "@/components/RoflMedia"
import useViewedStore from "@/hooks/useViewedStore"

import styles from "./styles.module.css"

type RoflPageContentProps = {
  rofl: Tables<"rofls"> & { files: Tables<"rofl_files">[] }
  slug: string
}

export default function RoflPageContent({ rofl, slug }: RoflPageContentProps) {
  const { getViewedIndex, setViewedIndex } = useViewedStore()

  const fileIndex = getViewedIndex(slug)
  const file = rofl.files[fileIndex]

  const onFileClick = (_file: Tables<"rofl_files">, index: number) => () => {
    setViewedIndex(slug, index)
  }

  return (
    <>
      <RoflMedia
        key={file.id}
        objectName={file.object_name}
        bucketName="public_rofls"
        autoplay
      />

      <Container sx={{ my: 3 }}>
        <Typography variant="h4">{rofl.title}</Typography>
      </Container>

      {rofl.description && (
        <Container sx={{ mb: 3 }}>
          <Card>
            <CardContent>{rofl.description}</CardContent>
          </Card>
        </Container>
      )}

      <Container sx={{ mb: 3 }}>
        <Typography variant="h6">Рофлы</Typography>
      </Container>

      <Container maxWidth={false}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {rofl.files.map((file, index) => (
            <Grid key={file.id} item xs={2}>
              <Card
                onClick={onFileClick(file, index)}
                sx={{ overflow: "hidden" }}
              >
                {file.preview_bucket_name && file.preview_object_name && (
                  <RoflMedia
                    bucketName={file.preview_bucket_name}
                    objectName={file.preview_object_name}
                  />
                )}
                <CardHeader
                  sx={{ overflow: "hidden" }}
                  classes={{ content: styles.content }}
                  title={
                    <Box sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                      <Typography noWrap>{file.object_name}</Typography>
                    </Box>
                  }
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}
