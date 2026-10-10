'use client';

import { PHASES, TURN_STEPS, SPECIAL_STEPS, getTipsFor } from '@/lib/data';
import { GameState, SequenceItem } from '@/lib/types';

interface GuideViewProps {
  state: GameState;
  currentStep: SequenceItem;
  isMyTurn: (turn: number) => boolean;
  nextStep: () => void;
  prevStep: () => void;
  jumpToPhase: (turn: number, phase: number) => void;
  toggleFirstTurn: () => void;
  reset: () => void;
  canGoBack: boolean;
  totalSteps: number;
}

export function GuideView({
  state,
  currentStep,
  isMyTurn,
  nextStep,
  prevStep,
  jumpToPhase,
  toggleFirstTurn,
  reset,
  canGoBack,
  totalSteps
}: GuideViewProps) {
  const q = currentStep;
  const isMine = q.k === 't' ? isMyTurn(q.t!) : true;
  const step = q.k === 't' ? TURN_STEPS[q.i!] : SPECIAL_STEPS[q.k];
  const turnLabel = q.k === 't' ? (isMine ? "Your turn" : "Opponent's turn") : "Battle round";

  const tips = getTipsFor(step.t, isMine || !!step.both, state.fac);

  return (
    <div className="space-y-3">
      {/* Sticky position indicator */}
      <div className="sticky top-0 z-10 bg-base-200 border border-base-300 rounded-lg p-3 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-2 w-full">
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge badge-outline font-semibold">Round {state.round}</span>
            <span className="opacity-50">·</span>
            <span className={isMine ? "font-medium" : "text-secondary font-medium"}>{turnLabel}</span>
            {step.ph >= 0 && (
              <>
                <span className="opacity-50">·</span>
                <span className="font-header text-lg">{PHASES[step.ph]} phase</span>
              </>
            )}
          </div>
          <span className="text-sm opacity-50">
            {state.pos + 1} / {totalSteps}
          </span>
        </div>
      </div>

      {/* Current step card */}
      <div className={`card bg-base-200 shadow-xl border-l-4 ${isMine ? 'border-l-primary' : 'border-l-secondary'}`}>
        <div className="card-body p-4 sm:p-6">
          <h2 className="card-title font-header text-xl sm:text-2xl">{step.t}</h2>
          <div className="badge badge-ghost badge-sm">Rules {step.r}</div>

          <h3 className="font-header text-lg mt-4 mb-1 opacity-80">
            {step.both ? "What to do" : isMine ? "What you do" : "What happens, and what you can do"}
          </h3>
          <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base">
            {(isMine || step.both ? step.me : step.op).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          {step.tp && (
            <div className="alert alert-warning mt-4 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>{step.tp}</span>
            </div>
          )}

          {tips.length > 0 && (
            <div className="divider text-xs opacity-50 my-2">Tips & Tactics</div>
          )}
          {tips.map(([title, items], idx) => (
            <div key={idx} className="collapse collapse-arrow bg-base-300 mt-2">
              <input type="checkbox" defaultChecked />
              <div className="collapse-title font-header text-lg py-2 min-h-0">
                <span className={
                  title.includes('World Eaters') ? 'text-error' : 
                  title.includes('Custodes') ? 'text-warning' : 
                  title.includes('Tyranids') ? 'text-purple-400' : 
                  'text-primary/80'
                }>
                  {title}
                </span>
              </div>
              <div className="collapse-content">
                <ul className="list-disc pl-5 space-y-1.5 text-sm">
                  {items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-2">
        <button
          onClick={prevStep}
          disabled={!canGoBack}
          className="btn btn-outline flex-1 h-14 text-base"
        >
          ‹ Back
        </button>
        <button
          onClick={nextStep}
          className="btn btn-primary flex-1 h-14 text-base"
        >
          Next step ›
        </button>
      </div>

      {/* Phase jump section */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body p-4 sm:p-6">
          <h3 className="font-header text-lg text-primary mb-3">Jump to a phase</h3>
          
          {[0, 1].map(turn => (
            <div key={turn} className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-sm opacity-70 min-w-[90px] sm:min-w-[110px]">
                {isMyTurn(turn) ? "Your turn" : "Opponent's"}
              </span>
              <div className="flex flex-wrap gap-1">
                {PHASES.map((phase, phaseIdx) => {
                  const isActive = q.k === 't' && q.t === turn && TURN_STEPS[q.i!].ph === phaseIdx;
                  return (
                    <button
                      key={phaseIdx}
                      onClick={() => jumpToPhase(turn, phaseIdx)}
                      className={`btn btn-xs sm:btn-sm ${isActive ? 'btn-primary' : 'btn-ghost'}`}
                    >
                      {phase}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="divider my-2"></div>

          <div className="flex flex-wrap gap-2">
            <button onClick={toggleFirstTurn} className="btn btn-sm btn-outline">
              {state.me ? "I go first" : "Opponent goes first"}
            </button>
            <button onClick={reset} className="btn btn-sm btn-ghost">
              Restart round 1
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
