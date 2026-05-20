Prototype for New Cairo STEM — Room 204

Open `index.html` in your browser to view the prototype.

Files:
- index.html — markup (hero, members, photos, linktree)
- styles.css — styling and animations
- script.js — interactions: parallax, scroll timeline, reveal

Notes & next steps:
- The hero uses an inline SVG dinosaur animated via GSAP (no Lottie required). You can swap the SVG for another if you prefer.
- Member cards have placeholders for photos. Drop real images into the `.photo` elements or swap with `<img>` tags.
- I implemented a simple scroll-driven timeline that nudges the dino and reveals members. For a closer match to the Webflow original we can port their exact scroll timeline using GSAP + ScrollTrigger or export the Lottie timeline frames.

Run:
```bash
# on Windows
start d:\nodeprojects\204website\index.html
```

Tell me which part you'd like polished next (exact Lottie asset, train/roller animation, or refine member intros).

Latest changes:
- Added GSAP + ScrollTrigger and a pinned scroll timeline that animates the Lottie dinosaur, blobs and member reveals.
- Accessibility: added ARIA roles, skip link and focus styles.

If everything looks good I can:
- swap in a different free dinosaur Lottie I find for you,
- add an animated train/carriage sequence, or
- export a small zip with the prototype files ready to share.