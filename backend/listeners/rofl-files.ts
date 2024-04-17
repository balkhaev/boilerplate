import { RealtimePostgresChangesPayload } from "@supabase/supabase-js"
import { supabase } from "../lib/client"
import { downloadQueue } from "../queue/queues"
import { Tables } from "../types/supabase.types"

async function handler(
  payload: RealtimePostgresChangesPayload<Tables<"rofl_files">>
) {
  console.log("rofl_files:changes event", payload)

  if (!("id" in payload.new)) {
    return
  }

  if (!payload.new.object_name.toLowerCase().endsWith(".mp4")) {
    return
  }

  downloadQueue.add(payload.new)
}

supabase
  .channel("rofl_files:changes")
  .on<Tables<"rofl_files">>(
    "postgres_changes",
    { event: "INSERT", schema: "public", table: "rofl_files" },
    handler
  )
  .subscribe()

console.log("rofl_files:changes listening")
