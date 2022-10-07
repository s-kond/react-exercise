export function addToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage(key, value) {
    try {
    return JSON.parse(localStorage.getItem(key));
} catch (error) {
    console.error(error.message);
}
}