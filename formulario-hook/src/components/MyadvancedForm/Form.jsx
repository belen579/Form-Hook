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

      if (data.mensaje === 'El email ya está registrado') {
        return 'El email ya está registrado en el sistema';
      }

      return true;
    } catch (error) {
      console.error("Error al verificar el email", error);
      return 'Error al verificar el email';
    }
  };

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
              exists: checkEmail,  // Verificación de email
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
