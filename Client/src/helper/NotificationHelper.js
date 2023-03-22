import { notify } from "notiwind"

export class NotificationHelper{
    static errorhandler(error) {
        notify({
            group: "error",
            title: "error",
            text: error
        }, 2000)
    }
    static notificationhandler(msg) {
        notify({
            group: "success",
            title: "Success",
            text: msg
        }, 2000)
    }
}
