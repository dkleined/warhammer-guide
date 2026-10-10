'use client';

import { useState } from 'react';
import { roll2D6, rollD6, chargeProbability, battleShockProbability } from '@/lib/calculators';

interface RollResult {
  type: string;
  dice: number[];
  total: number;
  timestamp: Date;
}

export function DiceRoller() {
  const [results, setResults] = useState<RollResult[]>([]);
  const [chargeDistance, setChargeDistance] = useState(9);
  const [leadership, setLeadership] = useState(6);

  const addResult = (type: string, dice: number[], total: number) => {
    setResults(prev => [{
      type,
      dice,
      total,
      timestamp: new Date()
    }, ...prev.slice(0, 9)]);
  };

  const rollCharge = () => {
    const { dice, total } = roll2D6();
    addResult('Charge', dice, total);
  };

  const rollAdvance = () => {
    const dice = rollD6(1);
    addResult('Advance', dice, dice[0]);
  };

  const rollBattleShock = () => {
    const { dice, total } = roll2D6();
    addResult('Battle-shock', dice, total);
  };

  const rollD6Multi = (count: number) => {
    const dice = rollD6(count);
    addResult(`${count}D6`, dice, dice.reduce((a, b) => a + b, 0));
  };

  const getDieIcon = (value: number) => {
    const icons = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    return icons[value - 1];
  };

  return (
    <div className="space-y-4">
      {/* Quick Roll Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button onClick={rollCharge} className="btn btn-primary btn-sm">
          🎲 Charge (2D6)
        </button>
        <button onClick={rollAdvance} className="btn btn-secondary btn-sm">
          🎲 Advance (D6)
        </button>
        <button onClick={rollBattleShock} className="btn btn-warning btn-sm">
          🎲 Battle-shock
        </button>
        <button onClick={() => rollD6Multi(6)} className="btn btn-accent btn-sm">
          🎲 6D6
        </button>
      </div>

      {/* Charge Calculator */}
      <div className="bg-base-300 rounded-lg p-3">
        <label className="text-xs opacity-70">Charge distance needed</label>
        <div className="flex items-center gap-2 mt-1">
          <input
            type="range"
            min="3"
            max="12"
            value={chargeDistance}
            onChange={(e) => setChargeDistance(Number(e.target.value))}
            className="range range-primary range-xs flex-1"
          />
          <span className="badge badge-primary">{chargeDistance}&quot;</span>
        </div>
        <div className="text-sm mt-1">
          Success: <span className="font-bold text-primary">{chargeProbability(chargeDistance)}%</span>
        </div>
      </div>

      {/* Battle-shock Calculator */}
      <div className="bg-base-300 rounded-lg p-3">
        <label className="text-xs opacity-70">Leadership value</label>
        <div className="flex items-center gap-2 mt-1">
          <input
            type="range"
            min="4"
            max="9"
            value={leadership}
            onChange={(e) => setLeadership(Number(e.target.value))}
            className="range range-warning range-xs flex-1"
          />
          <span className="badge badge-warning">{leadership}+</span>
        </div>
        <div className="text-sm mt-1">
          Pass: <span className="font-bold text-warning">{battleShockProbability(leadership)}%</span>
        </div>
      </div>

      {/* Roll History */}
      {results.length > 0 && (
        <div className="space-y-1">
          <div className="text-xs opacity-70 flex justify-between">
            <span>Recent rolls</span>
            <button 
              onClick={() => setResults([])} 
              className="text-error hover:underline"
            >
              Clear
            </button>
          </div>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {results.map((r, i) => (
              <div 
                key={i} 
                className={`flex items-center justify-between text-sm bg-base-300 rounded px-2 py-1 ${i === 0 ? 'ring-2 ring-primary' : 'opacity-70'}`}
              >
                <span className="text-xs opacity-70">{r.type}</span>
                <span className="text-lg tracking-wider">
                  {r.dice.map(d => getDieIcon(d)).join(' ')}
                </span>
                <span className="font-bold badge badge-sm">{r.total}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
