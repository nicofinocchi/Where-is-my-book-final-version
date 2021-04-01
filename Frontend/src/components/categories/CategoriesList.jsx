import React, { useState, useEffect } from 'react';
import {useCategories} from '../../Context/CategoriesContext'
import { useRouteMatch } from "react-router-dom";

const CategoriesList= () =>{
    
///////////////LISTA/////////////////////////

    const [categoriesHTML, setCategoriesHTML]=useState([]);

    const {categories}= useCategories();// viene del context
    const {booksCat}= useCategories();// viene del context
    const {deleteCategory}= useCategories()//viene del context

    function findBooks(id) {
        let cont= 0;
        let books=[];
        booksCat.forEach(Cat => {
            if (Cat[1]==id) {
                books[cont]=<li key={Cat[0]}>{Cat[0]}</li>
            }
            cont++;
        });
        return(<ul key={id}>
            {books}
        </ul>)
       
    }

    function Cambiar(band) {
        let match = useRouteMatch(band);
        return (console.log('funciona'));
    }

    useEffect(()=>{
        const aux = categories.map(aCategory=>{
            const books= findBooks(aCategory.id);
            let link = `change/${aCategory.id}/${aCategory.nombre}`;
            let link2 = `change/:$id/${aCategory.nombre}`;
            return(
                <tr key={aCategory.id}>
                    <td>{aCategory.id}</td>
                    <td>{aCategory.nombre}</td>
                    <td>{books}</td>
                    <td><button onClick={() =>{ Cambiar({link2}) }}><a href={link}>Modificar</a></button></td>
                    <td><button onClick={()=>{ deleteCategory(aCategory.id)}}>Borrar</button></td>

                </tr>
            )}
        );
        setCategoriesHTML(aux);
    }, [categories])

    return(
        <>
           <table>
               <thead>
                   <tr>
                       <th>ID</th>
                       <th>Nombre</th>
                   </tr>
               </thead>
               <tbody>
                   {categoriesHTML}
                   
               </tbody>
           </table>
       </>
    );
}

export default CategoriesList;