const API_URL = process.env.EXPO_PUBLIC_API_URL

export async function listProducts() {
    console.log(`${API_URL}/products`);
    try {
        const response = await fetch(
          `${API_URL}/products`,
        );
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchProductById(id: number) {
    console.log(`${API_URL}/products/${id}`);
    try {
        const response = await fetch(
          `${API_URL}/products/${id}`,
        );
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}