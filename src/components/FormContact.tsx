import { useForm, SubmitHandler } from "react-hook-form";
import { sendWhatsapp } from '../API'
import { useRef, useState } from "react";
import { ModalAlert } from ".";


interface IFormInputs {
    firstName: string
    lastName: string
    email: string
    phone: string
    subject: string
    message: string
}

export const FormContact = () => {


    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>()

    const [isLoading, setIsLoading] = useState(false)

    const modalRef = useRef<HTMLDialogElement>(null)

    const [messageModalRef, setMessageModalRef] = useState(``)

    const [typeModalRef, settypeModalRef] = useState(``)

    const onSubmit: SubmitHandler<IFormInputs> = async (data: IFormInputs) => {

        setIsLoading(true)
        try {
            const message: string = `
            Nombre(s): ${data.firstName}
            Apellido(s): ${data.lastName}
            Correo Electrónico: ${data.lastName}
            Teléfono: ${data.phone}
            Asunto del mensaje: ${data.subject}
            Mensage: ${data.message}
            `
            const res = await sendWhatsapp(data.phone, message)

            console.log(res)
            if (res.status) {
                settypeModalRef(`success`)
                setMessageModalRef(`Se envio correctamente su informacion`)
                modalRef.current?.showModal()
                return
            }

        } catch (error) {
            console.error(error)
            settypeModalRef(`error`)
            setMessageModalRef(`No pudo enviar su información`)
            modalRef.current?.showModal()
        }
        finally {
            setIsLoading(false)
        }
    }


    return (
        <>
            <form
                className="p-6 shadow shadow-base-300 rounded-md bg-base-200"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1
                    className="text-primary font-bold text-4xl mb-6 text-center"
                >
                    Contacto
                </h1>

                <div className="space-y-2">
                    <input
                        disabled={isLoading}
                        type="text"
                        placeholder="Nombre(s):"
                        className="input input-bordered w-full bg-inherit text-xs lg:text-sm placeholder:text-xs placeholder:lg:text-sm" {...register('firstName', {
                            required: {
                                value: true,
                                message: 'Este campo es obligatorio'
                            }
                        })} />

                    <input
                        disabled={isLoading}
                        type="text"
                        placeholder="Apellido(s):"
                        className="input input-bordered w-full bg-inherit text-xs lg:text-sm placeholder:text-xs placeholder:lg:text-sm" {...register('lastName', {
                            required: {
                                value: true,
                                message: 'Este campo es obligatorio'
                            }
                        })} />

                    {
                        errors?.firstName?.type === 'required'
                            ?
                            <p
                                className="text-error text-xs flex items-center gap-2 justify-end"
                            >
                                {errors?.firstName?.message} <svg className="stroke-error" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 16H12.01M12 8V12M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            </p>
                            : null
                    }

                    <input
                        disabled={isLoading}
                        type="email"
                        placeholder="Correo Electrónico:"
                        className="input input-bordered w-full bg-inherit text-xs lg:text-sm placeholder:text-xs placeholder:lg:text-sm" {...register('email', {
                            required: {
                                value: true,
                                message: 'Este campo es obligatorio'
                            }
                        })} />

                    {
                        errors?.email?.type === 'required'
                            ?
                            <p
                                className="text-error text-xs flex items-center gap-2 justify-end"
                            >
                                {errors?.email?.message} <svg className="stroke-error" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 16H12.01M12 8V12M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            </p>
                            : null
                    }

                    <input
                        disabled={isLoading}
                        type="tel"
                        placeholder="Número de Teléfono:"
                        className="input input-bordered w-full bg-inherit text-xs lg:text-sm placeholder:text-xs placeholder:lg:text-sm" {...register('phone', {
                            required: {
                                value: true,
                                message: 'Este campo es obligatorio'
                            }
                        })} />

                    {
                        errors?.phone?.type === 'required'
                            ?
                            <p
                                className="text-error text-xs flex items-center gap-2 justify-end"
                            >
                                {errors?.phone?.message} <svg className="stroke-error" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 16H12.01M12 8V12M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            </p>
                            : null
                    }



                    <select
                        disabled={isLoading}
                        className="select select-bordered w-full bg-base-20 text-xs lg:text-sm" {...register('subject', {
                            required: {
                                value: true,
                                message: 'Este campo es obligatorio'
                            }
                        })}
                        defaultValue={""}
                    >
                        <option className="bg-inherit" value={""}>Asunto del mensaje</option>
                        <option className="bg-inherit" value={"asunto_1"}>Asunto 1</option>
                        <option className="bg-inherit" value={"asunto_2"}>Asunto 2</option>
                    </select>



                    {
                        errors?.subject?.type === 'required'
                            ?
                            <p
                                className="text-error text-xs flex items-center gap-2 justify-end"
                            >
                                {errors?.subject?.message} <svg className="stroke-error" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 16H12.01M12 8V12M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            </p>
                            : null
                    }

                    <textarea
                        disabled={isLoading}
                        className="textarea textarea-bordered w-full bg-inherit text-xs lg:text-sm"
                        placeholder="Mensaje:" {...register('message', {
                            required: {
                                value: true,
                                message: 'Este campo es obligatorio'
                            }
                        })}></textarea>

                    {
                        errors?.message?.type === 'required'
                            ?
                            <p
                                className="text-error text-xs flex items-center gap-2 justify-end"
                            >
                                {errors?.message?.message} <svg className="stroke-error" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 16H12.01M12 8V12M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            </p>
                            : null
                    }

                    <button
                        disabled={isLoading}
                        type="submit"
                        className="btn btn-primary w-full">
                        <div className="flex items-center gap-2">
                            Enviar mensaje <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z" fill="#131616"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z" fill="#131616"></path> </g></svg>
                            {isLoading ? <span className="loading loading-dots loading-xs"></span> : null}
                        </div>
                    </button>
                </div>
            </form>

            <ModalAlert
                message={messageModalRef}
                modalRef={modalRef}
                type={typeModalRef}
            />
        </>
    )
}
