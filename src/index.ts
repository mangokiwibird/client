import { request_cid } from "./network/hashmanager";
import { download_from_ipfs } from "./network/ipfs";

async function main() {
    const hashes = await request_cid("date", "2008-01-20 10:00:00", "2030-01-20 10:00:00")

    for (let hash of hashes) {
        console.log(`DOWNLOADING FROM IPFS: ${hash}`)
        await download_from_ipfs(hash, `dummy/${hash}.txt`)
        console.log(`FINISHED DOWNLOADING: ${hash}`)
    }
}

main()