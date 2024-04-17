"use client"
import { Tables } from "@/types/supabase.types"
import { createClient } from "@/utils/supabase/client"
import { Grid } from "@mui/material"
import { useEffect, useState } from "react"
import RoflCard from "../RoflCard"

type RoflGridProps = {
  rofls: (Tables<"rofls"> & { files: Tables<"rofl_files">[] })[] | null
}

export default function RoflGrid({ rofls }: RoflGridProps) {
  const supabase = createClient()
  const [items, setItems] = useState(rofls || [])

  useEffect(() => {
    const taskListener = supabase
      .channel("rofls")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "rofls" },
        async (payload) => {
          let { data } = await supabase
            .from("rofls")
            .select("*, files:rofl_files( * )")
            .eq("id", payload.new.id)
            .limit(1)
            .single()

          console.log(data, payload)

          if (data) setItems((val) => [...val, data])
        }
      )
      .subscribe()

    return () => {
      taskListener.unsubscribe()
    }
  }, [])

  return (
    <Grid container spacing={2}>
      {items?.map((rofl) => (
        <Grid xs={4} key={rofl.id} item>
          <RoflCard rofl={rofl} />
        </Grid>
      ))}
    </Grid>
  )
}
