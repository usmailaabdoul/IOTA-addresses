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
## Output

After running the build successfully and and running the application on a device you should see the below UI

![testProject](https://user-images.githubusercontent.com/50529081/138406288-16aad679-48b1-4376-a53f-1473f6424bb6.jpeg)
