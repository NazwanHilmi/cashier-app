"use client"
import React, { SyntheticEvent } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { TiEdit } from "react-icons/ti";
import SweetAlert from '@/app/components/sweetAlert';

type Absensi = {
    id: number;
    nama: string;
    tanggal_masuk: number;
    waktu_masuk: string;
    status: string;
    waktu_keluar: string;
}

const API_URL = (`${process.env.NEXT_PUBLIC_API_URL}`)
const EditAbsensi = (params: Absensi) => {
    const [modal, setModal] = useState(false)
    const [nama, setNama] = useState(params.nama)
    const [tanggalMasuk, setTanggalMasuk] = useState(params.tanggal_masuk)
    const [waktuMasuk, setWaktuMasuk] = useState(params.waktu_masuk)
    const [statusKerja, setStatusKerja] = useState(params.status)
    const [waktuKeluar, setWaktuKeluar] = useState(params.waktu_keluar)
    const [isMutating, setIsMutating] = useState(false)
    const [status, setStatus] = useState<any>(null)
    const [message, setMessage] = useState<any>(null)
    const router = useRouter()

    const handleChange = () => {
        setModal(!modal);
        setNama(nama);
        setTanggalMasuk(tanggalMasuk);
        setWaktuMasuk(waktuMasuk);
        setStatusKerja(statusKerja);
        setWaktuKeluar(waktuKeluar);
    };

    const handleUpdate = async (e: SyntheticEvent) => {
        e.preventDefault();

        setIsMutating(true);
        let endpoint = `${API_URL}/absensi/${params.id}`;
        const data = { 
            'nama': nama,
            'tanggal_masuk': tanggalMasuk, 
            'waktu_masuk': waktuMasuk, 
            'status': statusKerja, 
            'waktu_keluar': waktuKeluar,
        };

        console.log(data)

        try {
            const res = await axios.patch(endpoint, data);
            setNama(nama);
            setIsMutating(false);
            setModal(false);

            setMessage(res.data?.message)
            setStatus(res.status)

            router.refresh();
        } catch (error: any) {
            setIsMutating(false)
            setStatus(error.response.status)
            setMessage('Kategori gagal diedit')
            router.refresh();
        }
    };
    return (
        <div className='font-montserrat'>
        <button className="p-2 rounded-md text-white bg-green-600 hover:bg-green-700 border-none" onClick={handleChange}>
            <TiEdit size='20' />
        </button>
        <input
            type="checkbox"
            checked={modal}
            onChange={handleChange}
            className="modal-toggle"
        />
        <div className="modal">
            <div className="modal-box bg-white border-slate-950">
            <h3 className="font-bold text-lg text-slate-800">Edit Absensi Karyawan {params.nama}</h3>
            <form onSubmit={handleUpdate}>
            <div className="form-control">
                <label className="label font-bold text-slate-800">Nama Karyawan</label>
                    <input
                        type="text"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                        placeholder="Nama"
                    />
                </div>
                <div className="form-control">
                    <label className="label font-bold text-slate-800">Tanggal Masuk</label>
                    <input
                        type="date"
                        value={tanggalMasuk}
                        onChange={(e) => setTanggalMasuk(parseInt(e.target.value))}
                        className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                    />
                    <style jsx>{`
                    .form-control input[type="date"]::-webkit-calendar-picker-indicator {
                        filter: invert(100%);
                    }
                `}</style>
                </div>
                <div className="form-control">
                    <label className="label font-bold text-slate-800">Waktu Masuk</label>
                    <input
                        type="time"
                        value={waktuMasuk}
                        onChange={(e) => setWaktuMasuk(e.target.value)}
                        className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                    />
                    <style jsx>{`
                    .form-control input[type="time"]::-webkit-calendar-picker-indicator {
                        filter: invert(100%);
                    }`}</style>
                </div> 
                <div className="form-control">
                    <label className="label font-bold text-slate-800">Status</label>
                    <select 
                        value={statusKerja} 
                        onChange={(e) => setStatusKerja(e.target.value)} 
                        className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                        defaultValue={0}>
                        <option value={0}>Pilih Status Kerja</option>
                        <option value="masuk">Masuk</option>
                        <option value="sakit">Sakit</option>
                        <option value="cuti">Cuti</option>
                    </select>
                </div>
                <div className="form-control">
                    <label className="label font-bold text-slate-800">Waktu Keluar</label>
                    <input
                        type="time"
                        value={waktuKeluar}
                        onChange={(e) => setWaktuKeluar(e.target.value)}
                        className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                    />
                    <style jsx>{`
                    .form-control input[type="time"]::-webkit-calendar-picker-indicator {
                        filter: invert(100%);
                    }
                `}</style>
            </div>                               
                <div className="modal-action">
                <button type="button" className="btn btn-sm rounded-md bg-close-btn border-none hover:bg-slate-600 font-medium text-sm text-white" onClick={handleChange}>
                    Close
                </button>
                {!isMutating ? (
                    <button type="submit" className="btn btn-sm rounded-md bg-blue-primary hover:bg-blue-600 font-medium border-none text-white text-sm">
                        Submit
                    </button>
                ) : (
                    <button type="button" className="loading loading-md bg-slate-600"></button>
                )}
                </div>
            </form>
            </div>
        </div>
        {status && <SweetAlert status={status} message={message} isTransaksi={false} setStatus={setStatus} />}
        </div>
    );
};

export default EditAbsensi