import { request_hash } from "./request_hashmanager";
import { request_files } from "./request_ipfs";

let i = 1

request_hash("date", "2008-01-20 10:00:00", "2030-01-20 10:00:00", async (hashes) => {
    for (let hash of hashes) {
        await request_files(hash, `dummy/${hash}.txt`)
        i+=1
    }
})