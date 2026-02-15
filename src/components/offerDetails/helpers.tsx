// Natural-ish viewers simulator (random walk + occasional spikes)
export const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

export const nextNaturalViewers = (current: number) => {
  // small step most of the time: -2..+2
  let step = Math.floor(Math.random() * 5) - 2;

  // 12% chance of a spike (people arriving/leaving)
  if (Math.random() < 0.12) {
    step +=
      Math.random() < 0.5
        ? -(3 + Math.floor(Math.random() * 4))
        : 3 + Math.floor(Math.random() * 6);
  }

  // slight "mean reversion" towards ~14 so it doesn't drift to edges forever
  const target = 14;
  const pull = Math.sign(target - current) * (Math.random() < 0.35 ? 1 : 0);

  return clamp(current + step + pull, 5, 30);
};

export const formatViewersText = (count: number) => {
  if (count === 1) {
    return `Aktualnie ofertę ogląda ${count} osoba`;
  }

  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (
    lastDigit >= 2 &&
    lastDigit <= 4 &&
    !(lastTwoDigits >= 12 && lastTwoDigits <= 14)
  ) {
    return `Aktualnie ofertę oglądają ${count} osoby`;
  }

  return `Aktualnie ofertę ogląda ${count} osób`;
};

export const isViewingHours = () => {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 23; // 06:00–22:59
};
