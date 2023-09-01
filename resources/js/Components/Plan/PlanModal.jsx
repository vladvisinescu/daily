import { useState } from "react";
import Modal from "@/Components/Modal";

export default function PlanModal({ selectedPlan = null, onSelectPlan = (plan) => {} }) {

    return (
        <Modal
            show={selectedPlan !== null}
            onClose={() => {
                onSelectPlan(null);
            }}
        >
            <div className={"px-6 py-4"}>
                <span className={'text-3xl'}>{selectedPlan?.title}</span>
                <ul>
                    {selectedPlan?.list_items.map(function (list_item) {
                        return (
                            <li key={list_item.id}>
                                <input
                                    className={"mr-4 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"}
                                    type="checkbox"
                                    name="something"
                                    id="something_else"
                                    onChange={}
                                />
                                <span className={"text-sm text-gray-700"}>
                                    {list_item.title}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </Modal>
    );
}
