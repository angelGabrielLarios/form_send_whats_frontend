import { MessageInstance } from "twilio/lib/rest/api/v2010/account/message";

export interface IResponseSendWhatsapp {
    data?: MessageInstance
    error?: any
    status: boolean
}