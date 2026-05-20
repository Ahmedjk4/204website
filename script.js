// Parallax on mouse move for dinosaur
const dinoSvg = document.getElementById('dinoSvg');

window.addEventListener('mousemove', (e) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  const dx = x * 10;
  const dy = -y * 8;
  if(dinoSvg) dinoSvg.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
});

/* GSAP Scroll-driven timeline for a closer Webflow-like effect */
if(window.gsap && window.ScrollTrigger){
  gsap.registerPlugin(ScrollTrigger);
  
  let mm = gsap.matchMedia();

  // --- DESKTOP ANIMATION ---
  mm.add("(min-width: 901px)", () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: '+=1000',
        scrub: 1.5,
        pin: true,
        anticipatePin: 1
      }
    });

    // 1. Dinosaur opens jaw and moves left towards text
    tl.to('#rex-lower', {rotation: 25, duration: 0.4, ease: "power1.inOut"}, 0);
    tl.to('#rex-whole', {x: -120, y: 15, scale: 1.05, duration: 0.6, ease: "power1.inOut"}, 0);
    
    // 2. Dinosaur CHOMPS
    tl.to('#rex-lower', {rotation: -5, duration: 0.15, ease: "power4.in"}, 0.6);
    
    // Blood splatter explodes from the bite point
    tl.to('.d1', {x: 80, y: -60, opacity: 1, scale: 1.5, duration: 0.15, ease: "power2.out"}, 0.6);
    tl.to('.d2', {x: 100, y: -15, opacity: 1, scale: 1.2, duration: 0.15, ease: "power2.out"}, 0.6);
    tl.to('.d3', {x: 40, y: 80, opacity: 1, scale: 1.8, duration: 0.15, ease: "power2.out"}, 0.6);
    tl.to('.d4', {x: -20, y: -50, opacity: 1, scale: 1, duration: 0.15, ease: "power2.out"}, 0.6);
    tl.to('.d5', {x: 60, y: 50, opacity: 1, scale: 1.4, duration: 0.15, ease: "power2.out"}, 0.6);

    // 3. Text gets "bitten" (opacity drop/move)
    tl.to('.target-word', {clipPath: 'polygon(0% 0%, 100% 0%, 100% 40%, 0% 40%)', opacity: 0.5, duration: 0.1}, 0.65);
    tl.to('.target-word', {opacity: 0, y: 20, duration: 0.2}, 0.75);

    // Blood drips and fades out
    tl.to('.drop', {y: '+=80', opacity: 0, scale: 0.5, duration: 0.25}, 0.8);

    // 4. Dinosaur slowly retracts or looks satisfied
    tl.to('#rex-whole', {x: -90, duration: 0.3}, 0.75);
    tl.to('#rex-lower', {rotation: 5, duration: 0.2}, 0.75);

    // reveal members staggered as we scroll further
    tl.to('.member', {y:0, autoAlpha:1, stagger:0.15, duration:0.6, ease:'power2.out'}, 0.8);
  });

  // --- MOBILE ANIMATION (Funnier tumbling jump) ---
  mm.add("(max-width: 900px)", () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: '+=1000',
        scrub: 1.5,
        pin: true,
        anticipatePin: 1
      }
    });

    // 1. Dinosaur looks UP and opens mouth wide
    tl.to('#rex-whole', {rotation: -25, x: 20, y: -20, transformOrigin: '70% 80%', duration: 0.3}, 0);
    tl.to('#rex-lower', {rotation: 40, duration: 0.3}, 0);

    // 2. LUNGES wildly upwards and leftward into the text
    tl.to('#rex-whole', {x: -120, y: -220, scale: 1.4, rotation: -10, duration: 0.3, ease:"power2.in"}, 0.3);
    
    // 3. SNAP!
    tl.to('#rex-lower', {rotation: -5, duration: 0.1, ease:"power4.in"}, 0.6);

    // Blood splatter (smaller distance for mobile)
    tl.to('.d1', {x: 40, y: -30, opacity: 1, scale: 1.5, duration: 0.15, ease: "power2.out"}, 0.6);
    tl.to('.d2', {x: 60, y: -10, opacity: 1, scale: 1.2, duration: 0.15, ease: "power2.out"}, 0.6);
    tl.to('.d3', {x: 20, y: 40, opacity: 1, scale: 1.8, duration: 0.15, ease: "power2.out"}, 0.6);
    tl.to('.d4', {x: -10, y: -25, opacity: 1, scale: 1, duration: 0.15, ease: "power2.out"}, 0.6);
    tl.to('.d5', {x: 30, y: 30, opacity: 1, scale: 1.4, duration: 0.15, ease: "power2.out"}, 0.6);

    // 4. Text gets crushed
    tl.to('.target-word', {clipPath: 'polygon(0% 0%, 100% 0%, 100% 30%, 0% 30%)', opacity: 0.6, duration: 0.1}, 0.65);
    tl.to('.target-word', {opacity: 0, scale: 0.8, y: -20, duration: 0.2}, 0.75);
    tl.to('.drop', {y: '+=60', opacity: 0, scale: 0.5, duration: 0.25}, 0.8);

    // 5. Dinosaur tumbles backwards off the text and falls upside down
    tl.to('#rex-whole', {x: -20, y: 80, rotation: 160, scale: 0.8, duration: 0.4, ease:"bounce.out"}, 0.7);
    tl.to('#rex-lower', {rotation: 25, duration: 0.2}, 0.8); // jaw hangs open dizzy
    
    // Reveal members
    tl.to('.member', {y:0, autoAlpha:1, stagger:0.15, duration:0.6, ease:'power2.out'}, 0.8);
  });
}

// Reveal secondary sections
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  })
},{threshold:0.12});
document.querySelectorAll('.fade-in').forEach((el,i)=>{
  el.style.transitionDelay = `${(i % 4) * 100}ms`;
  io.observe(el);
});

// respect reduced motion on load
window.addEventListener('load', ()=>{
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    if(window.gsap) gsap.globalTimeline.pause();
    document.querySelectorAll('.fade-in').forEach(c=>c.classList.add('in'));
  }
});

// Load pictures to Photo Wall
const photoGrid = document.getElementById('photoGrid');
if(photoGrid) {
  // Array of image filenames in /assets/room_images
  const roomImages = [
    "WhatsApp Image 2026-05-20 at 1.47.34 PM.jpeg",
    "WhatsApp Image 2026-05-20 at 1.47.34 PM (1).jpeg",
    "WhatsApp Image 2026-05-20 at 1.47.34 PM (2).jpeg",
    "WhatsApp Image 2026-05-20 at 1.47.34 PM (3).jpeg"
  ];

  roomImages.forEach(filename => {
    const slot = document.createElement('div');
    slot.className = 'photo-slot';
    slot.style.overflow = 'hidden'; // Ensure image stays rounded
    slot.style.border = 'none'; // Remove dashed placeholder border
    
    const img = document.createElement('img');
    img.src = `assets/room_images/${filename}`;
    img.alt = "Room 204 Photo";
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.display = 'block';

    slot.appendChild(img);
    photoGrid.appendChild(slot);
  });
}

// --- MODALS & CAROUSEL LOGIC ---

// Member Data - add additional photos here for each person
const memberData = {
  "Ahmed Elessawy": {
    photos: ["assets/ahmedelessawy1.jpeg", "assets/ahmedelessawy2.jpeg", "assets/ahmedelessawy3.jpeg"],
    ig: "https://www.instagram.com/x_ameia_x"
  },
  "Mohamed Hossam": {
    photos: ["assets/mohamedhossam.jpeg", "assets/mohamedhossam.jpeg"],
    ig: "https://www.instagram.com/_m0hamed.z"
  },
  "Abdallah Mohamed": {
    photos: ["assets/abdallahmohamed1.jpeg", "assets/abdallahmohamed.jpeg"],
    ig: "https://www.instagram.com/barelyabdallah"
  },
  "Omar Yasser": {
    photos: ["assets/omaryasser.jpeg", "assets/omaryasser.jpeg"],
    ig: "https://www.instagram.com/omarctic"
  }
};

let currentSlide = 0;
let currentPhotos = [];

function openMemberModal(name) {
  const modal = document.getElementById('memberModal');
  const nameEl = document.getElementById('modalMemberName');
  const slidesEl = document.getElementById('carouselSlides');
  const igLink = document.getElementById('modalIgLink');
  
  const data = memberData[name];
  if(!data) return;

  nameEl.innerText = name;
  igLink.href = data.ig;
  currentPhotos = data.photos;
  currentSlide = 0;
  
  // Build slides
  slidesEl.innerHTML = '';
  currentPhotos.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    slidesEl.appendChild(img);
  });
  
  updateCarousel();
  modal.classList.add('open');
}

function moveSlide(direction) {
  currentSlide += direction;
  if (currentSlide < 0) currentSlide = currentPhotos.length - 1;
  if (currentSlide >= currentPhotos.length) currentSlide = 0;
  updateCarousel();
}

function updateCarousel() {
  const slidesEl = document.getElementById('carouselSlides');
  slidesEl.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function openLightbox(src) {
  const modal = document.getElementById('lightboxModal');
  const imgEl = document.getElementById('lightboxImg');
  imgEl.src = src;
  modal.classList.add('open');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('open');
}

// Add click listeners to member cards
document.querySelectorAll('.member.card').forEach(card => {
  card.addEventListener('click', () => {
    const name = card.querySelector('h3').innerText;
    openMemberModal(name);
  });
});

if(photoGrid) {
  // Clearing grid first in case we re-run
  photoGrid.innerHTML = ''; 
  const roomImages = [
    "WhatsApp Image 2026-05-20 at 1.47.34 PM.jpeg",
    "WhatsApp Image 2026-05-20 at 1.47.34 PM (1).jpeg",
    "WhatsApp Image 2026-05-20 at 1.47.34 PM (2).jpeg",
    "WhatsApp Image 2026-05-20 at 1.47.34 PM (3).jpeg"
  ];

  roomImages.forEach(filename => {
    const slot = document.createElement('div');
    slot.className = 'photo-slot';
    slot.style.overflow = 'hidden';
    slot.style.border = 'none';
    
    const src = `assets/room_images/${filename}`;
    const img = document.createElement('img');
    img.src = src;
    img.alt = "Room 204 Photo";
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.display = 'block';

    // Lightbox listener
    slot.addEventListener('click', () => openLightbox(src));

    slot.appendChild(img);
    photoGrid.appendChild(slot);
  });
}
