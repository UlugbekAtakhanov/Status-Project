import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import React, { useRef } from "react";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useEntityStore } from "../store/entityStore";
import { toast } from "react-hot-toast";

const Modal = ({ open, setOpen }) => {
    const { addEntity } = useEntityStore((state) => state);

    const entityRef = useRef(null);
    const locationRef = useRef(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        const data = {
            id: new Date().getTime().toString(),
            entity: entityRef.current.value,
            location: locationRef.current.value,
            status1: { title: "in progress", status: 0 },
            status2: { title: "in porgress", status: 0 },
        };
        try {
            await setDoc(doc(db, "entities", data.id), data);
            addEntity(data);
            setOpen(false);
            toast.success("Added successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Sth went wrong, please try again!");
        }
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/50 fixed inset-0" />
                <Dialog.Content className=" fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="text-mauve12 m-0 text-[20px] font-medium">Add entity</Dialog.Title>
                    <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                        Add entities here. Click save when you're done.
                    </Dialog.Description>
                    <form onSubmit={submitHandler} autoComplete="off">
                        <fieldset className="mb-[15px] flex items-center gap-5">
                            <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="name">
                                Entity
                            </label>
                            <input
                                ref={entityRef}
                                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                                id="name"
                                placeholder="Entity name"
                            />
                        </fieldset>
                        <fieldset className="mb-[15px] flex items-center gap-5">
                            <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="username">
                                Location
                            </label>
                            <input
                                ref={locationRef}
                                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                                id="username"
                                placeholder="City name"
                            />
                        </fieldset>
                        <div className="mt-[25px] flex justify-end">
                            <button className="bg-sky-500 w-max py-1 px-3 rounded text-white hover:bg-sky-700">Add entity</button>
                        </div>
                    </form>
                    <Dialog.Close asChild>
                        <button
                            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                            aria-label="Close"
                        >
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default Modal;
