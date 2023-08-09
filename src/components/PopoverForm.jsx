import * as Popover from "@radix-ui/react-popover";
import classNames from "classnames";
import { useRef, useState } from "react";
import { db } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useEntityStore } from "../store/entityStore";

const PopoverForm = ({ id, title, status, stNumber }) => {
    const { updateEntity } = useEntityStore((state) => state);
    const [popIsOpen, setPopIsOpen] = useState(false);
    const text = useRef(null);
    const [st, setSt] = useState(status);
    const [elId, setElId] = useState(null);
    const [statNumber, setStatNumber] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        const value = text.current.value;
        const data = { [`status${statNumber}`]: { title: value, status: st } };

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
                    onClick={() => {
                        setElId(id);
                        setStatNumber(stNumber);
                    }}
                    className={classNames(
                        "p-2 [text-wrap:balance] w-full rounded shadow hover:shadow-md transition-all duration-200 cursor-pointer active:scale-95 text-center",
                        statusStyling(status)
                    )}
                >
                    {title}
                </button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content sideOffset={5} className=" w-[400px] bg-white shadow p-2 rounded-md border border-sky-50">
                    <form onSubmit={submitHandler} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        <textarea
                            defaultValue={title}
                            ref={text}
                            className={classNames(statusStyling(st))}
                            name=""
                            id=""
                            cols="30"
                            rows="5"
                        ></textarea>
                        <select onChange={(e) => setSt(parseInt(e.target.value))}>
                            <option value="0">simple</option>
                            <option value="1">green</option>
                            <option value="2">danger</option>
                            <option value="3">warning</option>
                        </select>
                        <button className="bg-green-500 w-max mx-auto py-1 px-3 rounded text-white hover:bg-green-700">Save</button>
                    </form>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};

export default PopoverForm;

function statusStyling(status) {
    return status === 1
        ? "bg-green-300 text-green-800"
        : status === 2
        ? "bg-red-300 text-red-800"
        : status === 3
        ? "bg-yellow-300 text-yellow-800"
        : "text-sky-600 bg-slate-50";
}
