import TelegramMessage from "./TelegramMessage";
import TelgramMessage from "./TelegramMessage";

export default interface Telegramjson {
    "_": string,
    "inexact": boolean,
    "pts": number,
    "count": number,
    "messages": Array<TelegramMessage>,
    "topics"?: any,
    "chats": Array<any>,
    "users": Array<any>,
    "sponsored_messages"?: Array<any>,
}