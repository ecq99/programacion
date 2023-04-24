export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
    
    if (input.validity.valid) {
      input.parentElement.classList.remove("input-container--invalid");
      input.parentElement.querySelector(".input-messaje-error").innerHTML = ""
    } else {
      input.parentElement.classList.add("input-container--invalid");
      input.parentElement.querySelector(".input-messaje-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input)
    }
}

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const mensajesDeError = {
  nombre: {
    valueMissing: "El campo nombre no puede estar vacio",
    },
    email: {
      valueMissing: "El campo correo no puede estar vacio",
      typeMismatch: "El correo no es valido",
    },
    password: {
      valueMissing: "El campo contraseña no puede estar vacio",
      patternMismatch: 
        "Mínimo ocho y máximo 10 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial",
    },
    nacimiento: {
      valueMissing: "El campo fecha de nacimiento no puede estar vacio",
      customError: "Debes tener al menos 18 años de edad",
    },
    numero: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formato requerido es XXX XXXXXXX 10 numeros",
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La dirección debe contener entre 10 y 40 caracteres",
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La ciudad debe contener entre 10 y 40 caracteres",
    },
    estado: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El estado debe contener entre 10 y 40 caracteres",
    },
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
  let mensaje = ""
  tipoDeErrores.forEach( error => {
    if(input.validity[error]){
      console.log(tipoDeInput, error);
      console.log(input.validity[error]);
      console.log(mensajesDeError[tipoDeInput][error]);
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  })
  return mensaje
};

function validarNacimiento(input) {
  const fechaCliente = new Date (input.value);
  let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
      mensaje = "Debes tener al menos 18 años de edad";
    }
    
    input.setCustomValidity(mensaje); //Es una funcion que va a recibir un mensaje//
}


function mayorDeEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}



