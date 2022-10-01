import { differenceInSeconds } from 'date-fns';
import { createContext, ReactNode, useEffect, useReducer, useState } from 'react';
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
    setSecondsPassed: (seconds: number) => void;
    interruptCurrentCycle: () => void;
    createNewCycle: (data: CreateCycleData) => void;
}
interface CyclesContextProviderProps {
    children: ReactNode;
}

export const CyclesContext = createContext({} as ICyclesContext);
 
export function CyclesContextProvider({ children } : CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(cyclesReducer, {
        cycles: [],
        activeCycleId: null
    }, () => {
        const storedStateAsJson = localStorage.getItem('@ignite-timer:cycles-state-1.0.0');
        
        if (storedStateAsJson) {
            return JSON.parse(storedStateAsJson);
        }
    });

    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);
    
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if (activeCycle) {
            return differenceInSeconds(new Date(), new Date(activeCycle.startDate)); 
        }
        
        return 0;
    });

    useEffect(() => {
        const stateJson = JSON.stringify(cyclesState);

        localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJson);
    }, [cyclesState]);


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