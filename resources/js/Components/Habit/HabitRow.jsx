import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import {useState} from "react";
import {Cancel, DoubleCheck} from "iconoir-react";
import dayjs from "dayjs";
import HabitCalendar from "@/Components/Habit/HabitCalendar";

export default function HabitRow({ data }) {

    const [ drawerOpen, setDrawerOpen ] = useState(false)
    const [ habit, setHabit ] = useState(data)
    const [ CALENDAR_SUB_MONTHS, setCalendarSubMonth ] = useState(2)

    function handleTrack(e, data) {
        e.preventDefault()

        axios.post(`/habits/${data.id}/track`).then(response => {
            setHabit(response.data)
        })
    }

    return <div className={'bg-white overflow-hidden shadow-lg sm:rounded-lg mb-6'}>
        <div className={'flex justify-between' + (drawerOpen ? ' border-b' : '')}>
            <div className="flex">
                <PrimaryButton onClick={(e) => handleTrack(e, habit)} className={'rounded-none border-0'}>
                    <DoubleCheck className={'mr-3'} /> Track
                </PrimaryButton>
            </div>
            <div className={'px-5 py-4 text-gray-900 flex-grow'}>
                <div className={'flex justify-between items-center'}>
                    <div>
                        <span className={'text-lg'}>{habit.title}</span>
                    </div>
                    <div className={'flex flex-col'}>
                        <div>
                            <span className={'text-sm text-gray-400'}>Times tracked: </span>
                            <span className={'text-sm text-gray-500'}>{ habit.recent_entries_count }</span>
                        </div>
                        <div>
                            <span className={'text-sm text-gray-400'}>Tracked today: </span>
                            <span className={'text-sm text-gray-500'}>{ habit.today_entries_count }</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'flex items-center pr-4'}>
                <HabitCalendar entries={habit.recent_entries} />
            </div>
            <div className={'flex overflow-hidden'}>
                <SecondaryButton className={'rounded-none border-0 border-l'} onClick={() => setDrawerOpen(!drawerOpen)}>
                    {drawerOpen && (
                        <div className={'flex items-center'}>
                            <Cancel />
                            Close
                        </div>
                    )}
                    {!drawerOpen && 'View'}
                </SecondaryButton>
            </div>
        </div>
        {drawerOpen && (
            <div className={'rounded-lg bg-white px-3 shadow-md'}>
                <div className={'py-4'}>
                    <div className="flex items-center">
                        <HabitCalendar entries={habit.recent_entries} />
                    </div>
                </div>
            </div>
        )}
    </div>
}
