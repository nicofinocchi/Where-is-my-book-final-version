import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const url= 'http://localhost:3000'
const PeopleContext = React.createContext();

export function PeopleProvider(props) {
    const [people, setPeople] = useState([]);
    const [peopleBooks, setPeopleBook]= useState([]);
    
    useEffect( ()  => {
        async function cargarPeople() {
            bringBooks()
            try{
                const response=await axios.get(url+ '/persona');
                let people=[];
                response.data.respuesta.forEach(person => {
                    people.push([person.id,person.nombre,person.apellido,person.alias,person.email]);
                });
                setPeople(people);
            }catch(e) {
                console.log(e)
            }
        }
        cargarPeople();
    }, []);

    async function bringBooks() {
        try{
            const response = await axios.get (url+'/libro');
            let books=[];
            response.data.respuesta.forEach(book => {
                books.push([book.nombre,book.persona_id]);
            });
            setPeopleBook(books);
        }catch(e){
            console.log(e)
        }
    }

    async function settingPeople(person) {
        const response = await axios.post (url+'/persona', person);
        if (response.request.status!=200){
            throw new Error('NO INGRESO A LA DB');
        }
        setPeople([...people,response.data.respuesta]);
    }

    async function renamePerson(person, id) {
        const response = await axios.put(url+ '/categoria'+id, person);
        if (response.request.status!=200){
            alert('NO SE PUDO MODIFICAR LA persona CORRECTAMENTE');
            throw new Error ('NO SE PUDO CAMBIAR LA CATEGORIA CORRECTAMENTE')
        }
        
    }

    async function deletePerson(id) {
        console.log(id)
        const response= await axios.delete(url+'/categoria/'+id);
        if (response.request.status!=200){throw new Error ('NO SE PUDO BORRAR LA persona, VERIFIQUE QUE NO HAYA UN LIBRO ASOCIADO')}
    }
    
    const value  = useMemo( () => {
        return ({
            people: people,
            settingPeople,
            peopleBooks: peopleBooks
        })
    }, [people, settingPeople]) // useMemo guarda la referencia al objeto que retornamos y luego sigue retornando siempre ese objeto sin volverlo a crear a menos que alguna de las dos propiedades [usuario, cargandoUsario] cambien.

    return <PeopleContext.Provider value = {value} {...props} /> //El proveedor debe retornar el valor {value} en caso de ser requerido. El valor es el objeto recien creado con useMemo
}

export function usePeople() { // ESTO ES UN HOOK. Cuando cualquier componente lo utilice va servirse del {value} creado arriba
    const context = React.useContext(PeopleContext); // Este es el usuarioContext creado al principio, antes de que corriera el código del proveedor
    if (!context) {
        throw new Error('useUsuario debe estar dentro del proveedor de usuarioContext') // Aseguramos que al ser aplicado desde otra api el contexto exista
    }
    return context; //Este context es el value creado
}