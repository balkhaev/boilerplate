import { SubmitButton } from "./submit-button"
import DiscordButton from "@/components/DiscordButton"
import { Divider, Typography } from "@mui/material"
import { ChevronLeft } from "@mui/icons-material"
import BackLink from "@/components/BackLink"
import { loginUser, registerUser } from "@/utils/auth"

export default function Login({
  searchParams,
}: {
  searchParams: { message?: string }
}) {
  const onLogin = async (formData: FormData) => {
    "use server"

    const email = formData.get("email") as string
    const password = formData.get("password") as string

    loginUser({ email, password })
  }

  const onRegister = async (formData: FormData) => {
    "use server"

    const email = formData.get("email") as string
    const password = formData.get("password") as string

    registerUser({ email, password })
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
        <BackLink
          href="/"
          className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
        >
          <ChevronLeft /> Вернуться
        </BackLink>

        <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
          <Divider sx={{ mb: 2 }}>
            <Typography variant="h5">войти через</Typography>
          </Divider>

          <DiscordButton />

          <Divider sx={{ my: 2 }}>или</Divider>

          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-md" htmlFor="password">
            Пароль
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <SubmitButton
            formAction={onLogin}
            pendingText="Signing In..."
            variant="contained"
            color="success"
          >
            Войти
          </SubmitButton>
          <SubmitButton
            formAction={onRegister}
            className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
            pendingText="Signing Up..."
            variant="outlined"
          >
            Зарегистрироваться
          </SubmitButton>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
