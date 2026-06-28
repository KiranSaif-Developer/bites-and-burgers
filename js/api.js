export const BASE_URL = "http://localhost:3001";

async function request(path, options = {}) {
    const res = await fetch(`${BASE_URL}${path}`, {
        headers: { "Content-Type": "application/json" },
        ...options,
    });
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    return res.json();
}

export const burgersApi = {
    getAll: () => request("/burgers")
};