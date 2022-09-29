import { createContext, ReactNode, useState } from 'react';

interface CreateCycleData {
    task: string;
    minutesAmount: number;
}

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
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
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
    
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

    function markCurrentCycleAsFinished() {
        setCycles(state => state.map(cycle => {
            if (cycle.id === activeCycleId) {
                return {...cycle, finishedDate: new Date()};
            }
            else {
                return cycle;
            }
        }));
    }

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

        setCycles((state) => [...state, newCycle]);
        setActiveCycleId(newCycle.id);
        setAmountSecondsPassed(0);

        // reset();
    }

    function interruptCurrentCycle() {
        setActiveCycleId(null);

        setCycles(state => state.map(cycle => {
            if (cycle.id === activeCycleId) {
                return {
                    ...cycle,
                    interruptedDate: new Date()
                };
            } 
            else {
                return cycle;
            }
        })); 
    }


    return (
        <CyclesContext.Provider value={{ cycles, activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed, createNewCycle, interruptCurrentCycle }}>
            {children}
        </CyclesContext.Provider>
    );
}