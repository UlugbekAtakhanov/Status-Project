import React, { useEffect, useState } from "react";
import PopoverForm from "../PopoverForm";
import Modal from "../Modal";
import { useEntityStore } from "../../store/entityStore";
import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import ArchivedPopoverForm from "../ArchivedPopoverForm";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import Dropdown from "../Dropdown";
import { ArchiveIcon } from "@radix-ui/react-icons";
import { toast } from "react-hot-toast";

const MainTable = () => {
    const navigate = useNavigate();
    const { entities, getEntities, deleteEntity, updateEntity } = useEntityStore((state) => state);
    const [modalOpen, setModalOpen] = useState(false);
    const [projectType, setProjectType] = React.useState("active");

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
            toast.success("Deleted successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Sth went wrong, please try again!");
        }
    };

    // archive
    const archiveHandler = async (e, id) => {
        e.preventDefault();
        const data = { archivedStatus: true };

        try {
            const upDocRef = doc(db, "entities", id);
            await updateDoc(upDocRef, { ...data });
            updateEntity(id, data);
            toast.success("Archived successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Sth went wrong, please try again!");
        }
    };

    const archivedList = entities.filter((item) => item.archivedStatus);
    const activeList = entities.filter((item) => !item.archivedStatus);

    const list = projectType === "archived" ? archivedList : activeList;

    return (
        <div className="p-4 h-screen flex flex-col overflow-hidden gap-4">
            <div className="">
                <div className=" relative mt-4 mb-8">
                    <img className="w-20 absolute left-0 top-1/2 -translate-y-1/2" src={logo} alt="logo" />
                    <h1 className="font-semibold text-center text-2xl">NTR Caseware Documentation Status</h1>
                </div>

                <div className="flex items-center">
                    <button onClick={() => setModalOpen(true)} className="bg-sky-500 w-max py-1 px-3 rounded text-white hover:bg-sky-700">
                        Add entity
                    </button>
                    <div className="ml-auto h-full">
                        <Dropdown project={projectType} setProject={setProjectType} />
                    </div>
                </div>
            </div>

            <div className=" overflow-y-scroll rounded-md">
                <table className="shadow bg-white/50 backdrop-blur-sm w-full text-sm">
                    <thead className="sticky top-0">
                        <tr className="[&>*:nth-child(1)]:text-left [&>*:nth-child(2)]:text-left  sticky top-0 z-50  bg-gray-100/50 backdrop-blur-xl whitespace-nowrap ">
                            <th className="p-3">#</th>
                            <th className="p-3">Name of entity</th>
                            <th className="p-3">Location (office)</th>
                            <th className="p-3 w-[350px]">Completed by Bek team</th>
                            <th className="p-3 w-[350px]">Reviewed by Ruslan</th>
                            <th className="p-3">Ready to archive (Yes/No)</th>
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
                                        <td className="py-2 px-1">
                                            <PopoverForm stNumber="1" id={item.id} title={item.status1.title} status={item.status1.status} />
                                        </td>
                                        <td className="py-2 px-1">
                                            <PopoverForm stNumber="2" id={item.id} title={item.status2.title} status={item.status2.status} />
                                        </td>
                                        <td className="p-3 text-center text-base hover:text-slate-800 cursor-pointer">
                                            <ArchivedPopoverForm id={item.id} title={item.archived} />
                                        </td>
                                        {projectType === "active" ? (
                                            <td
                                                onClick={(e) => archiveHandler(e, item.id)}
                                                className="p-3 text-center text-base hover:text-slate-800 cursor-pointer group"
                                                title="Move to archive"
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
                                                        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                                                    />
                                                </svg>
                                            </td>
                                        ) : null}

                                        {projectType === "archived" ? (
                                            <td
                                                onClick={() => deleteHandler(item.id)}
                                                className="p-3 text-center text-base hover:text-slate-800 cursor-pointer group"
                                                title="Delete"
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
                                        ) : null}
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td className="text-black p-2 whitespace-nowrap">No entity...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Modal open={modalOpen} setOpen={setModalOpen} />
        </div>
    );
};

export default MainTable;
