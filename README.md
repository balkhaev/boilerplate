# My simple (нет) boilerplate

Supabase

- Auth
- Storage
- Database
- Policies

Uppy Companion

- Downloading and parsing links

Backend

- Bull for queues
- FFMPEG for working with video
- Supabase client for communication with storage and database

Frontend

- Next.js app router
- Material-ui for interface
- Uppy for downloading files
- Supabase client for working with auth, storage and database

```text
Most functionality on postgres functions and triggers
Backend listening for changes in database and processing rows
In my example listening for uploaded video files for generating thumbnails
```

Roadmap

- написать плагин для uppy для обрезки видео (ffmpeg wasm)
- дать возможность анонимным пользователям заливать контент
- лайки, просмотры, комментарии, share
- начать грабить контент с телеги
- отказаться от mui? в пользу <https://ui.shadcn.com/>
