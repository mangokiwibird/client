import mqtt from "mqtt"

export function request_hash(key: string, arg1: string, arg2: string | null, callback: (hashes: string[]) => void) {
    const client = mqtt.connect("mqtt://localhost")

    let request_data

    if (arg2 == null) request_data = `${key}/${arg1}`
    else request_data = `${key}/${arg1}/${arg2}`

    client.on("connect", () => {
        console.log("connected to mqtt broker")

        client.subscribe("rne/hashmanager/client/return_data", e => {
            if (e) {
                console.log(e)
            }
        })

        client.publish("rne/client/hashmanager/retrieve_with_filter", request_data)
    })

    client.on("message", (topic, message) => {
        if (topic == "rne/hashmanager/client/return_data") {
            const hashes = message.toString().split("/")
            callback(hashes)
        }
    })
}