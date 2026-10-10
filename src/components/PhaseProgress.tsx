'use client';

import { PHASES } from '@/lib/data';

interface PhaseProgressProps {
  currentPhase: number;
  isMyTurn: boolean;
}

export function PhaseProgress({ currentPhase, isMyTurn }: PhaseProgressProps) {
  const phaseIcons = ['⚔️', '🚶', '🎯', '⚡', '🗡️'];

  return (
    <div className="w-full">
      <ul className="steps steps-horizontal w-full text-xs">
        {PHASES.map((phase, i) => (
          <li 
            key={i} 
            className={`step ${i <= currentPhase ? (isMyTurn ? 'step-primary' : 'step-secondary') : ''}`}
            data-content={phaseIcons[i]}
          >
            <span className="hidden sm:inline">{phase}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
