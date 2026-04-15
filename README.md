# Web Client of CocoChat

- 🎉 Powered by React & Redux Toolkit
- ✅ Typescript
- 📦 PWA

## Host your server! Or use our test server

- Host your own Voce server ([docker image](https://hub.docker.com/r/winbomb/cocochat-server/tags)):
  Run on x86_64 platform:

```bash
docker run -d --restart=always \
  -p 3000:3000 \
  --name cocochat-server \
  privoce/cocochat-server:latest
```

## Local Development

- `git clone https://github.com/winbomb/cocochat-web cocochat-web`

- `cd cocochat-web & pnpm install`

- `pnpm start`

- Open `localhost:3009`


## License

[GPL v3](https://github.com/winbomb/cocochat-web/blob/main/LICENSE)
