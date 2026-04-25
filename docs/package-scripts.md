## Quick reference

**Development (Expo Go / web)** — start the dev server, then pick a platform, or target one directly:

```bash
pnpm start
pnpm ios
pnpm android
pnpm web
```

**Native builds** — full native build (e.g. after adding native modules or for release testing):

```bash
pnpm run:ios
pnpm run:android
```


# Package scripts

This project uses **pnpm** as the package manager. Run scripts with:

```bash
pnpm <script-name>
```

## Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `start` | `expo start` | Starts the Expo dev server. Opens the dev tools and lets you choose a platform (iOS, Android, or web). |
| `android` | `expo start --android` | Starts the dev server and opens the app in the Android emulator or device. |
| `ios` | `expo start --ios` | Starts the dev server and opens the app in the iOS simulator or device. |
| `web` | `expo start --web` | Starts the dev server and opens the app in the default web browser. |
| `run:ios` | `expo run:ios` | Builds and runs the native iOS app (requires Xcode and iOS toolchain). |
| `run:android` | `expo run:android` | Builds and runs the native Android app (requires Android Studio and Android SDK). |