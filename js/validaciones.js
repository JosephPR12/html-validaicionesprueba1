// const inputNacimiento = document.querySelector("#birth");

// inputNacimiento.addEventListener("blur",(evento) =>{
//     validarNacimiento(evento.target);
// });

export function valida(input){
    const tipoDeInput = input.dataset.tipo; 
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    };

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container-invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container-invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacio"
    },
    email: {
        valueMissing: "El campo email no puede estar vacio",
        typeMismatch: "El correo no es válido"
    },
    password: {
        valueMissing: "El campo password no puede estar vacio",
        patternMismatch: "Al menos 8 caracteres, debe contener una letra minuscula o mayuscula, un caracter especial, un numero"
    },
    nacimiento: {
        valueMissing: "El campo nacimiento no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad"
    },
    numero: {
        valueMissing: "El campo teléfono no puede estar vacio",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 números"
    },
    direccion: {
        valueMissing: "El campo no puede estar vacio",
        patternMismatch: "El formato requerido debe contener entre 10 a 40 caracteres"
    },
    ciudad: {
        valueMissing: "El campo no puede estar vacio",
        patternMismatch: "El formato requerido debe contener entre 10 a 40 caracteres"
    },
    estado: {
        valueMissing: "El campo no puede estar vacio",
        patternMismatch: "El formato requerido debe contener entre 10 a 40 caracteres"
    }
}

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
}

function mostrarMensajeError(tipoDeInput, input){
    let mensaje = ""
    tipoDeErrores.forEach(error => {
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            mensaje = mensajeError[tipoDeInput][error];
        }  
    })
    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if(!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad";
    }
    input.setCustomValidity(mensaje);
};

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}