import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";
import type { Guitar, CartItem } from "../types";

export const useCart = () => {
    //Verificar si hay algo en local storage
    const initialCart = () : CartItem[] => {
        const localStorageCart = localStorage.getItem('cart')// aqui va el nombre que se quiere obtener de local storage
        return localStorageCart ? JSON.parse(localStorageCart) : [] //primero va a buscar si local storage tiene algo, y si no va a regresar un arreglo vacio
    }

    //Definiendo el estado (state)
    // const[auth, setAuth] = useState(false);
    // const[total, setTotal] = useState(0);
    // const[cart, setCart] = useState([]);

    //Definiendo el useEffect, esta es muy recomendada cuando quieres conectar con una API
    // useEffect(() => {
    //     if(auth) {
    //         console.log('Autenticado')
    //     }
    //     // console.log('Componente listo o escuchando por auth')
    // },[auth])

    // setTimeout(() => {
    //     setAuth(true)
    // }, 3000);

    //Creando el state
    const [data] = useState(db);

    //Creando state para carrito de compras
    const [cart, setCart] = useState(initialCart);

    //Funcion para tener persistencia en el carrito con local storage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart)) //toma dos parametros, el primero el nombre de lo que quieres almacenar en local storage, y segundo lo que se desea almacenar: NOTA => NO permite almacenar objetos ni arreglos, solo strings, para cuando se tiene un objeto o arreglo se usa JSON.stringify(//aqui va el state a almacenar)
    }, [cart])

    function addTwoCart(item: Guitar) {
        //Comprovando si el elemento existe o no
        const itemExist = cart.findIndex((guitar) => guitar.id === item.id)
        if (itemExist >= 0) { //Verificacion de existencia en el carrito
            if(cart[itemExist].quantity >= 5 ) return;
            const updateCart = [...cart]
            updateCart[itemExist].quantity++
            setCart(updateCart)
        } else {
            const newItem : CartItem = {
                //Agregand una propiedad nueva al objeto
                ...item, quantity : 1
            }
            
            setCart([...cart, newItem])    
        }
    }

    //eliminacion de un producto en el carrito de compras
    function removeFromCart(id : Guitar['id']) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    //funcion para incrementar cantidad en productos
    function increaseQuantity(id : Guitar['id']) {
        const updateCart = cart.map(item => {
            if (item.id === id && item.quantity < 5) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updateCart);
    }

    //funcion para decrementar cantidad en el productos
    function decreaseQuantity(id : Guitar['id']) {
        const decremneted = cart.map(item => {
            if(item.id === id && item.quantity >= 1) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(decremneted)
    }

    //funcion para limpiar el carrito
    function clearCart(){
        setCart([])
    }

    //State derivado
    const isEmpty = useMemo(() => cart.length === 0, [cart])

    //Calculo de total a pagar
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart] )

    return {
        data,
        cart,
        addTwoCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}