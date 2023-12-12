import { useRef, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { TypeAlert } from "../components/interfaces"
import { sendWhatsapp } from "../API"

interface IFormInputs {
    firstName: string
    lastName: string
    email: string
    phone: string
    subject: string
    message: string
}

export const useFormContact = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInputs>()

    const [isLoading, setIsLoading] = useState(false)

    const modalRef = useRef<HTMLDialogElement>(null)

    const [messageModalRef, setMessageModalRef] = useState(``)

    const [typeModalRef, settypeModalRef] = useState<TypeAlert>(TypeAlert.succes)

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
            const res = await sendWhatsapp(message)

            console.log(res)
            if (res.status) {
                settypeModalRef(TypeAlert.succes)
                setMessageModalRef(`Se envio correctamente su informacion`)
                modalRef.current?.showModal()
                reset()
                return
            }

        } catch (error) {
            console.error(error)
            settypeModalRef(TypeAlert.error)
            setMessageModalRef(`Hubo un error`)
            modalRef.current?.showModal()
        }
        finally {
            setIsLoading(false)

        }

    }

    return {
        register,
        errors,
        isLoading,
        modalRef,
        messageModalRef,
        typeModalRef,
        handleSubmit,
        onSubmit
    }



}