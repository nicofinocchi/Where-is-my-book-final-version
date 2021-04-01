import React, { useState, useEffect } from 'react';
import {useBooks} from '../../Context/BooksContext';
import { useRouteMatch } from "react-router-dom";


const BooksList= () =>{
    
///////////////LISTA/////////////////////////

    const [booksHTML, setBooksHTML]=useState([]);

    const {books}= useBooks();// viene del context
    const {findPerson}= useBooks();// viene del context
    const {deleteBook}= useBooks();// viene del context

    function Cambiar(band) {
        let match = useRouteMatch(band);
        return (console.log('funciona'));
    }

    useEffect(()=>{
        const aux = books.map(book=>{
            let person= ' ';
            let link = `change/${book.id}/${book.descripcion}`;
            let link2 = `change/:$id/${book.descripcion}`;
             if (book.persona_id!== null) {
                console.log(book.persona_id)
                person= findPerson(book.persona_id)
            } 
            return(
                <tr key={book.id}>
                    <td>{book.nombre}</td>
                    <td>{book.descripcion}</td>
                    <td>{person}</td>
                    <td><button onClick={() =>{ Cambiar({link2}) }}><a href={link}>Modificar</a></button></td>
                    <td><button onClick={()=>{ deleteBook(book.id)}}>Borrar</button></td>

                    
                </tr>
            )}
        );
        setBooksHTML(aux);
    }, [books])

    return(
        <>
           <table>
               <thead>
                   <tr>
                       <th>Nombre</th>
                       <th>Descripcion</th>
                       <th>Fue prestado a</th>
                   </tr>
               </thead>
               <tbody>
                   {booksHTML}
                   
               </tbody>
           </table>
       </>
    );
}

export default BooksList;