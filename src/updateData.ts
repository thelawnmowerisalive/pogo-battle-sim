import { APP_NAME, BASE_URL, HASHES, POKEDEX } from "./Constants";

async function updateData() {
    const cache = await caches.open(APP_NAME);

    var hashes = await cache.match(BASE_URL + HASHES);
    if (!hashes) {
        // first time using the app in this browser, so request all the data
        console.log('Download all data...');
        await cache.add(BASE_URL + HASHES);
        await cache.add(BASE_URL + POKEDEX);
    } else {
        // compare with fresh hashes
        const fresh = await requestData(HASHES);
        const old = await hashes.json();
        if (fresh.sha512[POKEDEX] === old.sha512[POKEDEX]) {
            console.log('Pokedex is up-to-date, nothing to do.');
        } else {
            console.log('Updating pokedex...');
            await cache.add(BASE_URL + HASHES);
            await cache.add(BASE_URL + POKEDEX);
        }
    }
}

async function getCachedData(url: string) {
    await updateData();

    const cache = await caches.open(APP_NAME);
    const cachedResponse = await cache.match(BASE_URL + url);
    if (!cachedResponse || !cachedResponse.ok) {
        return false;
    } else {
        return await cachedResponse.json();
    }
}

async function requestData(url: string) {
    const response = await fetch(BASE_URL + url);
    if (!response.ok) {
        // TODO show error
        console.log("ERROR");
    }
    return await response.json();
}

export { getCachedData, updateData };
