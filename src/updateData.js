import { APP_NAME, BASE_URL, HASHES, POKEDEX } from "./Constants";

async function updateData() {
    const cache = await caches.open(APP_NAME);

    const fresh = await requestData(HASHES);
    var cached = await getCachedData(HASHES);
    if (!cached) {
        // first time using the app in this browser, so request all the data
        console.log('Download all data...');
        await cache.add(BASE_URL + HASHES);
        await cache.add(BASE_URL + POKEDEX);

        cached = await getCachedData(HASHES);
    }
    if (fresh.sha512[POKEDEX] != cached.sha512[POKEDEX]) {
        console.log('Updating pokedex...');
        await cache.add(BASE_URL + POKEDEX);
    }
}

async function getCachedData(url) {
    const cache = await caches.open(APP_NAME);
    const cachedResponse = await cache.match(BASE_URL + url);
    if (!cachedResponse || !cachedResponse.ok) {
        return false;
    }
    return await cachedResponse.json();
}

async function requestData(url) {
    const response = await fetch(BASE_URL + url);
    if (!response.ok) {
        // TODO show error
        console.log("ERROR");
    }
    return await response.json();
}

export {updateData, getCachedData};