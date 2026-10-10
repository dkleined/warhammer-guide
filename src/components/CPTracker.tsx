'use client';

import { useState, useEffect } from 'react';

interface CPTrackerProps {
  round: number;
}

export function CPTracker({ round }: CPTrackerProps) {
  const [myCP, setMyCP] = useState(0);
  const [opponentCP, setOpponentCP] = useState(0);
  const [insaneBraveryUsed, setInsaneBraveryUsed] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('wh40k-cp-tracker');
      if (saved) {
        const data = JSON.parse(saved);
        setMyCP(data.myCP || 0);
        setOpponentCP(data.opponentCP || 0);
        setInsaneBraveryUsed(data.insaneBraveryUsed || false);
      }
    } catch (e) {
      console.error('Failed to load CP tracker:', e);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('wh40k-cp-tracker', JSON.stringify({
        myCP,
        opponentCP,
        insaneBraveryUsed
      }));
    } catch (e) {
      console.error('Failed to save CP tracker:', e);
    }
  }, [myCP, opponentCP, insaneBraveryUsed]);

  const adjustCP = (player: 'me' | 'opponent', delta: number) => {
    if (player === 'me') {
      setMyCP(prev => Math.max(0, prev + delta));
    } else {
      setOpponentCP(prev => Math.max(0, prev + delta));
    }
  };

  const gainCoreCP = () => {
    setMyCP(prev => prev + 1);
    setOpponentCP(prev => prev + 1);
  };

  const resetAll = () => {
    setMyCP(0);
    setOpponentCP(0);
    setInsaneBraveryUsed(false);
  };

  return (
    <div className="space-y-3">
      {/* My CP */}
      <div className="bg-base-300 rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-primary">Your CP</span>
          <span className="text-2xl font-bold text-primary">{myCP}</span>
        </div>
        <div className="flex gap-1">
          <button 
            onClick={() => adjustCP('me', -1)} 
            className="btn btn-xs btn-outline flex-1"
            disabled={myCP === 0}
          >
            -1
          </button>
          <button 
            onClick={() => adjustCP('me', -2)} 
            className="btn btn-xs btn-outline flex-1"
            disabled={myCP < 2}
          >
            -2
          </button>
          <button 
            onClick={() => adjustCP('me', 1)} 
            className="btn btn-xs btn-primary flex-1"
          >
            +1
          </button>
        </div>
      </div>

      {/* Opponent CP */}
      <div className="bg-base-300 rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-secondary">Opponent CP</span>
          <span className="text-2xl font-bold text-secondary">{opponentCP}</span>
        </div>
        <div className="flex gap-1">
          <button 
            onClick={() => adjustCP('opponent', -1)} 
            className="btn btn-xs btn-outline flex-1"
            disabled={opponentCP === 0}
          >
            -1
          </button>
          <button 
            onClick={() => adjustCP('opponent', -2)} 
            className="btn btn-xs btn-outline flex-1"
            disabled={opponentCP < 2}
          >
            -2
          </button>
          <button 
            onClick={() => adjustCP('opponent', 1)} 
            className="btn btn-xs btn-secondary flex-1"
          >
            +1
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2">
        <button 
          onClick={gainCoreCP} 
          className="btn btn-sm btn-accent flex-1"
        >
          Both +1 CP
        </button>
        <button 
          onClick={resetAll} 
          className="btn btn-sm btn-ghost"
        >
          Reset
        </button>
      </div>

      {/* Insane Bravery Tracker */}
      <div className="form-control">
        <label className="label cursor-pointer justify-start gap-2">
          <input 
            type="checkbox" 
            checked={insaneBraveryUsed}
            onChange={(e) => setInsaneBraveryUsed(e.target.checked)}
            className="checkbox checkbox-warning checkbox-sm" 
          />
          <span className="label-text text-sm">
            Insane Bravery used
            <span className="text-xs opacity-60 ml-1">(once per battle)</span>
          </span>
        </label>
      </div>

      {/* Round indicator */}
      <div className="text-xs text-center opacity-60">
        Battle Round {round} · Expected CP: ~{round} each
      </div>
    </div>
  );
}
