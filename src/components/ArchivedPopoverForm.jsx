import * as Popover from "@radix-ui/react-popover";
import { useRef, useState } from "react";
import { db } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useEntityStore } from "../store/entityStore";

const ArchivedPopoverForm = ({ id, title }) => {
    const { updateEntity } = useEntityStore((state) => state);
    const [popIsOpen, setPopIsOpen] = useState(false);
    const text = useRef(null);
    const [elId, setElId] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        const value = text.current.value;
        const data = { archived: value };

        try {
            const upDocRef = doc(db, "entities", elId);
            await updateDoc(upDocRef, { ...data });
            updateEntity(id, data);
            setPopIsOpen(false);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Popover.Root open={popIsOpen} onOpenChange={setPopIsOpen}>
            <Popover.Trigger asChild>
                <button
                    onClick={() => setElId(id)}
                    className="p-2 [text-wrap:balance] text-sky-600 bg-slate-50 w-full rounded shadow hover:shadow-md transition-all duration-200 cursor-pointer active:scale-95 text-center"
                >
                    {title}
                </button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content sideOffset={5} className=" w-[400px] bg-white shadow p-2 rounded-md border border-sky-50">
                    <form onSubmit={submitHandler} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        <input ref={text} type="text" defaultValue={title} />
                        <button className="bg-green-500 w-max mx-auto py-1 px-3 rounded text-white hover:bg-green-700">Save</button>
                    </form>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};

export default ArchivedPopoverForm;
