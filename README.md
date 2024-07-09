# client
client for ipfs

## Explanation
```typescript
async function main() {
    const hashes = await request_cid("date", 4, "2008-01-20 10:00:00", "2030-01-20 10:00:00")

    for (let hash of hashes) {
        await download_from_ipfs(hash, `dummy/${hash}.txt`)
        const metadata = await request_metadata(hash)

        console.log(metadata)
    }
}
```

```typescript
const hashes = request_cid("<key>", "<arg1>", "<arg2?>")
```
`request_cid` 함수는 인수로 받은 값들을 이용해 `hashmanager`에서 필터를 적용해 원하는 해시들의 목록을 받아오는 함수입니다. 

`key`에는 `date`, `status`, `action`이 들어갈 수 있으며, 이것이 필터링의 기준이 됩니다.

- ***date***    :   `arg1`, `arg2`에는 날짜(`YY-MM-DD HH:MM:SS` format)를 인수로 받아 그 사이의 시간에 발생한 파일의 해시들을 불러옵니다
- ***status***  :   `arg1`에 `standing`, `sitting`, `lying` 등 `status` 값에 대응되는 값을 인수로 받아 일치하는 파일의 해시들을 불러옵니다
- ***action***  :   `arg1`에 `kitchen`, `bathroom`, `dining_room` 등 `action` 값에 대응되는 값을 인수로 받아 일치하는 파일의 해시들을 불러옵니다

`request_metadata` 함수는 인수로 받은 `hash` 값을 이용해 `hashmanager`에서 메타데이터를 받아옵니다. 

`download_from_ipfs` 함수는 인수로 받은 `CID` 값을 이용해 IPFS 네트워크에서 파일을 다운로드 받아주는 함수입니다. 