import { request_cid, request_metadata } from "./network/hashmanager";
import { download_from_ipfs } from "./network/ipfs";

async function main() {
    const hashes = await request_cid("date", 4, "2008-01-20 10:00:00", "2030-01-20 10:00:00")

    for (let hash of hashes) {
        await download_from_ipfs(hash, `dummy/${hash}.txt`)
        const metadata = await request_metadata(hash)

        console.log(metadata)
    }
}

main()