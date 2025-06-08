import type { GraphData } from "../../types";
import { Dialog, Description } from "@headlessui/react";
import { XIcon } from "lucide-react";

interface Props {
    modalData: GraphData | null;
    onSetModalData: (val: null) => unknown;
}

const Modal = ({ modalData, onSetModalData }: Props) => {
    return (
        <Dialog
            open={!!modalData}
            onClose={() => onSetModalData(null)}
            className="fixed inset-0 z-10 flex items-center justify-center"
        >
            <div
                className="fixed inset-0 bg-black opacity-30"
                aria-hidden="true"
            />
            <div className="bg-neutral-800 max-w-md w-full max-h-[50vh] overflow-y-auto rounded p-4 z-20 relative">
                <Description>
                    <div className="mb-5 text-lg">{modalData?.name}</div>
                    {!!modalData &&
                        (modalData?.users || []).map((user) => (
                            <div
                                key={user.id}
                                className="text-sm flex justify-between"
                            >
                                <div>
                                    {user.first_name} {user.last_name}
                                </div>
                                <div className="text-xs">
                                    {user.language || "N/A"}
                                </div>
                            </div>
                        ))}
                </Description>
                <button
                    onClick={() => onSetModalData(null)}
                    className="absolute top-2 right-2 px-2 py-1"
                >
                    <XIcon />
                </button>
            </div>
        </Dialog>
    );
};

export default Modal;
