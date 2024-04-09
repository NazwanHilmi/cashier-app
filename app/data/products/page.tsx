export const metadata = {
    title: "Produk Titipan",
}

import axios from 'axios'
import React from 'react';
import DataProduct from './data';

type Products = {
    id: number;
    name: string;
    supplier_name: string;
    purchase_price: number;
    selling_price: number;
    stock: number;
}


const getProducts = async () => {
    let res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product`);

    return res.data.data
}

const ProductsList = async () => {
    const products: Products[] = await getProducts();

    return (
        <div>
            <DataProduct product={products}/>
        </div>
    );
};

export default ProductsList;

