# Tic Tac Toe (Expo + React Native)

Single-player tic-tac-toe: you vs a CPU opponent. Built with **Expo SDK 55**, **React 19**, and **TypeScript**. UI uses functional components and hooks only.

## Requirements

- **Node.js** (LTS recommended)
- **npm** (or yarn/pnpm)
- For **iOS Simulator**: macOS + Xcode
- For **Android**: Android Studio + an emulator
- For **physical device**: [Expo Go](https://expo.dev/go) from the App Store / Play Store — use a version that matches your SDK (update Expo Go if you see an incompatibility error)

## Setup

```bash
cd Game
npm install
```

## Run

```bash
npm start
```

Then in the terminal UI:

| Key | Action |
|-----|--------|
| `i` | Open iOS Simulator |
| `a` | Open Android emulator (start an AVD first) |
| `w` | Open in the web browser |

Or use scripts directly:

```bash
npm run ios
npm run android
npm run web
```

## Features

- **Human vs CPU** — you choose **X** or **O**; CPU takes the other mark. **X always moves first** (if you play O, the CPU opens).
- **Difficulty**: Easy (random legal moves), Medium (win/block + simple heuristics), Hard (minimax).
- **Win / draw** detection with a clear message and **Play again**.
- While a game is in progress, **difficulty** and **your mark** are locked until the round ends or you restart.

## High Polish Feature Added

I enhanced the application by introducing win-state animations and micro-interactions such as cell tap feedback and current player highlighting.

These improvements make the app feel more responsive and visually engaging, which significantly improves user experience. High-rated apps on the App Store often focus on smooth animations and interaction feedback, as they create a sense of quality and delight for users.

By adding these polished UI details, the application better reflects a production-level experience that can drive higher user satisfaction and ratings.

## Project layout

```
src/
  game/
    types.ts    # Player, Board, Difficulty, etc.
    logic.ts    # getWinner, getEmptyIndices, getCpuMove, strategies
  components/
    Game.tsx           # State + human moves + CPU turn (delayed) + restart
    Board.tsx, Cell.tsx
    GameStatus.tsx
    DifficultyPicker.tsx, MarkPicker.tsx
    RestartButton.tsx
App.tsx                 # Root shell
```

Game rules and CPU behavior live in **`src/game/logic.ts`** as small, pure functions; React state lives in **`Game.tsx`**.

## Troubleshooting

- **“Project is incompatible with this version of Expo Go”** — update Expo Go on your phone to the latest version from the store.
- **Web**: `react-dom` and `react-native-web` are included; if `expo start --web` complains, run `npx expo install react-dom react-native-web`.

## License

Private project (`package.json`).
