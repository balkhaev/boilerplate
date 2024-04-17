import RoflCard from "@/components/RoflCard"
import { createClient } from "@/utils/supabase/server"
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Container,
  Grid,
} from "@mui/material"
import Link from "next/link"

export default async function PacksPage() {
  const supabase = createClient()

  const { data: packs } = await supabase
    .from("packs")
    .select("*, rofls(*, files:rofl_files(*))")

  if (!packs) {
    return null
  }

  return (
    <Container maxWidth={false} sx={{ mt: 3 }}>
      {packs.map((pack) => (
        <Card>
          <CardActionArea LinkComponent={Link} href={"/p/" + pack.slug}>
            <CardHeader title={pack.title} />
          </CardActionArea>
          <CardContent>
            <Grid container spacing={1}>
              {pack.rofls.map((rofl) => (
                <Grid item xs={4}>
                  <RoflCard rofl={rofl} />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Container>
  )
}
