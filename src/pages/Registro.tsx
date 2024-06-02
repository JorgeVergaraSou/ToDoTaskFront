import React, { useState } from 'react'

export const Registro: React.FC = () => {
  // const { status } = useSession();
  const [errors, setErrors] = useState<string[]>([])
  const [message, setMessage] = useState<string[]>([])
  const [name, setName] = useState<string>('test')
  const [email, setEmail] = useState<string>('test@test.com')
  const [password, setPassword] = useState<string>('123123')
  // const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrors([])

    const responseRegister = await fetch(
      `http://localhost:3006/api/v1/auth/register`,
      // `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      }
    )

    const responseAPI = await responseRegister.json()

    if (!responseRegister.ok) {
      // Verificar si responseAPI.message es un string
      console.log(responseAPI.message)
      if (typeof responseAPI.message === 'string') {
        setMessage(responseAPI.message.split(','))
      } else if (Array.isArray(responseAPI.message)) {
        // Si responseAPI.message es un array, asumimos que ya contiene mensajes separados
        setMessage(responseAPI.message)
      } else {
        // Si responseAPI.message es un objeto, tratamos de obtener sus valores
        setMessage(Object.values(responseAPI.message))
      }
      return
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
  }

  return (
    <>
      <h1>Registrarse</h1>
      <div className='centradito'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='test'
            name='name'
            className='form-control mb-2'
            value={name}
            onChange={event => setName(event.target.value)}
          />
          <input
            type='email'
            placeholder='test@test.com'
            name='email'
            className='form-control mb-2'
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <input
            type='password'
            placeholder='123123'
            name='password'
            className='form-control mb-2'
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <button type='submit' className='btn btn-primary'>
            únete
          </button>
        </form>
      </div>

      {message.length > 0 && (
        <div className='alert alert-danger mt-2'>
          <ul className='mb-0'>
            {message.map(msg => (
              <li key={msg}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      {errors.length > 0 && (
        <div className='alert alert-danger mt-2'>
          <ul className='mb-0'>
            {errors.map(error => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
