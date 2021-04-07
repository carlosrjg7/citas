import React,{Fragment, useState } from 'react'
import uuid from 'uuid/dist/v4'
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    // Crear State de citas
    const [cita, setCita ] = useState({
        mascota: '',
        propietario: '',
        date: '',
        Hora: '',
        sintomas: '',
    });

    const [error, setError] = useState(false);

    //Funcion que se ejecuta cada que el usuario escribe en un input
    const handleChange = (e) =>{
        setCita({
            ...cita,
            [e.target.name] : e.target.value
        })
    }

    //Extraer valores
    const {mascota, propietario, date, Hora, sintomas} = cita;

    const submitCita = e => {
        e.preventDefault();

        //validar
        if(!mascota.trim() || !propietario.trim() ||  !date.trim() || !Hora.trim() || !sintomas.trim() ){
            //esta vacio
            console.log('Hay un error');
            setError(true);
            return;
        }

        //eliminar msj de error
        setError(false);

        //asignar id
        cita.id = uuid();

        //crear cita
        crearCita(cita);

        //reiniciar el form
        setCita({
            mascota: '',
            propietario: '',
            date: '',
            Hora: '',
            sintomas: '',
        })
    }

    return (
        <Fragment>
            <h2>Crear Cita</h2>
            {
                error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null
            }
            <form onSubmit={ submitCita }>
                <label htmlFor="">Nombre Mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre mascota"
                    onChange={ handleChange }
                    value={mascota}
                />
                <label htmlFor="">Nombre del dueño</label>
                <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre del dueño de la mascota"
                    onChange={ handleChange }
                    value={propietario}
                />
                <label htmlFor="">Fecha</label>
                <input 
                    type="date"
                    name="date"
                    className="u-full-width"
                    onChange={ handleChange }
                    value={date}
                />
                <label htmlFor="">Hora</label>
                <input 
                    type="time"
                    name="Hora"
                    className="u-full-width"
                    onChange={ handleChange }
                    value={Hora}
                />
                <label htmlFor="">Síntomas</label>
                <textarea 
                    name="sintomas" 
                    id="" 
                    className="u-full-width"
                    onChange={ handleChange }
                    value={sintomas}
                >
                </textarea>
                <button 
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar cita</button>
            </form>
        </Fragment>
    )
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario
