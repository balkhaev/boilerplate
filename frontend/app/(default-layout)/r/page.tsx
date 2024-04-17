import { createClient } from "@/utils/supabase/server"

import RoflGrid from "@/components/Rofl/RoflGrid"
import { Container } from "@mui/material"

export default async function RoflsPage() {
  const supabase = createClient()

  const { data: rofls } = await supabase
    .from("rofls")
    .select("*, files:rofl_files(*), creator:profiles(*)")

  return (
    <Container maxWidth={false} sx={{ mt: 3 }}>
      <RoflGrid rofls={rofls} />
    </Container>
  )
}
