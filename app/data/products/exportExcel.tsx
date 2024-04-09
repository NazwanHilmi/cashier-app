import axios from 'axios';
import React from 'react';

const handleExport = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/export-excel`); // Ganti URL dengan URL endpoint Anda
        const users = response.data; // Misalnya respons berisi data pengguna

        // Proses data pengguna dan buat file Excel di sini

        console.log('Data pengguna:', users);
    } catch (error) {
        console.error('Error saat mengambil data pengguna:', error);
    }
};

const ExportButton = () => {
    return (
        <>
        <button className="p-2 rounded-md text-white bg-green-500 hover:bg-green-600 border-none text-sm font-medium" onClick={handleExport}>
            Export Excel
        </button>
        </>
    );
};

export default ExportButton;