import { Play } from 'phosphor-react';
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from './styles';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const newCycleFormValidationSchema = z.object({
    task: z.string().min(1, 'Informe a tarefa'),
    minutesAmount: z.number().min(5,'O ciclo precisa ser de no mínimo 05 minutos').max(60, 'O ciclo precisa ser de no máximo 60 minutos')
});

type NewCycleFormData = z.infer<typeof newCycleFormValidationSchema>;

export function Home () {
    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            minutesAmount: 0,
            task: ''
        }
    });

    const task = watch('task');
    const isSubmitDisabled = !task;

    function handleCreateNewCycle(data: NewCycleFormData) {
        reset();
        console.log(data);
    }

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    
                    <TaskInput 
                        type="text" 
                        list="task-suggestions" 
                        id="task" 
                        placeholder='Dê um nome para o seu projeto'
                        {...register('task')}
                    />

                    <datalist id="task-suggestions">
                        <option value="p1"/>
                        <option value="p2"/>
                        <option value="p3"/>
                        <option value="p4"/>
                    </datalist>

                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesAmountInput 
                        type="number" 
                        id="minutesAmount" 
                        step={5}    
                        min={5}
                        max={60}
                        {...register('minutesAmount', { valueAsNumber:true })}
                    />

                    <span>minutos.</span>
                </FormContainer>

                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24}/>
                        Começar
                </StartCountdownButton>

            </form>
        </HomeContainer>
    );
}