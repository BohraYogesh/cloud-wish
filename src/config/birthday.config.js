import balloon from '../assets/balloons.webp';
import bgm from '../assets/bgm.mp3'

const config = {
  name: "My Angel",
  music: bgm,

  gate: {
    title: "Warning: Too much love ahead proceed carefully",
    sub: "A special surprise is waiting for you",
    button: "Come With Me ☁️",
    later: ["Maybe Later..."],
    refuse: {
      title: "How dare you! 😤",
      sub: "I made this surprise just for you…",
      back: "Go back 🥺",
    },
  },

  welcome: { title: "Happy Birthday, My Angel", button: "Open Your Wishes 🎁" },

  scratch: {
    title: "Scratch the cards to reveal hidden messages",
    messages: [
      "You make every day brighter ☀️",
      "Your smile is my favorite view 😊",
      "I am so lucky to have you 🍀",
      "Forever is not long enough 💞",
    ],
    skip: "Skip for now",
    done: "Continue 💌",
  },

  envelope: { title: "A letter from my heart...", hint: "Tap to open 💌" },

  letter: {
    heading: "To My Dearest...",
    body: "Happy Birthday, My Angel! You are the reason behind my smiles and the peace in my heart. Every moment spent with you feels like floating on soft, pink clouds. May your year be filled with as much magic and love as you bring into my life. Forever and always, I'll be by your side. ✿",
    closing: "With all my love,",
    from: "My Love",
    button: "Our Memories 📸",
  },

  memories: {
    title: "Our Core Memories",
    subtitle: "The moments that define us",
    button: "Final Surprise",
    items: [
      {
        title: "First Hello",
        year: "2020",
        caption: "The day my world changed",
        emoji: "",
        img: balloon,
      },
      {
        title: "Our Adventures",
        year: "2022",
        caption: "Every trip with you is home",
        emoji: "",
        img: balloon,
      },
      {
        title: "Always Us",
        year: "2023",
        caption: "To many more years!",
        emoji: "",
        img: balloon,
      },
    ],
  },

  final: {
    title: "Happy Birthday, My Angel!",
    hint: "Click each cloud to unwrap a wish ✦",
    wishes: [
      "Endless Joy",
      "Everlasting Love",
      "Sweet Dreams",
      "Big Adventures",
      "Forever Us",
    ],
    message:
      "May every dream you have come true, and may I always be there to celebrate each one with you. You are my favorite everything.",
    tag: "Happy Birthday",
    replay: "Watch again 🔁",
  },
};

export default config;
