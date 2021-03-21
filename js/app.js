

const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () =>{
  formulario.addEventListener('submit', buscarClima);
});


function buscarClima(e) {
  e.preventDefault();

  //validar, debo pedir la informacion de la manera correcta
  const ciudad = document.querySelector('#ciudad').value;
  const pais = document.querySelector('#pais').value;

  if(ciudad === '' || pais === ''){
    mostrarError('Ambos campos son obligatorios');
    return; 
  }
  //consultar la api

  consultarApi(ciudad,pais);

}

function mostrarError(mensaje){

  const viejaAlerta = document.querySelector('.alerta');

  if(viejaAlerta){
    viejaAlerta.remove();
  }
  
  const alerta = document.createElement('DIV');
  alerta.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded','max-w-md','mx-auto','mt-6','text-center','alerta');

  alerta.innerHTML = 
  `
  <strong class="font-bold">Error</strong>
  <span class="block">${mensaje}</span>
  ` 
  container.appendChild(alerta);

  setTimeout(() => {
    alerta.remove();
  }, 2000);

}


function consultarApi(ciudad,pais){

  const apiId = '07d5a858512d60703323205c3c6e86dc';

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiId}`;

  spinner();

  fetch(url)
    .then(respuesta => respuesta.json() ) 
    .then(datos => {
      limpiarHTML();
      // console.log(datos);
      if(datos.cod === "404"){  //el promise se cumple por lo que nunca cae en catch, si busco algo inexistente me traera 404 en string
        mostrarError('Ciudad no encontrada');
      }

      //mostrar html
      mostrarClima(datos);

    }
    ) 

}


function mostrarClima(datos){
    const { name, main:{temp,temp_max,temp_min} } = datos ; 

    const centigrados = kelvinACentigrados(temp);
    const maximo = kelvinACentigrados(temp_max);
    const minimo = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement('P');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold','text-2xl')

    const actual = document.createElement('P');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold','text-6xl');

    const temperaturaMaxima = document.createElement('P');
    temperaturaMaxima.innerHTML = `MAXIMA : ${maximo} &#8451;`;
    temperaturaMaxima.classList.add('text-xl');


    const temperaturaMinima = document.createElement('P');
    temperaturaMinima.innerHTML = `MINIMA : ${minimo} &#8451;`;
    temperaturaMaxima.classList.add('text-xl');
    
    const resultadoDiv = document.createElement('DIV');
    resultadoDiv.classList.add('text-center','text-white');
    resultadoDiv.append(nombreCiudad);
    resultadoDiv.append(actual);
    resultadoDiv.append(temperaturaMaxima);
    resultadoDiv.append(temperaturaMinima);

    resultado.appendChild(resultadoDiv);


}

const kelvinACentigrados = grados => { return parseInt(grados - 273.15); }

function limpiarHTML(){

  while(resultado.firstChild){
    resultado.removeChild(resultado.firstChild);
  }

}

function spinner(){

  limpiarHTML();

  const divSpinner = document.createElement('DIV');
  divSpinner.classList.add('sk-fading-circle');

  divSpinner.innerHTML = `
  <div class="sk-circle1 sk-circle"></div>
  <div class="sk-circle2 sk-circle"></div>
  <div class="sk-circle3 sk-circle"></div>
  <div class="sk-circle4 sk-circle"></div>
  <div class="sk-circle5 sk-circle"></div>
  <div class="sk-circle6 sk-circle"></div>
  <div class="sk-circle7 sk-circle"></div>
  <div class="sk-circle8 sk-circle"></div>
  <div class="sk-circle9 sk-circle"></div>
  <div class="sk-circle10 sk-circle"></div>
  <div class="sk-circle11 sk-circle"></div>
  <div class="sk-circle12 sk-circle"></div>
  `

  resultado.appendChild(divSpinner);

}