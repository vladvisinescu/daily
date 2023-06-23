import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, router, useForm} from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import {useState} from "react";
import SecondaryButton from "@/Components/SecondaryButton";
import HabitRow from "@/Components/Habit/HabitRow";

export default function Dashboard({ auth, habits }) {

    const placeholders = [
        "Areas of improvement for me are...",
        "I need to work on...",
        "I am motivated to enhance skills in...",
        "Habits holding me back are...",
        "Weaknesses to address are...",
        "Changes to make are...",
        "I need to explore new approaches to improve performance in...",
        "I could improve communication skills in...",
        "Adjustments to make are...",
        "Steps to improve confidence in..."
    ]

    const randomIndex = Math.floor(Math.random() * placeholders.length);
    const placeholder = placeholders[randomIndex];

    const [allHabits, setAllHabits] = useState(habits)
    const [newHabit, setNewHabit] = useState({
        title: ''
    })

    function handleSubmit(e) {
        e.preventDefault()

        if (!newHabit) {
            return;
        }

        axios.post('/habits', newHabit).then((response) => {
            setAllHabits(response.data.habits)
            setNewHabit({title: ''})
        })
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Dashboard
                    </h2>

                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form action="" onSubmit={handleSubmit} className={'flex w-full mb-5'}>
                        <TextInput
                            id={'title'}
                            placeholder={placeholder}
                            className={'w-full'}
                            value={newHabit.title}
                            onChange={e => setNewHabit({title: e.target.value})}>
                        </TextInput>
                        <div className={'flex'}>
                            <PrimaryButton type={'submit'} className={'ml-4 py-2'}>Add</PrimaryButton>
                        </div>
                    </form>
                    {allHabits.map(function(habit){
                        return <HabitRow key={habit.id} data={habit}></HabitRow>
                    })}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
