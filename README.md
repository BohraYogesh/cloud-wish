# 🎂 Birthday Cloudscape

Mobile-first birthday surprise (React + Vite + Tailwind + Framer Motion).

## Run karne ke steps (VS Code)
1. Node.js 18+ install hona chahiye (https://nodejs.org).
2. Zip extract karo, folder VS Code me kholo.
3. Terminal (Ctrl + `) me:
   ```
   npm install
   npm run dev
   ```
4. Browser me `http://localhost:5173` kholo (DevTools -> device toolbar -> iPhone/Pixel).
5. **Asli phone par test**: phone aur laptop same WiFi par ho, phir terminal me dikhne wala
   `Network: http://192.168.x.x:5173` phone me kholo.

## Customize
Sab kuch `src/config/birthday.config.js` me hai: naam, messages, letter, memories, wishes.
- **Photos**: `public/images/` me daalo, config me `img: '/images/photo1.jpg'`.
- **Music**: `public/audio/bgm.mp3` daalo, config me `music: '/audio/bgm.mp3'`.

## Deploy (free)
`npm run build` -> `dist/` folder ko Netlify Drop (app.netlify.com/drop) par drag-drop karo,
ya Vercel / GitHub Pages use karo. Link WhatsApp par bhej do.

## Structure
```
src/
  config/birthday.config.js   <- sara content
  screens/   Gate > Welcome > Scratch > Letter > Memories > Final
  components/  ScratchCard, Envelope, Polaroid, Petals, Cloud ...
  hooks/useAudio.js
```
