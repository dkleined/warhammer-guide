'use client';

import { CORE_STRATAGEMS, ATTACK_SEQUENCE, KEY_TERMS } from '@/lib/data';

interface QuickReferenceProps {
  currentPhase: number;
}

export function QuickReference({ currentPhase }: QuickReferenceProps) {
  // Filter stratagems relevant to current phase
  const getRelevantStratagems = () => {
    const phaseKeywords: Record<number, string[]> = {
      0: ['Command phase', 'battle-shock'],
      1: ['Movement phase', 'Rapid Ingress', 'Fire Overwatch'],
      2: ['Shooting phase', 'Smokescreen', 'Explosives'],
      3: ['Charge phase', 'Crushing Impact', 'Heroic Intervention'],
      4: ['Fight phase', 'Fight step', 'Counteroffensive', 'Epic Challenge'],
    };

    const keywords = phaseKeywords[currentPhase] || [];
    if (keywords.length === 0) return CORE_STRATAGEMS;

    return CORE_STRATAGEMS.filter(strat => 
      keywords.some(kw => strat[2].toLowerCase().includes(kw.toLowerCase()) || strat[0].toLowerCase().includes(kw.toLowerCase()))
    );
  };

  const relevantStratagems = currentPhase >= 0 ? getRelevantStratagems() : [];

  return (
    <div className="space-y-4">
      {/* Attack Sequence - Always Visible */}
      <div className="bg-base-300 rounded-lg p-3">
        <h4 className="font-header text-sm text-primary mb-2">Attack Sequence</h4>
        <ol className="text-xs space-y-1">
          {ATTACK_SEQUENCE.map((step, i) => (
            <li key={i} className="flex gap-2">
              <span className="badge badge-xs badge-primary">{i + 1}</span>
              <span className="font-semibold">{step[0].replace(/^\d+\.\s*/, '')}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Phase-Relevant Stratagems */}
      {relevantStratagems.length > 0 && (
        <div className="bg-base-300 rounded-lg p-3">
          <h4 className="font-header text-sm text-primary mb-2">
            {currentPhase >= 0 ? 'Relevant Stratagems' : 'Core Stratagems'}
          </h4>
          <div className="space-y-2">
            {relevantStratagems.slice(0, 4).map((strat, i) => (
              <div key={i} className="text-xs">
                <div className="flex justify-between items-start">
                  <span className="font-semibold">{strat[0]}</span>
                  <span className="badge badge-xs badge-warning">{strat[1]}</span>
                </div>
                <p className="opacity-70 mt-0.5">{strat[3]}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Terms Quick Lookup */}
      <div className="collapse collapse-arrow bg-base-300">
        <input type="checkbox" />
        <div className="collapse-title text-sm font-medium py-2 min-h-0">
          Key Terms
        </div>
        <div className="collapse-content">
          <div className="space-y-2 text-xs">
            {KEY_TERMS.slice(0, 6).map((term, i) => (
              <div key={i}>
                <span className="font-semibold text-primary">{term[0]}:</span>{' '}
                <span className="opacity-80">{term[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
