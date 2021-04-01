import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const url= 'http://localhost:3000'
const CategoriesContext = React.createContext();

export function CategoriesProvider(props) {
    const [categories, setCategories] = useState([]);
    const [booksCat, setBooksCat]= useState([]);
    
    useEffect( ()  => {
        async function cargarCategories() {
            bringBooks();
            try{
                const response=await axios.get(url+ '/categoria');
                setCategories(response.data.respuesta);
            }catch(e){
                console.log(e)
            }
        }
        cargarCategories();
    }, []);

        async function bringBooks() {
            try{
                const response = await axios.get (url+'/libro');
                let books=[];
                response.data.respuesta.forEach(book => {
                    books.push([book.nombre,book.categoria_id]);
                });
                setBooksCat(books);
            }catch(e){
                console.log(e)
            }
        }
    
    async function settingCategories(category) {
        const response = await axios.post (url+'/categoria', category);
        if (response.request.status!=200) { throw new Error('NO INGRESO A LA DB')}
        setCategories([...categories,response.data.respuesta]);
    }

    async function renameCategory(category, id) {
        const response = await axios.put(url+ '/categoria'+id, category);
        if (response.request.status!=200){
            alert('NO SE PUDO MODIFICAR LA CATEGORIA CORRECTAMENTE');
            throw new Error ('NO SE PUDO CAMBIAR LA CATEGORIA CORRECTAMENTE')
        }
        
    }

    async function deleteCategory(id) {
        console.log(id)
        const response= await axios.delete(url+'/categoria/'+id);
        if (response.request.status!=200){throw new Error ('NO SE PUDO BORRAR LA CATEGORIA, VERIFIQUE QUE NO HAYA UN LIBRO ASOCIADO')}

    }
    
    const value  = useMemo( () => {
        return ({
            categories: categories,
            settingCategories: settingCategories,
            booksCat: booksCat,
            renameCategory: renameCategory,
            deleteCategory: deleteCategory
        })
    }, [categories, settingCategories]) // useMemo guarda la referencia al objeto que retornamos y luego sigue retornando siempre ese objeto sin volverlo a crear a menos que alguna de las dos propiedades [usuario, cargandoUsario] cambien.

    return <CategoriesContext.Provider value = {value} {...props} /> //El proveedor debe retornar el valor {value} en caso de ser requerido. El valor es el objeto recien creado con useMemo
}

export function useCategories() { // ESTO ES UN HOOK. Cuando cualquier componente lo utilice va servirse del {value} creado arriba
    const context = React.useContext(CategoriesContext); // Este es el usuarioContext creado al principio, antes de que corriera el código del proveedor
    if (!context) {
        throw new Error('useUsuario debe estar dentro del proveedor de usuarioContext') // Aseguramos que al ser aplicado desde otra api el contexto exista
    }
    return context; //Este context es el value creado
}