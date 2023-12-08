import { MutableRefObject } from 'react'


interface Props {
    message: string
    modalRef: MutableRefObject<HTMLDialogElement | null>;

    type: string
}
export const ModalAlert = ({ message, modalRef, type }: Props) => {




    return <>

        <dialog
            ref={modalRef}
            className="modal"
        >
            <div className="modal-box">
                <form method="dialog">

                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className={`font-bold text-lg ${type === "error" ? 'text-error' : 'text-success'}`}>{message}</h3>

            </div>
        </dialog>
    </>
}
