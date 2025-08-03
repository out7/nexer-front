import confetti from "canvas-confetti";

interface FireConfettiOptions {
  element: HTMLElement;
}

export const fireConfetti = ({ element }: FireConfettiOptions) => {
  const elementRect = element.getBoundingClientRect();
  const elementCenter = elementRect.left + elementRect.width / 2;
  const elementTop = elementRect.top + window.scrollY;

  const x = elementCenter / window.innerWidth;
  const y = elementTop / window.innerHeight;

  const count = 200;
  const defaults = {
    origin: { y },
    spread: 50,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    origin: { x: x - 0.1, y },
  });

  fire(0.2, {
    spread: 60,
    origin: { x, y },
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    origin: { x: x + 0.1, y },
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    origin: { x, y },
  });
};
