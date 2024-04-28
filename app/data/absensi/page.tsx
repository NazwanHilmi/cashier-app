export const metadata = {
    title: "Absensi",
}

import axios from 'axios'
import React from 'react';
import DataProduct from './data';
import DataAbsensi from './data';

type Absensi = {
    id: number;
    nama: string;
    tanggal_masuk: number;
    waktu_masuk: string;
    status: string;
    waktu_keluar: string;
}


const getAbsensi = async () => {
    let res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/absensi`);

    return res.data.data
}

const ProductsList = async () => {
    const absensi: Absensi[] = await getAbsensi();

    return (
        <div>
            <DataAbsensi absensi={absensi}/>
        </div>
    );
};

export default ProductsList;