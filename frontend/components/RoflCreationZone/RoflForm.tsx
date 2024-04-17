import { Box, Button, Card, TextField } from "@mui/material"
import { RoflCreationItem } from "./RoflCreation"

type RoflFormProps = {
  value: RoflCreationItem
  onChange: (newValue: RoflCreationItem) => void
  onSubmit: () => void
}

export default function RoflForm({ value, onChange, onSubmit }: RoflFormProps) {
  return (
    <Card sx={{ height: 550, width: 750, p: 2 }}>
      <form action={onSubmit}>
        <TextField
          label="Название"
          value={value.title}
          onChange={(e) => onChange({ ...value, title: e.target.value })}
          fullWidth
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" fullWidth>
            Отправить
          </Button>
        </Box>
      </form>
    </Card>
  )
}
