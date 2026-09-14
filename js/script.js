/* =========================
   ELEMENTS
========================= */

const header = document.querySelector(".header");

const background = document.querySelector(".site-background");

const progressBar = document.querySelector(".scroll-progress");

const cursor = document.querySelector(".cursor");

const cursorFollower = document.querySelector(".cursor-follower");

const revealElements = document.querySelectorAll(".reveal");

const interactiveElements = document.querySelectorAll(
  "a, .project-card, .technology-item",
);

/* =========================
   SCROLL PROGRESS
========================= */

function updateScrollProgress() {
  if (!progressBar) return;

  const scrollTop = window.scrollY;

  const documentHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

  progressBar.style.width = `${progress}%`;
}

/* =========================
   HEADER
========================= */

let lastScrollY = 0;

function updateHeader() {
  if (!header) return;

  const currentScroll = window.scrollY;

  if (currentScroll > 80) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  if (currentScroll > lastScrollY && currentScroll > 500) {
    header.classList.add("hidden");
  } else {
    header.classList.remove("hidden");
  }

  lastScrollY = Math.max(currentScroll, 0);
}

/* =========================
   REVEAL ON SCROLL
========================= */

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");

        revealObserver.unobserve(entry.target);
      }
    });
  },

  {
    threshold: 0.12,
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* =========================
   BACKGROUND PARALLAX
========================= */

let targetX = 0;
let targetY = 0;

let currentX = 0;
let currentY = 0;

document.addEventListener(
  "mousemove",

  (event) => {
    targetX = (event.clientX / window.innerWidth - 0.5) * 35;

    targetY = (event.clientY / window.innerHeight - 0.5) * 22;
  },
);

function animateBackground() {
  if (background) {
    currentX += (targetX - currentX) * 0.055;

    currentY += (targetY - currentY) * 0.055;

    const scrollMovement = window.scrollY * 0.025;

    background.style.transform = `
            scale(1.08)
            translate3d(
                ${currentX}px,
                ${currentY - scrollMovement}px,
                0
            )
            `;
  }

  requestAnimationFrame(animateBackground);
}

animateBackground();

/* =========================
   CUSTOM CURSOR
========================= */

let mouseX = 0;
let mouseY = 0;

let followerX = 0;
let followerY = 0;

document.addEventListener(
  "mousemove",

  (event) => {
    mouseX = event.clientX;

    mouseY = event.clientY;

    if (cursor) {
      cursor.style.left = `${mouseX}px`;

      cursor.style.top = `${mouseY}px`;
    }
  },
);

function animateCursor() {
  followerX += (mouseX - followerX) * 0.14;

  followerY += (mouseY - followerY) * 0.14;

  if (cursorFollower) {
    cursorFollower.style.left = `${followerX}px`;

    cursorFollower.style.top = `${followerY}px`;
  }

  requestAnimationFrame(animateCursor);
}

animateCursor();

interactiveElements.forEach((element) => {
  element.addEventListener(
    "mouseenter",

    () => {
      if (cursorFollower) {
        cursorFollower.classList.add("cursor-hover");
      }
    },
  );

  element.addEventListener(
    "mouseleave",

    () => {
      if (cursorFollower) {
        cursorFollower.classList.remove("cursor-hover");
      }
    },
  );
});

/* =========================
   TITLE PARALLAX
========================= */

const headings = document.querySelectorAll(".big-heading");

function updateHeadingMovement() {
  headings.forEach((heading) => {
    const rect = heading.getBoundingClientRect();

    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      const center = window.innerHeight / 2;

      const distance = rect.top - center;

      const movement = distance * -0.035;

      heading.style.transform = `translateY(${movement}px)`;
    }
  });
}

/* =========================
   PROJECT MOVEMENT
========================= */

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener(
    "mousemove",

    (event) => {
      const rect = card.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;

      const y = (event.clientY - rect.top) / rect.height - 0.5;

      card.style.transform = `
                    perspective(1000px)
                    rotateX(
                        ${y * -1.5}deg
                    )
                    rotateY(
                        ${x * 1.5}deg
                    )
                    `;
    },
  );

  card.addEventListener(
    "mouseleave",

    () => {
      card.style.transform = `
                    perspective(1000px)
                    rotateX(0deg)
                    rotateY(0deg)
                    `;
    },
  );
});

/* =========================
   SCROLL EVENTS
========================= */

window.addEventListener(
  "scroll",

  () => {
    updateScrollProgress();

    updateHeader();

    updateHeadingMovement();
  },

  {
    passive: true,
  },
);

/* =========================
   INITIAL STATE
========================= */

updateScrollProgress();

updateHeader();

updateHeadingMovement();
