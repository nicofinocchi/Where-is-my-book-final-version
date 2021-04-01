import React, { useState} from 'react';
import {usePeople} from '../../Context/PeopleContext'


const PeoplePutForm= (props) =>{
    console.log(props)
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    
    const {renamePeople}= usePeople();// viene del context
    

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
          renamePeople(person);
                setNombre('');
                setApellido('');
                setNickname('');
                setEmail('');
                console.log('Se agrego la persona correctamente')

        } catch (error) {
          console.log(error)
        }
      
     };

     return(
            <div className='formulario' >
                <label>Nombre</label>
                    <input value={nombre} type="text" placeholder="Ej: Juan" onChange={handleChangeNombre} name="nombre"/>
                
                <label>Apellido</label>
                    <input value={apellido} type="text" placeholder="Ej: Perez" onChange={handleChangeApellido} name="apellido"/>
                
                <label>Apodo</label>
                    <input value={nickname} type="text" placeholder="Ej: Juancito" onChange={handleChangeNickname} name="nickname"/>
                
                <label>Email</label>
                    <input value={email} type="email" placeholder="Ej: hola@yahoo.com" onChange={handleChangeEmail} name="email"/>

                <button onClick={handleOnclick}>GUARDAR</button>
            </div>
     );
}

export default PeoplePutForm;