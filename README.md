# **Fuzzy Search with Fuse.js in React Native**



## Table of Contents

- [Description](#description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)

---

## Description

```search_using_fuse_js``` is a demo React Native (Expo Bare) app illustrating how to integrate fuzzy search using Fuse.js in client‑side mobile applications. It enables approximate matching so that users can find items without typing exact strings. This is useful for search bars, product lists, or offline data filtering.

---

### Features

- Fuzzy / approximate string matching

- Configurable search keys (e.g. name, description)

- Adjustable threshold and scoring

- Works offline with local datasets

- Built with TypeScript for safety and clarity

---

### Tech Stack

- React Native (Bare Workflow)

- Expo SDK

- TypeScript

- Bun

- Fuse.js

- Jest & @testing-library/react-native
  
---

### Prerequisites

- Node.js ≥ 18

- Bun ≥ 1.0.0

- Expo CLI (globally installed)

- Android Studio / Xcode setup for running apps on devices/simulators

---

### Installation

```bash
git clone https://github.com/dainyjose/search_using_fuse_js.git
cd search_using_fuse_js
bun install
```
---

### Usage

```bash
# Run on Android
bun expo run:android


# Run on iOS
bun expo run:ios


# Start Metro bundler only
bun expo start
```
---

### Configuration (Fuse.js Options)

Example Fuse.js setup:

```bash
const options: Fuse.IFuseOptions<ItemType> = {
  keys: ["name", "description"],
  threshold: 0.3,
  includeScore: true,
  includeMatches: true,
  distance: 100,
};
```

- keys → fields to search

- threshold → 0 (exact match) to 1 (loose match)

- includeMatches → highlights what matched

- includeScore → provides match quality



## 🧑‍💻 Author

**Dainy Jose**  
[GitHub](https://github.com/dainyjose) | [LinkedIn](https://linkedin.com/in/dainyjose)

---

## License

[MIT](./LICENSE)
