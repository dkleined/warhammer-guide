'use client';

import { useState } from 'react';
import { DiceRoller } from './DiceRoller';
import { CPTracker } from './CPTracker';
import { WoundCalculator } from './WoundCalculator';
import { QuickReference } from './QuickReference';

interface SidebarProps {
  round: number;
  currentPhase: number;
}

type SidebarTab = 'dice' | 'cp' | 'wound' | 'ref';

export function Sidebar({ round, currentPhase }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<SidebarTab>('dice');

  const tabs: { key: SidebarTab; label: string; icon: string }[] = [
    { key: 'dice', label: 'Dice', icon: '🎲' },
    { key: 'cp', label: 'CP', icon: '⚡' },
    { key: 'wound', label: 'Wound', icon: '💀' },
    { key: 'ref', label: 'Ref', icon: '📖' },
  ];

  return (
    <div className="bg-base-200 rounded-xl p-4 h-fit sticky top-4">
      {/* Tab Navigation */}
      <div className="tabs tabs-boxed bg-base-300 mb-4">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`tab tab-sm flex-1 ${activeTab === tab.key ? 'tab-active' : ''}`}
          >
            <span className="mr-1">{tab.icon}</span>
            <span className="hidden xl:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {activeTab === 'dice' && <DiceRoller />}
        {activeTab === 'cp' && <CPTracker round={round} />}
        {activeTab === 'wound' && <WoundCalculator />}
        {activeTab === 'ref' && <QuickReference currentPhase={currentPhase} />}
      </div>
    </div>
  );
}
