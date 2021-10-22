# svelte app

This is a project template for [Svelte](https://svelte.dev) apps. It lives at https://github.com/sveltejs/template-webpack.


## Get started

Install the dependencies...

```bash
cd IOTA-addresses
npm install
```

...then start webpack:

```bash
npm run dev
```

Navigate to [localhost:8080](http://localhost:8080). You should see your app running. Edit a component file in `src`, save it, and the page should reload with your changes.

## Run final build on native device

To run application on your native make sure you have xcode/android installed or any physical device connected to your machine

```bash
npm run build
npx cap sync
npx cap run ios / npx cap run android
```
