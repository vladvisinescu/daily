import {useState} from "react";
import Modal from "@/Components/Modal";

export default function PlanRow({ data, onPlanSelect = (plan) => {} }) {

    const [ plan, setPlan ] = useState(data)

    function openPlan() {
        onPlanSelect(plan)
    }

    return (
        <div
            onClick={() => {openPlan()}}
            className={'h-full rounded-lg border-4 bg-white p-4 max-h-52 overflow-hidden relative cursor-pointer'}
        >
            <span className={'block mb-4 text-lg font-semibold leading-none'}>{plan.title}</span>
            <ul>
                {plan.list_items.map(function(list_item) {
                    return (
                        <li key={list_item.id}>
                            <input className={'mr-4 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'} type="checkbox" name="something" id="something_else"/>
                            <span className={'text-sm text-gray-700'}>
                                {list_item.title}
                            </span>
                        </li>
                    )
                })}
            </ul>
            <div className="absolute bottom-0 left-0 right-0 top-[50%] bg-gradient-to-t from-gray-600 to-transparent"></div>
        </div>
    );
}
