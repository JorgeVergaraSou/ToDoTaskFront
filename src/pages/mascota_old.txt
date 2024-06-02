import React, { useState } from 'react'

export const CrearMascota: React.FC = () => {

  const [errors,  setErrors] = useState<string[]>([]);  
  const [message, setMessage] = useState<string[]>([]);
  //const [loading, setLoading] = useState(true);
  //const [error, setError] = useState<string | null>(null);
  const [namePets, setNamePets] = useState<string>("");
  const [pet, setPets] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");

 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const responseNewPet = await fetch(`http://localhost:3006/api/v1/pets`,
     // `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          namePets,
          pet,
          age,
          description,
          image,
        }),
      }
    );

    const responseAPI = await responseNewPet.json();

    if (!responseNewPet.ok) {
      // Verificar si responseAPI.message es un string
      console.log(responseAPI.message);
      if (typeof responseAPI.message === 'string') {
        setMessage(responseAPI.message.split(","));
      } else if (Array.isArray(responseAPI.message)) {
        // Si responseAPI.message es un array, asumimos que ya contiene mensajes separados
        setMessage(responseAPI.message);
      } else {
        // Si responseAPI.message es un objeto, tratamos de obtener sus valores
        setMessage(Object.values(responseAPI.message));
      }
      return;
    }
    /*
    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      return;
    }

    if (status === "loading") {
      return <div className="loader-container"><div className="loader"></div> <div className="loader2"></div></div>;
    }

    router.push("/dashboard");
    */
  };

  return (
    <>
<h2>Agregar mascota</h2>
<form onSubmit={handleSubmit}>
Nombre de tú mascota
         <input
           type="text"
           placeholder=""
           name="namePets"
           className="form-control mb-2"
           value={namePets}
           onChange={(event) => setNamePets(event.target.value)}
         />

<span>Tipo de mascota</span>
                <select className="form-select" onChange={(event) => setPets(event.target.value)}>
                    <option value={0}>
                        SELECCIONE OPCIÓN
                    </option>
                    <option value={1}>
                        GATO
                    </option>
                    <option value={2}>
                        PERRO
                    </option>
                    <option value={3}>
                        AVE
                    </option>
                </select>
Edad
         <input
           type="number"
           placeholder=""
           name="age"
           className="form-control mb-2"
           value={age}
           onChange={(event) => setAge(event.target.value)}
         />
         Descripción
          <textarea
                    placeholder=""
                    name="content"
                    className="form-control mb-2"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
Fotito de tu amigo de 4 patas
<div className="mb-3">
  <label htmlFor="formFile" >Default file input example</label>
  <input className="form-control" type="file" id="formFile" />
</div>

         <button
           type="submit"
           className="btn btn-primary"
         >
           crear mascota
         </button>
       </form>

       {message.length > 0 && (
         <div className="alert alert-danger mt-2">
           <ul className="mb-0">
             {message.map((msg) => (
               <li key={msg}>{msg}</li>
             ))}
           </ul>
         </div>
       )}
 
       {errors.length > 0 && (
         <div className="alert alert-danger mt-2">
           <ul className="mb-0">
             {errors.map((error) => (
               <li key={error}>{error}</li>
             ))}
           </ul>
         </div>
       )}

    </>
  )
}
