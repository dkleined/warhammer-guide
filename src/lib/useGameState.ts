'use client';

import { useState, useEffect, useCallback } from 'react';
import { GameState, Faction } from './types';
import { generateSequence, TURN_STEPS } from './data';

const STORAGE_KEY = 'warhammer-guide-state';
const SEQUENCE = generateSequence();
const TOTAL_STEPS = SEQUENCE.length;

const defaultState: GameState = {
  tab: 'g',
  round: 1,
  pos: 0,
  me: 1,
  done: {},
  fac: 'g'
};

export function useGameState() {
  const [state, setState] = useState<GameState>(defaultState);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState({ ...defaultState, ...parsed });
      }
    } catch (e) {
      console.error('Failed to load state:', e);
    }
    setIsLoaded(true);
  }, []);

  // Save state to localStorage on change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (e) {
        console.error('Failed to save state:', e);
      }
    }
  }, [state, isLoaded]);

  const setTab = useCallback((tab: 'g' | 's' | 'r') => {
    setState(s => ({ ...s, tab }));
  }, []);

  const setFaction = useCallback((fac: Faction) => {
    setState(s => ({ ...s, fac }));
  }, []);

  const nextStep = useCallback(() => {
    setState(s => {
      if (s.pos < TOTAL_STEPS - 1) {
        return { ...s, pos: s.pos + 1 };
      } else {
        return { ...s, pos: 0, round: s.round + 1 };
      }
    });
  }, []);

  const prevStep = useCallback(() => {
    setState(s => {
      if (s.pos > 0) {
        return { ...s, pos: s.pos - 1 };
      } else if (s.round > 1) {
        return { ...s, round: s.round - 1, pos: TOTAL_STEPS - 1 };
      }
      return s;
    });
  }, []);

  const jumpToPhase = useCallback((turn: number, phase: number) => {
    const idx = SEQUENCE.findIndex(
      s => s.k === 't' && s.t === turn && TURN_STEPS[s.i!].ph === phase
    );
    if (idx >= 0) {
      setState(s => ({ ...s, pos: idx, tab: 'g' }));
    }
  }, []);

  const toggleFirstTurn = useCallback(() => {
    setState(s => ({ ...s, me: s.me ? 0 : 1 }));
  }, []);

  const reset = useCallback(() => {
    setState(s => ({ ...s, round: 1, pos: 0 }));
  }, []);

  const toggleDone = useCallback((key: string) => {
    setState(s => ({
      ...s,
      done: { ...s.done, [key]: s.done[key] ? 0 : 1 }
    }));
  }, []);

  const isMyTurn = useCallback((turn: number) => {
    return (turn === 0) === (state.me === 1);
  }, [state.me]);

  const getCurrentStep = useCallback(() => {
    return SEQUENCE[state.pos];
  }, [state.pos]);

  const canGoBack = state.pos > 0 || state.round > 1;

  return {
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
    sequence: SEQUENCE,
    totalSteps: TOTAL_STEPS
  };
}
