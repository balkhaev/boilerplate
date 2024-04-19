import { createClient } from "@/utils/supabase/server"
import RoflPageContent from "./content"

export default async function RoflPage({
  params,
}: {
  params: { slug: string }
}) {
  const supabase = createClient()

  let { data: rofl } = await supabase
    .from("rofls")
    .select("*, files:rofl_files( * )")
    .eq("slug", params.slug)
    .order("created_at", { referencedTable: "rofl_files" })
    .limit(1)
    .single()

  if (!rofl) {
    return <div>Rofl not found!</div>
  }

  return <RoflPageContent rofl={rofl} slug={params.slug} />
}
