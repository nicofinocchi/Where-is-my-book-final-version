import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const url= 'http://localhost:3000'
const BooksContext = React.createContext();

export function BooksProvider(props) {
    const [books, setBooks] = useState([]);
    
    useEffect( ()  => {
        async function cargarLibros() {
            try{
                const response=await axios.get(url+ '/libro');
                setBooks(response.data.respuesta);
                }catch(e){
                    console.log(e)
                }
            }
        cargarLibros();
    }, []);

    async function findPerson(id) {
        try{
            const response = await axios.get (url+'/persona/'+id);
            let person=[];
            response.data.respuesta.forEach(aPerson => {
                person.push([aPerson.alias]);
            });
                }catch(e){
                    console.log(e)
                }
    }

    async function settingBooks(book) {
        const response = await axios.post (url+'/libro', book);
        if (response.request.status!=200) { throw new Error('NO INGRESO A LA DB')}
        setBooks([...books,response.data.respuesta]);
    }
    
    async function renameBook(book, id) {
        const response = await axios.put(url+ '/categoria'+id, book);
        if (response.request.status!=200){
            alert('NO SE PUDO MODIFICAR LA CATEGORIA CORRECTAMENTE');
            throw new Error ('NO SE PUDO CAMBIAR LA CATEGORIA CORRECTAMENTE')
        }
        
    }

    async function deleteBook(id) {
        console.log(id)
        const response= await axios.delete(url+'/libro/'+id);
        if (response.request.status!=200){throw new Error ('NO SE PUDO BORRAR el libro, VERIFIQUE QUE NO HAYA UNa persona ASOCIADa')}

    }

    const value  = useMemo( () => {
        return ({
            books: books,
            settingBooks: settingBooks,
            findPerson: findPerson,
            deleteBook: deleteBook,
            renameBook:renameBook
        })
    }, [books, settingBooks]) // useMemo guarda la referencia al objeto que retornamos y luego sigue retornando siempre ese objeto sin volverlo a crear a menos que alguna de las dos propiedades [usuario, cargandoUsario] cambien.

    return <BooksContext.Provider value = {value} {...props} /> //El proveedor debe retornar el valor {value} en caso de ser requerido. El valor es el objeto recien creado con useMemo
}

export function useBooks() { // ESTO ES UN HOOK. Cuando cualquier componente lo utilice va servirse del {value} creado arriba
    const context = React.useContext(BooksContext); // Este es el usuarioContext creado al principio, antes de que corriera el código del proveedor
    if (!context) {
        throw new Error('useUsuario debe estar dentro del proveedor de usuarioContext') // Aseguramos que al ser aplicado desde otra api el contexto exista
    }
    return context; //Este context es el value creado
}