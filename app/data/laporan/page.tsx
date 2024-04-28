export const metadata = {
    title: "Daftar Transaksi",
}
import axios from 'axios'
import React from 'react';
import ExportPDF from './exportPDF';
import ExportExcel from './exportExcel';
import ReportTransaksi from './report';

type Transaksi = {
    id: number;
    tanggal: string;
    total_harga: number;
    note: string;
    payment: {
        id: number;
        name: string;
    }
}

type Payment = {
    id: number;
    name: string;
}

const ListTransaksi = async () => {
    return (
        <div>
            <ReportTransaksi />
        </div>
    );
};

export default ListTransaksi;
