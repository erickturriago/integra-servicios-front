const ENDPOINT=`${import.meta.env.VITE_API_URL}/auth/register`

export function registrarUsuario (data) {

  const hoy = new Date();

  // Obtener el año, mes y día
  const año = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Los meses son indexados desde 0
  const dia = String(hoy.getDate()).padStart(2, '0');

  // Formatear la fecha en el formato YYYY-MM-DD
  const fechaHoy = `${año}-${mes}-${dia}`;

  const dataCompleta = {...data,fechaRegistro:fechaHoy,rol:'2'}

  console.log(JSON.stringify(dataCompleta))
  const token = localStorage.getItem('token');

  return (
    fetch(`${ENDPOINT}`, { method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `${token}`
        },
        body: JSON.stringify(dataCompleta)
    })
        .then(async res => {
            const responseData = await res.json()
            console.log(responseData)
            if (!res.ok) {
                throw new Error(responseData.message || responseData.mensaje)
            }
            return { succes: true, responseData }
        }).catch(error => {
            return { succes: false, error: error.message }
        })
  )
}