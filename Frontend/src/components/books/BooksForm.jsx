import React, { useState} from 'react';
import {useBooks} from '../../Context/BooksContext'

const PeopleForm= () =>{
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion]= useState('');
    const [categoria, setCategoria]= useState(2);
    const [persona, setPersona]= useState('');

    const {settingBooks}= useBooks();// viene del context
    

    const handleChangeNombre= (event)=> {
        setNombre(event.target.value)
     }

     const handleChangeDescripcion= (event)=>{
       setDescripcion(event.target.value)
     }

     const handleOnclick= async()=>{
        const book ={
          nombre: nombre,
          
        }
        try {
          settingBooks(book);
          setNombre('');
          setDescripcion('');
          setCategoria(2);
          setPersona('');
                
          console.log('Se agrego la persona correctamente')

        }catch (error) {
          console.log(error)
        }
      
     };

     return(
            <div className='formulario' >
                <label>Nombre</label>
                    <input value={nombre} type="text" placeholder="Ej: Viaje al centro de la tierra" onChange={handleChangeNombre} name="nombre"/>
                
                <label>Descripción</label>
                    <input value={descripcion} type="text" placeholder="Escriba descripcion del libro" onChange={handleChangeDescripcion} name="apellido"/>
                
                <label>Categoria</label>
                    
                
                <label>People</label>
                    

                <button onClick={handleOnclick}>GUARDAR</button>
            </div>
      );
}

export default PeopleForm;