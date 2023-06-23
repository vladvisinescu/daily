import React, { useState } from "react";
import dayjs from "dayjs";

function HabitCalendar({ entries }) {
    const today = new Date();

    const lastThreeMonths = [
        new Date(today.getFullYear(), today.getMonth() - 2, 1),
        new Date(today.getFullYear(), today.getMonth() - 1, 1),
        today,
    ];

    function daysInMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }

    function hasEvent(month, day, entries) {
        const date = dayjs().month(month.getMonth()).date(day + 1).format('YYYY-MM-DD')

        return entries && entries.includes(date)
    }

    return (
        <div className={'flex flex-col'}>
            {lastThreeMonths.map((month) => (
                <div key={month.toISOString()} className={'mr-1 h-4 flex items-center'}>
                    <span className={'inline-block w-6 text-xs font-bold text-gray-400'}>{month.toLocaleDateString("default", { month: "short" }).toLowerCase()}</span>
                    {Array.from({ length: daysInMonth(month) }).map((_, index) =>
                        hasEvent(month, index, entries) ? (
                            <span className="inline-block bg-gray-600 rounded-full w-2 h-2 mr-[1px]" title={index+1} key={index}></span>
                        ) : (
                            <span className="inline-block bg-gray-400 rounded-full w-2 h-2 mr-[1px]" title={index+1} key={index}></span>
                        )
                    )}
                </div>
            ))}
        </div>
    )
}
export default HabitCalendar;
