import React, { useEffect, useState } from "react";
import PopoverForm from "../PopoverForm";
import Modal from "../Modal";
import { useEntityStore } from "../../store/entityStore";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import ArchivedPopoverForm from "../ArchivedPopoverForm";
import { useNavigate } from "react-router-dom";

const MainTable = () => {
    const navigate = useNavigate();
    const { entities, getEntities, deleteEntity } = useEntityStore((state) => state);
    const [modalOpen, setModalOpen] = useState(false);

    // get data
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

    // delete
    const deleteHandler = async (id) => {
        try {
            await deleteDoc(doc(db, "entities", id));
            deleteEntity(id);
        } catch (error) {
            console.log(error);
        }
    };

    const list = entities ?? [];

    return (
        <div className="p-4">
            <h1 className="mb-4 font-semibold text-center text-2xl">NTR Caseware Documentation Status</h1>

            <div className="flex">
                <button onClick={() => setModalOpen(true)} className="bg-sky-500 w-max py-1 px-3 rounded text-white hover:bg-sky-700">
                    Add entity
                </button>
                <button
                    onClick={() => {
                        localStorage.clear();
                        navigate("/login");
                    }}
                    className=" w-max ml-auto py-1  px-3 rounded text-red-500 border border-red-500 hover:bg-red-500/50 hover:text-white"
                >
                    Log out
                </button>
            </div>

            <table className="rounded-md text-white shadow overflow-hidden bg-white mt-4 w-full text-sm">
                <thead>
                    <tr className="[&>*:nth-child(1)]:text-left [&>*:nth-child(2)]:text-left sticky top-0 bg-sky-500 whitespace-nowrap ">
                        <th className="p-3">#</th>
                        <th className="p-3">Name of entity</th>
                        <th className="p-3">Location (office)</th>
                        <th className="p-3 w-[350px]">Completed by Bek team</th>
                        <th className="p-3 w-[350px]">Reviewed by Ruslan</th>
                        <th className="p-3">Archived (Yes/No)</th>
                        <th className="p-3"></th>
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
                                        <ArchivedPopoverForm id={item.id} title={item.archived} />
                                    </td>
                                    <td
                                        onClick={() => deleteHandler(item.id)}
                                        className="p-3 text-center text-base hover:text-slate-800 cursor-pointer group"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-5 h-5 group-hover:text-red-500 group-hover:scale-110"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                            />
                                        </svg>
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
