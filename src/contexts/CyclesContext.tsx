import { createContext, ReactNode, useReducer, useState } from 'react';
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from '../reducers/cycles/actions';
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer';

interface CreateCycleData {
    task: string;
    minutesAmount: number;
}

interface ICyclesContext {
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrentCycleAsFinished: () => void;
    // eslint-disable-next-line no-unused-vars
    setSecondsPassed: (seconds: number) => void;
    interruptCurrentCycle: () => void;
    // eslint-disable-next-line no-unused-vars
    createNewCycle: (data: CreateCycleData) => void;
}

export const CyclesContext = createContext({} as ICyclesContext);

interface CyclesContextProviderProps {
    children: ReactNode;
}
 
export function CyclesContextProvider({ children } : CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(cyclesReducer, {
        cycles: [],
        activeCycleId: null
    });
    
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds);
    }
    
    function createNewCycle(data: CreateCycleData) {
        const cycleId = String(new Date().getTime());
        const newCycle: Cycle  = {
            id: cycleId,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        };

        dispatch(addNewCycleAction(newCycle));
        setAmountSecondsPassed(0);
    }

    function interruptCurrentCycle() {
        dispatch(interruptCurrentCycleAction());
    }

    function markCurrentCycleAsFinished() {
        dispatch(markCurrentCycleAsFinishedAction());
    }

    return (
        <CyclesContext.Provider value={{ cycles, activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed, createNewCycle, interruptCurrentCycle }}>
            {children}
        </CyclesContext.Provider>
    );
}