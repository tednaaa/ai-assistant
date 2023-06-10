<table>
  <tr>
    <td>
      <img
        width="350"
        alt="image"
        src="https://github.com/tednaaa/ai-assistant/assets/79831859/2a61522f-3952-485b-a69d-736563502f13"
      />
    </td>
    <td>
      <img
        width="350"
        alt="image"
        src="https://github.com/tednaaa/ai-assistant/assets/79831859/fc682de8-46a2-4f70-852e-16f36a7f98d6"
      />
    </td>
  </tr>
</table>

# Instructions

> Install dependencies

```
npm ci
```

> Create .env from example and fill

```
cp .env.example .env
```

> Start parallel development servers for backend & electron app

```
npm start
```

> Build for win, mac and linux - (apps/electron/dist)

```
nx run electron:build:win
nx run electron:build:mac
nx run electron:build:linux
```
