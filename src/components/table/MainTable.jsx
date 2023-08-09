import React, { useEffect, useState } from "react";
import PopoverForm from "../PopoverForm";
import Modal from "../Modal";
import { useEntityStore } from "../../store/entityStore";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const MainTable = () => {
    const { entities, getEntities } = useEntityStore((state) => state);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "entities"));
                const newList = querySnapshot.docs.map((item) => item.data());
                getEntities(newList);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    const list = entities ?? [];

    return (
        <div>
            <h1 className="mb-4 font-semibold text-center text-2xl">Work Status</h1>

            <button onClick={() => setModalOpen(true)} className="bg-sky-500 w-max mx-auto py-1 px-3 rounded text-white hover:bg-sky-700">
                Add entity
            </button>

            <table className="rounded-md text-white shadow overflow-hidden bg-white mt-4 w-full text-sm">
                <thead>
                    <tr className="[&>*:nth-child(1)]:text-left [&>*:nth-child(2)]:text-left sticky top-0 bg-sky-500 whitespace-nowrap ">
                        <th className="p-3">#</th>
                        <th className="p-3">Name of entity</th>
                        <th className="p-3">Location (office)</th>
                        <th className="p-3 w-[350px]">Completed by Bek team</th>
                        <th className="p-3 w-[350px]">Reviewed by Ruslan</th>
                        <th className="p-3">Archived (Yes/No)</th>
                    </tr>
                </thead>

                <tbody>
                    {list.length ? (
                        list.map((item, index) => {
                            return (
                                <tr key={item.id} className=" text-slate-600 hover:bg-sky-50 font-semibold">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">{item.entity}</td>
                                    <td className="p-3 text-center">{item.location}</td>
                                    <td className="py-2 px-1 relative">
                                        <PopoverForm stNumber="1" id={item.id} title={item.status1.title} status={item.status1.status} />
                                    </td>
                                    <td className="py-2 px-1">
                                        <PopoverForm stNumber="2" id={item.id} title={item.status2.title} status={item.status2.status} />
                                    </td>
                                    <td className="p-3 text-center text-base hover:text-slate-800 cursor-pointer">
                                        <span className="py-1 px-3 hover:bg-sky-50 rounded">{item.archived}</span>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td className="text-black p-2">No entity...</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Modal open={modalOpen} setOpen={setModalOpen} />
        </div>
    );
};

export default MainTable;
