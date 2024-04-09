export const metadata = {
    title: "Jenis",
}

import axios from 'axios'
import React from 'react';
import DataType from './data';

type Type = {
    id: number;
    nama_jenis: string;
    category: {
        id: number,
        nama: string
    }
}

type Category = {
    id: number;
    nama: string;
}

const getCategory = async () => {
    let res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category`);

    return res.data.data
}

const getType = async () => {
    let res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/type`);

    return res.data.data
}

const TypeList = async () => {
    const category: Category[] = await getCategory();
    const type: Type[] = await getType();

    return (
        <div>
            <DataType type={type} category={category}/>
        </div>
    );
};

export default TypeList;
