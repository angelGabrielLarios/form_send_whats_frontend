import { IResponseSendWhatsapp } from "./interfaces"
import { urlAPI } from "./url"


export const sendWhatsapp = async (phone: string, message: string): Promise<IResponseSendWhatsapp> => {

    console.log(phone, message)
    try {
        const response = await fetch(`${urlAPI}/whatsapp`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                // Puedes agregar otras cabeceras según sea necesario
            },
            body: JSON.stringify({ phone, message })

        })
        const data = await response.json() as IResponseSendWhatsapp
        return data

    } catch (error) {
        return {
            status: false,
            error
        }
    }

}
