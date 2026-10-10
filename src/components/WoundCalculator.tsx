'use client';

import { useState } from 'react';
import { getWoundRoll } from '@/lib/calculators';

export function WoundCalculator() {
  const [strength, setStrength] = useState(4);
  const [toughness, setToughness] = useState(4);

  const woundRoll = getWoundRoll(strength, toughness);

  // Full wound table for reference
  const woundTable = [
    { condition: "S ≥ 2×T", roll: "2+", example: "S8 vs T4" },
    { condition: "S > T", roll: "3+", example: "S5 vs T4" },
    { condition: "S = T", roll: "4+", example: "S4 vs T4" },
    { condition: "S < T", roll: "5+", example: "S4 vs T5" },
    { condition: "S ≤ ½T", roll: "6+", example: "S3 vs T6" },
  ];

  return (
    <div className="space-y-3">
      {/* Interactive Calculator */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-base-300 rounded-lg p-3">
          <label className="text-xs opacity-70">Strength</label>
          <div className="flex items-center gap-2 mt-1">
            <button 
              onClick={() => setStrength(s => Math.max(1, s - 1))}
              className="btn btn-xs btn-circle"
            >
              -
            </button>
            <span className="text-2xl font-bold text-primary flex-1 text-center">{strength}</span>
            <button 
              onClick={() => setStrength(s => Math.min(20, s + 1))}
              className="btn btn-xs btn-circle"
            >
              +
            </button>
          </div>
        </div>
        <div className="bg-base-300 rounded-lg p-3">
          <label className="text-xs opacity-70">Toughness</label>
          <div className="flex items-center gap-2 mt-1">
            <button 
              onClick={() => setToughness(t => Math.max(1, t - 1))}
              className="btn btn-xs btn-circle"
            >
              -
            </button>
            <span className="text-2xl font-bold text-secondary flex-1 text-center">{toughness}</span>
            <button 
              onClick={() => setToughness(t => Math.min(20, t + 1))}
              className="btn btn-xs btn-circle"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="alert alert-info">
        <div className="flex items-center justify-between w-full">
          <span>Wound roll needed:</span>
          <span className="text-3xl font-bold">{woundRoll}+</span>
        </div>
      </div>

      {/* Quick Reference Table */}
      <div className="collapse collapse-arrow bg-base-300">
        <input type="checkbox" />
        <div className="collapse-title text-sm font-medium">
          Wound Roll Table
        </div>
        <div className="collapse-content">
          <table className="table table-xs">
            <thead>
              <tr>
                <th>Condition</th>
                <th>Roll</th>
                <th className="opacity-60">Example</th>
              </tr>
            </thead>
            <tbody>
              {woundTable.map((row, i) => (
                <tr key={i} className={woundRoll === parseInt(row.roll) ? 'bg-primary/20' : ''}>
                  <td>{row.condition}</td>
                  <td className="font-bold">{row.roll}</td>
                  <td className="opacity-60 text-xs">{row.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
