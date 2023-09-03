import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronRightIcon, DotFilledIcon } from "@radix-ui/react-icons";
import React from "react";
import { useNavigate } from "react-router-dom";

const DropdownMenuDemo = () => {
    // const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
    // const [urlsChecked, setUrlsChecked] = React.useState(false);
    const [person, setPerson] = React.useState("active");

    const navigate = useNavigate();

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className="border px-4 py-1 rounded bg-white text-sm hover:bg-gray-50" aria-label="Customise options">
                    Menu
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="min-w-[220px] mr-3 bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                    sideOffset={5}
                >
                    {/* projects sub menu */}
                    <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-100 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:bg-gray-100 data-[highlighted]:data-[state=open]:text-violet1">
                            Projects
                            <div className="ml-auto pl-[20px] text-slate-500 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                                <ChevronRightIcon />
                            </div>
                        </DropdownMenu.SubTrigger>

                        {/* submenu */}
                        <DropdownMenu.Portal>
                            <DropdownMenu.SubContent
                                className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                                sideOffset={2}
                                alignOffset={-5}
                            >
                                <DropdownMenu.Label className="pl-[25px] text-xs leading-[25px] text-slate-500">Projects</DropdownMenu.Label>

                                <DropdownMenu.RadioGroup value={person} onValueChange={setPerson}>
                                    <DropdownMenu.RadioItem
                                        className="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-100 data-[highlighted]:text-violet1"
                                        value="active"
                                    >
                                        <DropdownMenu.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                                            <DotFilledIcon />
                                        </DropdownMenu.ItemIndicator>
                                        Active
                                    </DropdownMenu.RadioItem>
                                    <DropdownMenu.RadioItem
                                        className="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-100 data-[highlighted]:text-violet1"
                                        value="archive"
                                    >
                                        <DropdownMenu.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                                            <DotFilledIcon />
                                        </DropdownMenu.ItemIndicator>
                                        Archived
                                    </DropdownMenu.RadioItem>
                                </DropdownMenu.RadioGroup>
                            </DropdownMenu.SubContent>
                        </DropdownMenu.Portal>
                    </DropdownMenu.Sub>

                    <DropdownMenu.Separator className="h-[1px] bg-gray-100 m-[5px]" />

                    {/* logout */}
                    <DropdownMenu.Item
                        onClick={() => {
                            localStorage.clear();
                            navigate("/login");
                        }}
                        className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-100 data-[highlighted]:text-violet1"
                    >
                        Log out
                        <div className="ml-auto pl-[20px] text-slate-500 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">⌘+T</div>
                    </DropdownMenu.Item>

                    <DropdownMenu.Arrow className="fill-white" />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default DropdownMenuDemo;
