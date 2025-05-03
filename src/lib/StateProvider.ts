import { Action, State } from '@/core/reducer/types';
import { createContext } from 'react';
import type { Dispatch } from 'react';

export const StateContext = createContext<State>(null!);
export const DispatchContext = createContext<Dispatch<Action>>(null!);
