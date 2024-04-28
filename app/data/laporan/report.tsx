'use client'

export const metadata = {
    title: "Laporan Transaksi",
}
import axios from 'axios'
import React, { SyntheticEvent, useState } from 'react';
import ExportPDF from './exportPDF';
import ExportExcel from './exportExcel';

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

const ReportTransaksi = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [transaksi, setTransaksi] = useState<Transaksi[]>([]);
    const [error, setError] = useState('')
    
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        if(startDate == '' || endDate == '' || startDate > endDate){
            setError("Masukan tanggal yang benar");
            setTransaksi([]);
            return
        }

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/transaksi?start_date=${startDate}&end_date=${endDate}`);
            const data = response.data.data;

            if(data.length === 0 ){
                setError('Tidak ada data yang sesuai dengan tanggal')
            }

            setTransaksi(data);
        } catch (error: any) {
            console.log('Terjadi kesalahan:', error);
            setError('Terjadi kesalahan saat mengambil data')
            setTransaksi([])
        }
    };

    return (
        <div>
            <header className='w-full p-4 bg-white shadow-lg rounded-lg'>
                <h1 className="text-lg font-montserrat font-semibold">{metadata.title}</h1>
            </header>
            <div className="px-10 py-5">
                <div className="py-2 flex justify-between items-end">
                    <div className='flex gap-2'>
                        <form onSubmit={handleSubmit} className='flex gap-2'>
                            <div className='form-control'>
                                <label htmlFor="start_date" className="block font-semibold">Tanggal Awal:</label>
                                <input type="date" id="start_date" className="input input-sm bg-white input-bordered text-sm mt-1" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                            </div>
                            <div className='form-control'>
                                <label htmlFor="end_date" className="block font-semibold">Tanggal Akhir:</label>
                                <input type="date" id="end_date" className="input input-sm bg-white input-bordered text-sm mt-1" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                            </div>
                            <button type='submit' className="btn btn-sm bg-blue-500 text-white mt-7 border-none">Tampilkan</button>
                        </form>
                        {/* <ExportPDF />
                        <ExportExcel /> */}
                    </div>
                </div>
                        <div>
                            {error && <div className="text-red-500 font-montserrat italic">{error}</div>}
                        </div>
            <div className="overflow-x-auto rounded-md">
                <table className='table'>
                    <thead>
                        <tr className='text-white bg-gray-700'>
                            <th className='text-xs'>No.</th>
                            <th className='text-xs'>Tanggal</th>
                            <th className='text-xs'>Total Harga</th>
                            <th className='text-xs'>Nota</th>
                            <th className='text-xs'>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transaksi.length === 0 ? (
                            <tr>
                                <td colSpan={5} className='text-center text-xs italic'>Tidak ada data</td>
                            </tr>
                        ): (
                            transaksi.map((item, index) => (
                                <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                    <td>{index + 1}</td>
                                    <td>{item.tanggal}</td>
                                    <td>{item.total_harga}</td>
                                    <td>{item.note}</td>
                                    <td>{item.payment.name}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
};

export default ReportTransaksi;
