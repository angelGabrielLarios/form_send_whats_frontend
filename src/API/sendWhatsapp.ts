import { IResponseSendWhatsapp } from "./interfaces"
import { urlAPI } from "./url"


export const sendWhatsapp = async (message: string): Promise<IResponseSendWhatsapp> => {
    try {
        const response = await fetch(`${urlAPI}/whatsapp`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message })

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
