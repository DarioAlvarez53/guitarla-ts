import type { Guitar } from "../types";

interface GuitarProps {
    guitar: Guitar, 
    addTwoCart : (item: Guitar) => void
}


export default function Guitar ({guitar, addTwoCart} : GuitarProps) {

    const { name, image, description, price} = guitar;

    //El tipo de dato any quiere decir que la variable puede ser modificada en cualquier parte del codigo


    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img
                    className="img-fluid"
                    src= {`/img/${image}.jpg`}
                    alt= {name}
                />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">
                    {name}
                </h3>
                <p>
                    {description}
                </p>
                <p className="fw-black text-primary fs-3">${price}</p>
                <button 
                    type="button" 
                    className="btn btn-dark w-100"
                    onClick={() => addTwoCart(guitar)} //El arrow function es para que no se mande de inmediato a ejectuar la funcion con parametro
                >
                        Agregar al Carrito
                </button>
            </div>
        </div>
    )
}