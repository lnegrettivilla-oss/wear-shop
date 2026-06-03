const SUPABASE_URL = "https://ywbtyjnfgvrybyuxixsv.supabase.co";
const SUPABASE_KEY = "sb_publishable_ToQc7aO0GkuPQEBaPK1PJA_yJLuaOhy";

async function obtenerProductos() {

    const respuesta = await fetch(
        `${SUPABASE_URL}/rest/v1/products?select=*`,
        {
            headers: {
                apikey: SUPABASE_KEY,
                Authorization: `Bearer ${SUPABASE_KEY}`
            }
        }
    );

    return await respuesta.json();
}
