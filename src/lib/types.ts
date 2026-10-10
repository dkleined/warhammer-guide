export interface Step {
  ph: number; // phase index or -1
  t: string; // title
  r: string; // rules reference
  me: string[]; // what you do on your turn
  op: string[]; // what you do on opponent's turn
  tp?: string; // tip
  both?: boolean; // applies to both players
}

export interface SpecialStep {
  ph: number;
  t: string;
  r: string;
  me: string[];
  op: string[];
  tp?: string; // tip
  both?: boolean;
}

export interface SequenceItem {
  k: 'rs' | 're' | 't';
  t?: number; // turn index (0 or 1)
  i?: number; // step index
}

export interface GameState {
  tab: 'g' | 's' | 'r';
  round: number;
  pos: number;
  me: number; // 1 = you go first, 0 = opponent goes first
  done: Record<string, number>;
  fac: Faction;
}

export type Faction = 'g' | 'we' | 'ac';
