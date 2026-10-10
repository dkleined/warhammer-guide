'use client';

import { SETUP_STEPS } from '@/lib/data';
import { GameState } from '@/lib/types';

interface SetupViewProps {
  state: GameState;
  toggleDone: (key: string) => void;
}

export function SetupView({ state, toggleDone }: SetupViewProps) {
  const completedCount = SETUP_STEPS.filter((_, i) => state.done[`s${i}`]).length;
  
  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body p-4 sm:p-6">
        <h2 className="card-title font-header text-xl sm:text-2xl text-primary">Before the battle</h2>
        <p className="text-sm opacity-70 mb-2">
          These steps use the names in the core rules. Your mission pack decides the exact order of deployment, so follow it if it differs.
        </p>
        
        <progress 
          className="progress progress-primary w-full mb-4" 
          value={completedCount} 
          max={SETUP_STEPS.length}
        ></progress>

        <ul className="steps steps-vertical">
          {SETUP_STEPS.map((step, i) => {
            const key = `s${i}`;
            const isDone = !!state.done[key];
            
            return (
              <li 
                key={i} 
                className={`step ${isDone ? 'step-primary' : ''} cursor-pointer`}
                onClick={() => toggleDone(key)}
              >
                <div className={`text-left ${isDone ? 'opacity-60' : ''}`}>
                  <div className="font-semibold text-sm sm:text-base">{step[0]}</div>
                  <div className="text-xs sm:text-sm opacity-80 mt-1">{step[1]}</div>
                  <div className="badge badge-outline badge-xs mt-1">{step[2]}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
