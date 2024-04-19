import { createClient } from "@/utils/supabase/server"

export default async function PackPage({
  params,
}: {
  params: { slug: string }
}) {
  const supabase = createClient()

  let { data: pack } = await supabase
    .from("packs")
    .select("*, rofls(*, files:rofl_files(*))")
    .eq("slug", params.slug)
    .order("created_at", { referencedTable: "rofl_files" })
    .limit(1)
    .single()

  if (!pack) {
    return null
  }

  return <div>{pack.title}</div>
}
