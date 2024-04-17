import { Api, TelegramClient } from "telegram"
import { StoreSession } from "telegram/sessions"
import input from "input"

const apiId = +process.env.TELEGRAM_API_HASH!
const apiHash = process.env.TELEGRAM_API_ID!
const storeSession = new StoreSession("")

;(async () => {
  console.log("Loading interactive example...")
  const client = new TelegramClient(storeSession, apiId, apiHash, {
    connectionRetries: 5,
  })
  await client.start({
    phoneNumber: async () => await input.text("number ?"),
    password: async () => await input.text("password?"),
    phoneCode: async () => await input.text("Code ?"),
    onError: (err) => console.log(err),
  })
  console.log("You should now be connected.")

  const result = await client.invoke(
    new Api.messages.GetHistory({
      peer: "ru2ch",
      limit: 1,
    })
  )
  const jsonResult = result.toJSON()

  // console.log(jsonResult)

  if (!("messages" in jsonResult)) {
    return
  }

  const messages = jsonResult.messages.map((message) => {
    const msg = JSON.parse(JSON.stringify(message))

    // console.log(messageJson)

    return {
      date: msg.date,
      message: msg.message,
      media: msg.media,
      entities: msg.entities,
    }
  })

  console.log(messages[0].media.photo)
})()
