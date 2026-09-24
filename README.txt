# Rajdip — Free 3D Portfolio

## Run it
The site uses Three.js from a CDN, so there is no npm setup required.

1. Extract the ZIP.
2. Open `index.html` in a local server (recommended) or deploy the folder to GitHub Pages / Vercel.
3. Replace `assets/hero.png` with your preferred hero image.
4. Edit `index.html` to change your name, text, projects and email.

## Free deployment: GitHub Pages
Create a public GitHub repository, upload these files, then enable:
Settings → Pages → Deploy from branch → `main` → `/root`.

Your site will be available at:
https://YOUR-USERNAME.github.io/REPOSITORY-NAME/

## Important
This starter is a real-time 3D WebGL background, but the character image itself is still a 2D image.
For a true interactive 3D character, replace the image card with a `.glb`/`.gltf` model and load it with Three.js `GLTFLoader`.
