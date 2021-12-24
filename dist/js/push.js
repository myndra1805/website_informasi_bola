const webPush = require("web-push")

const vapidKeys = {
    "publicKey":"BDtsubp4Y2GLpm-INfHP5Ij35QzAtQOeOCc_GhlfnrGzBbj4Z7MHl_JzKkjQR24ELIbW8cUsZsglcfzgH0K2zjU","privateKey":"t4eBEiMjeZYXya8syj4b4-WMJXhs-stX6rpokhTQaVo"
}

webPush.setVapidDetails(
    "mailto:ariyuhendra99@gmail.com",
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dibSybDvZmM:APA91bHcPHjcH4vuBXM_9Tf79B87hWSeoIQOK6CEj_KFVSWP79EtURDLCm4HQC9CaOe0AP7ebOwFfKWZs3hw8OvZtDYx7JMxnztb4ofwGFV_Vh2RMjqqsI6Jdj3zudHkVCVN4a9q2hI4",
    "keys": {
        "p256dh": "BBCc4pSe3IvtalXPBqwRsusyQT+4QFdcXwV+JCqaDx4XR083ai1+J8IEQ9F08qQtTO3OiyGp098jMtSORkWhGI4=",
        "auth": "9Kj8bfHJDnTvy9aLDKa1VQ=="
    }
}

const payload = "Submission2 PWA Aplikasi Informasi Premier League"

const options = {
    gcmAPIKey: "306267464761",
    TTL: 60
}

webPush.sendNotification(
    pushSubscription,
    payload,
    options
)