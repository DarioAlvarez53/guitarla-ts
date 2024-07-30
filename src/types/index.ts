export interface Guitar {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number
}

//Herencia de propiedades con interfaces
export interface CartItem extends Guitar {
    quantity: number;
}

//Herencia de propiedades con types
// export type Guitar {
//     id: number;
//     name: string;
//     image: string;
//     description: string;
//     price: number
// }
// export type CartItem = Guitar & {
//     quantity: number;
// }

//Utility types, sirve solo para heredar un type a otro si que se modifiquen sus valores principales, estos solo funcionan con los types, y no con los interfaces
