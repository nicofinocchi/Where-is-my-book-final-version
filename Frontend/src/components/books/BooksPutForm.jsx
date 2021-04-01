import React, { useState} from 'react';
import {useBooks} from '../../Context/BooksContext'


const BooksPutForm= (props) =>{
    const [descripcion, setDescripcion] = useState(props.match.params.descripcion);
    
    const {renameBook}= useBooks();// viene del context
    

    const handleChangeDescripcion= (event)=> {
        setDescripcion(event.target.value)
     }


     const handleOnclick= async()=>{
        const description ={
            description: descripcion
            }
            try {
            renameBook(description, props.match.params.id);
                setDescripcion('');
                alert('Se modifico la categoria correctamente')

            } catch (error) {
            console.log(error)
            }
      
     };

     return(
            <div className='formulario' >
                <label>Descripcion</label>
                    <input value={descripcion} type="text"  onChange={handleChangeDescripcion} name="nombre"/>

                <button onClick={handleOnclick}>GUARDAR</button>
            </div>
     );
}

export default BooksPutForm;