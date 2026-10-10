'use client';

import { ATTACK_SEQUENCE, CORE_STRATAGEMS, WEAPON_ABILITIES, KEY_TERMS } from '@/lib/data';

export function ReferenceView() {
  return (
    <div className="space-y-4">
      {/* Attack Sequence */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body p-4 sm:p-6">
          <h2 className="card-title font-header text-xl sm:text-2xl text-primary">Attack sequence</h2>
          <ul className="timeline timeline-vertical timeline-compact">
            {ATTACK_SEQUENCE.map((step, i) => (
              <li key={i}>
                {i > 0 && <hr className="bg-primary" />}
                <div className="timeline-start text-xs opacity-60">{i + 1}</div>
                <div className="timeline-middle">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                </div>
                <div className="timeline-end timeline-box bg-base-300 text-sm">
                  <span className="font-semibold text-primary">{step[0].replace(/^\d+\.\s*/, '')}</span>
                  <p className="mt-1 opacity-90">{step[1]}</p>
                </div>
                {i < ATTACK_SEQUENCE.length - 1 && <hr className="bg-primary" />}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Core Stratagems */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body p-4 sm:p-6">
          <h2 className="card-title font-header text-xl sm:text-2xl text-primary">Core stratagems</h2>
          
          {/* Mobile: Cards view */}
          <div className="sm:hidden space-y-3">
            {CORE_STRATAGEMS.map((row, i) => (
              <div key={i} className="bg-base-300 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-primary">{row[0]}</span>
                  <span className="badge badge-primary badge-sm">{row[1]}</span>
                </div>
                <p className="text-xs opacity-70 mb-2">{row[2]}</p>
                <p className="text-sm">{row[3]}</p>
              </div>
            ))}
          </div>
          
          {/* Desktop: Table view */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="table table-zebra table-sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>CP</th>
                  <th>When</th>
                  <th>Effect</th>
                </tr>
              </thead>
              <tbody>
                {CORE_STRATAGEMS.map((row, i) => (
                  <tr key={i}>
                    <td className="font-semibold whitespace-nowrap">{row[0]}</td>
                    <td><span className="badge badge-primary badge-sm">{row[1]}</span></td>
                    <td className="text-xs opacity-80">{row[2]}</td>
                    <td>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="alert alert-info mt-3 text-xs sm:text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>Each player can&apos;t use the same stratagem more than once in a phase, and can&apos;t target the same unit with more than one stratagem in a phase.</span>
          </div>
        </div>
      </div>

      {/* Weapon Abilities */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body p-4 sm:p-6">
          <h2 className="card-title font-header text-xl sm:text-2xl text-primary">Weapon and core abilities</h2>
          <div className="grid gap-2">
            {WEAPON_ABILITIES.map((row, i) => (
              <div key={i} className="collapse collapse-arrow bg-base-300">
                <input type="checkbox" />
                <div className="collapse-title font-mono text-sm text-primary py-2 min-h-0">
                  {row[0]}
                </div>
                <div className="collapse-content text-sm">
                  <p>{row[1]}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="alert mt-3 text-xs">
            <span>If an ability is followed by keywords, it only applies against targets with one of them. Duplicate instances of an ability are not cumulative.</span>
          </div>
        </div>
      </div>

      {/* Key Terms */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body p-4 sm:p-6">
          <h2 className="card-title font-header text-xl sm:text-2xl text-primary">Key terms</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {KEY_TERMS.map((row, i) => (
              <div key={i} className="bg-base-300 rounded-lg p-3">
                <div className="font-semibold text-primary text-sm">{row[0]}</div>
                <div className="text-xs sm:text-sm mt-1 opacity-90">{row[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
