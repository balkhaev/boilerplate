import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  TextField,
} from "@mui/material"
import DiscordButton from "../DiscordButton"
import { AuthCredentials } from "@/utils/auth"
import { createClient } from "@/utils/supabase/client"

type AuthDialogProps = DialogProps & { onClose: () => void }

export default function AuthDialog({ open, onClose }: AuthDialogProps) {
  const onSubmit = async (formData: FormData) => {
    const formJson = Object.fromEntries(
      (formData as any).entries()
    ) as AuthCredentials
    const supabase = createClient()

    await supabase.auth.signInWithPassword(formJson)
    window.location.reload()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: "form",
        action: onSubmit,
      }}
    >
      <DialogTitle>
        <Divider>Войти через</Divider>
      </DialogTitle>
      <DialogContent>
        <DiscordButton fullWidth />
        <Divider sx={{ mt: 3 }}>или</Divider>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="email"
          label="Email"
          type="email"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="password"
          name="password"
          label="Пароль"
          type="password"
          fullWidth
          variant="standard"
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Войти
        </Button>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined">Зарегистрироваться</Button>
        <Button onClick={onClose}>Отменить</Button>
      </DialogActions>
    </Dialog>
  )
}
