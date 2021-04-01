import React, { useState} from 'react';
import {useCategories} from '../../Context/CategoriesContext'


const CategoriesForm= () =>{
    const [nombre, setNombre] = useState('');
    
    const {settingCategories}= useCategories();// viene del context
    

    const handleChangeNombre= (event)=> {
        setNombre(event.target.value)
     }


     const handleOnclick= async()=>{
        const category ={
            nombre: nombre
            }
            try {
            settingCategories(category);
                setNombre('');
                console.log('Se agrego la categoria correctamente')

            } catch (error) {
            console.log('error')
            }
      
     };

     return(
            <div className='formulario' >
                <label>Nombre</label>
                    <input value={nombre} type="text" placeholder="Ej: TERROR" onChange={handleChangeNombre} name="nombre"/>

                <button onClick={handleOnclick}>GUARDAR</button>
            </div>
     );
}

export default CategoriesForm;