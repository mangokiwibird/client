import mqtt from "mqtt"

// requests hash with the given filter from the hashmanager
export function request_cid(key: string, arg1: string, arg2: string | null): Promise<string[]> {
    return new Promise((resolve, reject) => {
        const client = mqtt.connect("mqtt://localhost")

        let request_data

        if (arg2 == null) request_data = `${key}/${arg1}`
        else request_data = `${key}/${arg1}/${arg2}`

        client.on("connect", () => {
            console.log("connected to mqtt broker")

            client.subscribe("rne/hashmanager/client/return_data", e => {
                if (e) {
                    console.log("reject")
                    reject(e)
                }
            })

            client.publish("rne/client/hashmanager/retrieve_with_filter", request_data)
        })

        client.on("message", (topic, message) => {
            if (topic == "rne/hashmanager/client/return_data") {
                const hashes = message.toString().split("/")
                resolve(hashes)
            }
        })
    })
}