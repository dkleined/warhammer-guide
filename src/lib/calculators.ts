// Wound roll calculator
export function getWoundRoll(strength: number, toughness: number): number {
  if (strength >= toughness * 2) return 2;
  if (strength > toughness) return 3;
  if (strength === toughness) return 4;
  if (strength * 2 <= toughness) return 6;
  return 5;
}

export function getWoundRollLabel(needed: number): string {
  const labels: Record<number, string> = {
    2: "2+ (S ≥ 2×T)",
    3: "3+ (S > T)",
    4: "4+ (S = T)",
    5: "5+ (S < T)",
    6: "6+ (S ≤ ½T)"
  };
  return labels[needed] || `${needed}+`;
}

// Dice rolling
export function rollD6(count: number = 1): number[] {
  return Array.from({ length: count }, () => Math.floor(Math.random() * 6) + 1);
}

export function roll2D6(): { dice: [number, number]; total: number } {
  const dice: [number, number] = [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1
  ];
  return { dice, total: dice[0] + dice[1] };
}

// Battle-shock probability
export function battleShockProbability(leadership: number): number {
  // Probability of rolling >= leadership on 2D6
  let successes = 0;
  for (let d1 = 1; d1 <= 6; d1++) {
    for (let d2 = 1; d2 <= 6; d2++) {
      if (d1 + d2 >= leadership) successes++;
    }
  }
  return Math.round((successes / 36) * 100);
}

// Charge probability
export function chargeProbability(distance: number): number {
  if (distance <= 2) return 0; // Roll of 2 always fails
  if (distance > 12) return 0;
  
  let successes = 0;
  for (let d1 = 1; d1 <= 6; d1++) {
    for (let d2 = 1; d2 <= 6; d2++) {
      const total = d1 + d2;
      if (total >= distance && total > 2) successes++;
    }
  }
  return Math.round((successes / 36) * 100);
}

// Half strength calculator
export function isAtOrBelowHalfStrength(
  startingModels: number,
  currentModels: number,
  startingWounds?: number,
  currentWounds?: number
): boolean {
  if (startingModels === 1 && startingWounds && currentWounds) {
    // Single model unit - check wounds
    return currentWounds <= Math.floor(startingWounds / 2);
  }
  // Multi-model unit - check model count
  return currentModels <= Math.floor(startingModels / 2);
}

// Format dice result for display
export function formatDiceResult(dice: number[]): string {
  return dice.map(d => `⚀⚁⚂⚃⚄⚅`[d - 1]).join(' ');
}
