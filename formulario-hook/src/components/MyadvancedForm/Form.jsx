import React from "react";
import { useForm } from "react-hook-form";

const Form = () => {
  const { register, handleSubmit, formState, watch, setValue, reset } = useForm();

  // Función que se llama al enviar el formulario
  const onSubmitHandler = (formData) => {
    setValue("formCode", "landing004");
    setTimeout(() => {
      console.log("FORMDATA", formData);
    }, 2000);
  };

  // Función para verificar si el email ya está registrado
  const checkEmail = async (email) => {
    try {
      const response = await fetch('http://localhost:3000/validar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Indicamos que estamos enviando un JSON
        },
        body: JSON.stringify({ email }),  // Enviamos el email dentro de un objeto
      });

      const data = await response.json();
      if (response.status === 409) {
        return data.mensaje;
      }

      return true;
    } catch (error) {
      console.error("Error al verificar el email", error);
      return 'Error al verificar el email';
    }
  };

  // Esta función establece un timeout de 500 milisegundos para verificar el email
  // Cuando el usuario escribe algo, se reinicia el timeout, de forma que no mandamos
  // una petición por cada letra que escribe el usuario
  let validationTimeout;
  const emailValidation = (email) => {
    return new Promise((resolve) => {
        clearTimeout(validationTimeout);
        validationTimeout = setTimeout(async () => {
            const result = await checkEmail(email);
            resolve(result);
        }, 500);
        }
    );

  }

  const handleReset = () => {
    reset();
  };

  return (
    <div>
      <h1>Formulario REACT-HOOK-FORM</h1>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <input type="text" {...register("nombre")} placeholder="nombre" />
        <br />
        <input type="text" {...register("Apellido")} placeholder="Apellido" />
        <br />
        <input
          type="text"
          {...register("Email", {
            required: {
              value: true,
              message: "Debes introducir un email",
            },
            validate: {
              length: (value) => {
                if (value.length < 2) {
                  return "El email no puede ser menor de 2 caracteres";
                }
                return true;
              },
              exists: emailValidation,  // Verificación de email
            },
          })}
          placeholder="Email"
        />
        <br />
        {formState.errors.Email && (
            <span className="error-text">{formState.errors.Email.message}</span>
          )}
        <input type="text" {...register("Constraseña")} placeholder="Constraseña" />
        <br />
        <input type="text" {...register("Pokemon")} placeholder="Pokemon" />
        <br />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Form;
