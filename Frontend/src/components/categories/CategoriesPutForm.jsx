import React, { useState} from 'react';
import {useCategories} from '../../Context/CategoriesContext'


const CategoriesPutForm = (props) => {
    const [nombre, setNombre] = useState(props.match.params.nombre);
    
    const {renameCategory}= useCategories();// viene del context
    

    const handleChangeNombre= (event)=> {
        setNombre(event.target.value)
     }


     const handleOnclick= async()=>{
        const category ={
            nombre: nombre
            }
            try {
            renameCategory(category, props.match.params.id);
                setNombre('');
                alert('Se modifico la categoria correctamente')

            } catch (error) {
            console.log(error)
            }
      
     };

     return(
            <div className='formulario' >
                <label>Nombre</label>
                    <input value={nombre} type="text"  onChange={handleChangeNombre} name="nombre"/>

                <button onClick={handleOnclick}>GUARDAR</button>
            </div>
     );
}

export default CategoriesPutForm;