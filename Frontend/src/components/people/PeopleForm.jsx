import React, { useState} from 'react';
import {usePeople} from '../../Context/PeopleContext';
import '../../components/people/people.css';


const PeopleForm= () =>{
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    
    const {settingPeople}= usePeople();// viene del context
    
    const handleChangeNombre= (event)=> {
        setNombre(event.target.value)
     }

     const handleChangeApellido= (event)=> {
        setApellido(event.target.value)
     }

     const handleChangeNickname= (event)=> {
        setNickname(event.target.value)
     }

     const handleChangeEmail= (event)=> {
        setEmail(event.target.value)
     }

     const handleOnclick= async()=>{
        const person ={
            nombre: nombre,
            apellido: apellido,
            alias: nickname,
            email: email
        }
        try {
            settingPeople(person);
            setNombre('');
            setApellido('');
            setNickname('');
            setEmail('');
            console.log('Se agrego la persona correctamente')
        }
        catch (error) {
          console.log(error)
        }
     };

     return(
        <>
        <h2>Registrar nueva persona</h2>
        <p>Descripción de como se debería cargar y como lo guarda en la base de datos</p>
        <div className='people-form'>
            <label>
                Nombre
            </label>
            <input 
                value={nombre}
                type="text" 
                placeholder="Ej: Juan" 
                name="nombre"
                onChange={handleChangeNombre}
            />
            <label>
                Apellido
            </label>
            <input
                value={apellido}
                type="text"
                placeholder="Ej: Perez"
                name="apellido"
                onChange={handleChangeApellido}
            />
            <label>
                Apodo
            </label>
            <input 
                value={nickname} 
                type="text" 
                placeholder="Ej: Juancito" 
                onChange={handleChangeNickname} 
                name="nickname"
            />
            <label>
                Email
            </label>
            <input 
                value={email} 
                type="email" 
                placeholder="Ej: hola@yahoo.com" 
                onChange={handleChangeEmail} 
                name="email"
            />
            <button onClick={handleOnclick}>
                AÑADIR PERSONA
            </button>
        </div>
        </>
     );
}

export default PeopleForm;