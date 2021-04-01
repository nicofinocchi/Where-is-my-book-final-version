import React, { useState, useEffect } from 'react';
import {usePeople} from '../../Context/PeopleContext'
import { useRouteMatch } from "react-router-dom";


const PeopleList= () =>{
    
///////////////LISTA/////////////////////////

    const [personasHTML, setPersonasHTML]=useState([]);

    const {people}= usePeople();// viene del context
    const {peopleBooks}= usePeople();// viene del context
    const {deletePerson}= usePeople()//viene del context

    function findBooks(id) {
        let cont= 0;
        let books=[];
        peopleBooks.forEach(book => {
          
            if (book[1]==id) {
                books[cont]=<li key={book[0]}>{book[0]}</li>
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
        const aux = people.map(aPerson=>{
            const books= findBooks(aPerson[0]);
            let link = `change/${aPerson[0]}/${aPerson[1]}/${aPerson[2]}/${aPerson[3]}/${aPerson[4]}`;
            let link2 = `change/:$id/${aPerson[1]}/${aPerson[2]}/${aPerson[3]}/${aPerson[4]}`;
            return(
                <tr key={aPerson[0]}>
                    <td>{aPerson[1]}</td>
                    <td>{aPerson[2]}</td>
                    <td>{aPerson[3]}</td>
                    <td>{aPerson[4]}</td>
                    <td>{books}</td>
                    <td><button onClick={() =>{ Cambiar({link2}) }}><a href={link}>Modificar</a></button></td>
                    <td><button onClick={()=>{ deletePerson(aPerson[0])}}>Borrar</button></td>
                </tr>
            )}
        );
        setPersonasHTML(aux);
    }, [people])

    return(
        <>
           <table>
               <thead>
                   <tr>
                       <th>Nombre</th>
                       <th>Apellido</th>
                       <th>Apodo</th>
                       <th>Email</th>
                       <th>Libros prestados</th>
                   </tr>
               </thead>
               <tbody>
                   {personasHTML}
               </tbody>
           </table>
       </>
    );
}

export default PeopleList;