'use client';

import { useGameState } from '@/lib/useGameState';
import { GuideView } from './GuideView';
import { SetupView } from './SetupView';
import { ReferenceView } from './ReferenceView';
import { Sidebar } from './Sidebar';
import { PhaseProgress } from './PhaseProgress';
import { Faction } from '@/lib/types';
import { TURN_STEPS, SPECIAL_STEPS } from '@/lib/data';

export function WarhammerGuide() {
  const {
    state,
    isLoaded,
    setTab,
    setFaction,
    nextStep,
    prevStep,
    jumpToPhase,
    toggleFirstTurn,
    reset,
    toggleDone,
    isMyTurn,
    getCurrentStep,
    canGoBack,
    totalSteps
  } = useGameState();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const currentStep = getCurrentStep();
  const step = currentStep.k === 't' ? TURN_STEPS[currentStep.i!] : SPECIAL_STEPS[currentStep.k];
  const isMine = currentStep.k === 't' ? isMyTurn(currentStep.t!) : true;

  return (
    <div className="space-y-4">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="font-header text-2xl sm:text-3xl font-bold">
            Warhammer 40,000 <span className="text-primary">·</span> 11th Edition
          </h1>
          <p className="text-sm opacity-50">
            A step-by-step guide built from the Core Rules.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={state.fac}
            onChange={(e) => setFaction(e.target.value as Faction)}
            className="select select-bordered select-sm"
          >
            <option value="g">General</option>
            <option value="ac">Adeptus Custodes</option>
            <option value="we">World Eaters</option>
          </select>
          <ThemeToggle />
        </div>
      </header>

      {/* Phase Progress - Only show in Guide tab */}
      {state.tab === 'g' && step.ph >= 0 && (
        <PhaseProgress currentPhase={step.ph} isMyTurn={isMine} />
      )}

      {/* Tab navigation */}
      <div role="tablist" className="tabs tabs-boxed bg-base-200 p-1">
        {[
          { key: 'g', label: 'Guide', icon: '📋' },
          { key: 's', label: 'Setup', icon: '⚙️' },
          { key: 'r', label: 'Reference', icon: '📖' }
        ].map(tab => (
          <button
            key={tab.key}
            role="tab"
            onClick={() => setTab(tab.key as 'g' | 's' | 'r')}
            className={`tab tab-sm sm:tab-md flex-1 ${
              state.tab === tab.key ? 'tab-active' : ''
            }`}
          >
            <span className="sm:hidden">{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main content with sidebar on desktop */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {state.tab === 'g' && (
            <GuideView
              state={state}
              currentStep={currentStep}
              isMyTurn={isMyTurn}
              nextStep={nextStep}
              prevStep={prevStep}
              jumpToPhase={jumpToPhase}
              toggleFirstTurn={toggleFirstTurn}
              reset={reset}
              canGoBack={canGoBack}
              totalSteps={totalSteps}
            />
          )}
          {state.tab === 's' && (
            <SetupView state={state} toggleDone={toggleDone} />
          )}
          {state.tab === 'r' && <ReferenceView />}
        </div>

        {/* Sidebar - Desktop only, visible in Guide tab */}
        {state.tab === 'g' && (
          <div className="hidden lg:block w-80 flex-shrink-0">
            <Sidebar round={state.round} currentPhase={step.ph} />
          </div>
        )}
      </div>

      {/* Mobile tools drawer */}
      {state.tab === 'g' && (
        <MobileToolsDrawer round={state.round} currentPhase={step.ph} />
      )}
    </div>
  );
}

function ThemeToggle() {
  const toggleTheme = () => {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const next = current === 'warhammer' ? 'warhammerLight' : 'warhammer';
    html.setAttribute('data-theme', next);
    localStorage.setItem('wh40k-theme', next);
  };

  return (
    <button onClick={toggleTheme} className="btn btn-ghost btn-sm btn-circle">
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    </button>
  );
}

function MobileToolsDrawer({ round, currentPhase }: { round: number; currentPhase: number }) {
  return (
    <div className="lg:hidden fixed bottom-4 right-4 z-50">
      <div className="dropdown dropdown-top dropdown-end">
        <label tabIndex={0} className="btn btn-circle btn-primary btn-lg shadow-lg">
          🎲
        </label>
        <div tabIndex={0} className="dropdown-content z-[1] card card-compact w-80 p-2 shadow-xl bg-base-200 mb-2">
          <div className="card-body">
            <Sidebar round={round} currentPhase={currentPhase} />
          </div>
        </div>
      </div>
    </div>
  );
}
