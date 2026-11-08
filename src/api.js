const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'


async function request(path, options = {}) {
    const response = await fetch(`${BASE_URL}${path}`, {headers: { 'Content-Type': 'application/json'}, ...options,
    })


    if (!response.ok) {
       const body = await response.json().catch(() => ({}))
       throw new Error(body.detail || `Request failed: ${response.status}`)

    }


    if (response.status === 204) {
        return null
    }


    return response.json()
}


export function getCocktails(query = '') {
    const search = query ? `?q=${encodeURIComponent(query)}` : ''
    return request(`/cocktails${search}`)
}


export function getCocktail(id) {
    return request(`/cocktails/${id}`)
}


export function createCocktail(payload) {
    return request('/cocktails', { method: 'POST', body: JSON.stringify(payload)})
}


export function updateCocktail(id, payload) {
    return request(`/cocktails/${id}`, { method: 'PUT', body : JSON.stringify(payload) })
}


export function deleteCocktail(id) {
    return request(`/cocktails/${id}`, { method: 'DELETE' })
}


export function getIngredients(kind = '') {
    const search = kind ? `?kind=${kind}` : ''
    return request(`/ingredients${search}`)
}


export function suggestCocktails(ingredients) {
    const params = ingredients
        .map((name) => `available_ingredients=${encodeURIComponent(name)}`)
        .join('&')
    return request(`/suggest?${params}`)
}


export function scaleCocktail(id, servings) {
    return request(`/cocktails/${id}/scale?servings=${servings}`)
}