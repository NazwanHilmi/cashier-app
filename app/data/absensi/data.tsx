'use client'

export const metadata = {
    title: "Absensi",
}
import axios from 'axios'
import React, { useState } from 'react';
import AddAbsensi from './addAbsensi';
import DeleteAbsensi from './deleteAbsensi';
import EditAbsensi from './editAbsensi';
import ExportPDF from './exportPDF';
import { useRouter } from 'next/navigation';
import ExportExcel from './exportExcel';
import ImportExcel from './importExcel';

type Absensi = {
    id: number;
    nama: string;
    tanggal_masuk: number;
    waktu_masuk: number;
    status: string;
    waktu_keluar: string;
}

const DataAbsensi = ({ absensi }: { absensi: Absensi[] }) => {
    const [data, setData] = useState<Absensi[]>(absensi)
    const [search, setSearch] = useState("")
    const [editStatus, setEditStatus] = useState(true)
    const router = useRouter();

    const handleSearchData = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (value.length > 0) {
            const newData = data.filter((data) => data.nama.includes(value) || data.nama.toLowerCase().includes(value) || data.nama.toUpperCase().includes(value));
            setData(newData);
        } else {
            setData(absensi);
        }

        setSearch(value);
    }

    const handleStatusChange = async (event: React.ChangeEvent<HTMLSelectElement>, id: number) => {
        const status = event.target.value;
        let waktuKeluar = '';

        if(status === 'sakit' || status === 'cuti'){
            waktuKeluar = '00:00:00'
        }

        const newStatus = data.map(item => {
            if (item.id === id) {
                return { ...item, status: status, waktu_keluar: waktuKeluar};
            }
            return item;
        });
        setData(newStatus);
    
        try {
            const dataUpdate = data.find(item => item.id === id);

            if (!dataUpdate) {
                console.error('Data tidak ditemukan pada ID:', id);
                return;
            }
            
            const newData = {
                "id": dataUpdate.id,
                "nama": dataUpdate.nama,
                "tanggal_masuk": dataUpdate.tanggal_masuk,
                "waktu_masuk": dataUpdate.waktu_masuk,
                "waktu_keluar": dataUpdate.waktu_keluar,
                "status": status  // Status baru
            };

            // Kirim permintaan PUT ke backend untuk memperbarui status
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/absensi/${id}`, newData);
            console.log('Status updated successfully!');
            router.refresh(); // Refresh halaman setelah perubahan status
        } catch (error) {
            console.error('Error updating status:', error);
        }
    }
    
    const handleDoneClick = async (id: number) => {
        try {
            const newTime = new Date().toLocaleTimeString('en-US', { hour12: false });
            const newData = data.map(item => {
                if (item.id === id) {
                    return { ...item, waktu_keluar: newTime };
                }
                return item;
            });

            setData(newData);

            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/absensi/${id}`, { 
                waktu_keluar: newTime,  
                nama: newData.find(item => item.id === id)?.nama,
                tanggal_masuk: newData.find(item => item.id === id)?.tanggal_masuk,
                waktu_masuk: newData.find(item => item.id === id)?.waktu_masuk,
                status: newData.find(item => item.id === id)?.status,
            });
            console.log('Waktu selesai kerja updated successfully!');
            router.refresh();
        } catch (error) {
            console.error('Error updating waktu selesai kerja:', error);
        }
    }

    return (
        <div>
            <header className='w-full p-4 bg-white shadow-lg'>
                <h1 className="text-lg font-montserrat font-semibold">{metadata.title}</h1>
            </header>
            <div className="px-10 py-5">
                <div className="py-2 flex justify-between items-end">
                    <div className='flex gap-2'>
                    <AddAbsensi />
                    <ExportPDF />
                    <ExportExcel />
                    <ImportExcel />
                </div>
                <div>
                    <input type="text" id='karyawan' value={search} onChange={handleSearchData} placeholder='Cari Karyawan' className='input input-sm bg-white input-bordered text-sm' />
                </div>
            </div>
            <div className="overflow-x-auto rounded-md">
                <table className='table'>
                    <thead>
                        <tr className='text-white bg-gray-700'>
                            <th className='text-xs'>No.</th>
                            <th className='text-xs'>Nama Karyawan</th>
                            <th className='text-xs'>Tanggal Masuk</th>
                            <th className='text-xs'>Waktu Masuk</th>
                            <th className='text-xs'>Status</th>
                            <th className='text-xs'>Waktu Selesai Kerja</th>
                            <th className='text-xs text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((absensi, index) => (
                            <tr key={absensi.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                <td>{index + 1}</td>
                                <td>{absensi.nama}</td>
                                <td>{absensi.tanggal_masuk}</td>
                                <td>{absensi.waktu_masuk}</td>
                                <td>
                                    <select className='bg-white border border-gray-800 rounded-md px-2 py-2' value={absensi.status} onChange={(e) => handleStatusChange(e, absensi.id)} disabled={!editStatus} >
                                        <option value="masuk">Masuk</option>
                                        <option value="sakit">Sakit</option>
                                        <option value="cuti">Cuti</option>
                                    </select>
                                </td>
                                <td>
                                    <span className='mr-4'>{absensi.waktu_keluar}</span>
                                    <button className='btn btn-sm bg-gray-600 text-white border-none' onClick={() => handleDoneClick(absensi.id)}>Selesai</button>
                                </td>
                                <td className='flex items-center justify-center gap-2'>
                                    <EditAbsensi {...absensi} />
                                    <DeleteAbsensi {...absensi} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
};

export default DataAbsensi;
