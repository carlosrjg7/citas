import React, {Fragment, useState, useEffect} from 'react';
import Cita from './components/Cita';
import Formulario from './components/Formulario';

function App() {

  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }

  //arreglo de citas
  const [citas, setCitas] = useState(citasIniciales);

  //use Effect para realizar ciertas operaciones cuando el state cambia
  useEffect(() => {
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    }else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
    /* //eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [citas, citasIniciales])

  //tomar citas y agregar nuevas
  const crearCita = cita =>{
    setCitas([
      ...citas,
      cita
    ])
  }

  //funcion que eliminar una cita por su id
  const eliminarCita = id =>{
    //console.log(id);
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    setCitas(nuevasCitas);

  }

  //mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas'; 

  return (
    <Fragment>
      <h1>Administrador de Citas</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {
              citas.map(cita => (
                <Cita
                  key={cita.id}
                  cita={cita}
                  eliminarCita={eliminarCita}
                />
              ))
            }
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
