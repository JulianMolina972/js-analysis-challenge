const $ = (id) => document.getElementById(id)

const inputIngresos = $('ingresos')
const inputGastos = $('gastos')
const button = $('button')
const endeudamiento = $('endeudamiento')
const ahorros = $('ahorros')
const inversion = $('inversion')
const mesanjeError = $('error-datos')

button.addEventListener('click', calcular)

function calcular(event) {
  const cantidadMeses = 12;
  let ingresos = inputIngresos.value * 1
  let gastos = inputGastos.value * 1

  if (ingresos > 999999999 || gastos > 999999999) {
    mesanjeError.innerHTML = 'Exediste el límite de ingresos o gastos';
    borrarDatos();
    return
  }
  if (gastos < 0 || ingresos < 0){
    mesanjeError.innerHTML = 'Por favor, ingrese valores positivos';
    borrarDatos();
    return
  }

  if (!ingresos || !gastos ){
    mesanjeError.innerHTML = 'Por favor, ingrese valores de sus ingresos y gastos';
    return
  }

  if (gastos > ingresos ){
    mesanjeError.innerHTML = 'Tus gastos son mayores que tus ingresos, no se pueden calcular los datos';
    borrarDatos()
    return;
  } else {
    mesanjeError.innerHTML = '';
    const capEndeu = capacidadEndeudamiento(ingresos, gastos)

    endeudamiento.innerHTML = '$' + (capEndeu).toFixed(2)
    
    const capAhorro = capacidadAhorro(ingresos, gastos)
    ahorros.innerHTML = '$' + (capAhorro).toFixed(2)

    const interesCompuesto = interesCompuestoAhorros(capAhorro, cantidadMeses)
    inversion.innerHTML = '$' + (interesCompuesto).toFixed(2) 
  }
}

function capacidadEndeudamiento(ingreso, gasto) { 
  const formulaEndeudamiento = (ingreso - gasto) * 0.35
  return formulaEndeudamiento ;
}

function capacidadAhorro(ingreso, gasto) {
  const formulaAhorro = (ingreso - gasto) * 0.1
  return formulaAhorro;

}

function interesCompuestoAhorros(ahorro, meses) {
  const formulaInteres = meses * ahorro * Math.pow((1 + 0.1), (meses/12))
  return formulaInteres;
}

function borrarDatos() {
  inputGastos.value = null;
  inputIngresos.value = null;
  endeudamiento.innerHTML = '';
  ahorros.innerHTML = '';
  inversion.innerHTML = '';
}