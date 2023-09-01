import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useState } from "react";
import SecondaryButton from "@/Components/SecondaryButton";
import HabitRow from "@/Components/Habit/HabitRow";
import PlanRow from "@/Components/Plan/PlanRow";
import Modal from "@/Components/Modal";
import PlanModal from "@/Components/Plan/PlanModal";

export default function Dashboard({ auth, plans }) {
    const [allPlans, setAllPlans] = useState(plans);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [newPlan, setNewPlan] = useState({
        title: "",
    });

    function handleSubmit(e) {
        e.preventDefault();

        if (!newPlan) {
            return;
        }

        axios.post("/plans", newPlan).then((response) => {
            setAllPlans(response.data.plans);
            setNewPlan({ title: "" });
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Plans
                    </h2>
                </div>
            }
        >
            <Head title="Dashboard" />

            <PlanModal
                selectedPlan={selectedPlan}
                onSelectPlan={(plan) => {setSelectedPlan(plan)}}
            >
            </PlanModal>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form
                        action=""
                        onSubmit={handleSubmit}
                        className={"flex w-full mb-5"}
                    >
                        <TextInput
                            id={"title"}
                            className={"w-full"}
                            value={newPlan.title}
                            onChange={(e) =>
                                setNewPlan({ title: e.target.value })
                            }
                        ></TextInput>
                        <div className={"flex"}>
                            <PrimaryButton
                                type={"submit"}
                                className={"ml-4 py-2"}
                            >
                                Add
                            </PrimaryButton>
                        </div>
                    </form>
                    <div className="grid grid-cols-4 gap-4">
                        {allPlans.map(function (plan) {
                            return (
                                <PlanRow
                                    key={plan.id}
                                    data={plan}
                                    onPlanSelect={(plan) => {
                                        setSelectedPlan(plan);
                                    }}
                                ></PlanRow>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
