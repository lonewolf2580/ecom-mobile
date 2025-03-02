const API_URL = process.env.EXPO_PUBLIC_API_URL

export async function login(email:string, password:string) {
    console.log(`${API_URL}/auth/login`);
    try {
        const response = await fetch(
          `${API_URL}/auth/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
          }
        );
        const json = await response.json();
        console.log(json);
        
        return json;
    } catch (error) {
        console.error(error);
        throw Error('Failed to login')
    }
    
}

export async function signUp(name:string, email:string, password:string) {
    console.log(`${API_URL}/auth/register`);
    try {
        const response = await fetch(
          `${API_URL}/auth/register`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
          }
        );
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        throw Error('Failed to login')
    }
    
}