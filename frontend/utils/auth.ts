import { headers } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export type AuthCredentials = {
  email: string
  password: string
}

const logout = async () => {
  "use server"

  const supabase = createClient()
  await supabase.auth.signOut()
  return redirect("/login")
}

export const loginUser = async ({ email, password }: AuthCredentials) => {
  "use server"

  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect("/login?message=" + error?.message)
  }

  return redirect("/")
}

export const registerUser = async ({ email, password }: AuthCredentials) => {
  "use server"

  const origin = headers().get("origin")
  const supabase = createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    return redirect("/login?message=" + error?.message)
  }

  return redirect("/login?message=Проверьте почту")
}
