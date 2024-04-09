"use client"
import React, { SyntheticEvent } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { TiEdit } from "react-icons/ti";
import SweetAlert from '@/app/components/sweetAlert';

type Type = {
    id: number;
    nama_jenis: string;
    category : {
        id : number,
        nama: string
    }
}

type Category = {
    id: number;
    nama: string;
}

    const API_URL = (`${process.env.NEXT_PUBLIC_API_URL}`)
    const EditType = ({type, category} : {type: Type, category: Category[]}) => {
    const [modal, setModal] = useState(false);
    const [namaJenis, setNamaJenis] = useState(type.nama_jenis);
    const [kategoriId, setKategoriId] = useState(type.category.id)
    const [isMutating, setIsMutating] = useState(false);
    const [status, setStatus] = useState<any>(null)
    const [message, setMessage] = useState<any>(null)

    const router = useRouter();

    const handleChange = () => {
        setModal(!modal);
        setNamaJenis(namaJenis);
        setKategoriId(type.category.id)
    };

    const handleUpdate = async (e: SyntheticEvent) => {
        e.preventDefault();
    
        setIsMutating(true);
        let endpoint = `${API_URL}/type/${type.id}`;
        const data = {
            'id': type.id,
            'nama_jenis': namaJenis,
            'kategori_id': kategoriId,
        };
        
        try {
            const res = await axios.patch(endpoint, data);
            setModal(false);
            setNamaJenis(namaJenis);
            setKategoriId(type.category.id);
            setIsMutating(false);

            setStatus(res.status)
            setMessage(res.data.message)
            
            router.refresh();
        } catch (error: any) {
            setIsMutating(false);
            setStatus(error.response.status)
            setMessage('Jenis gagal diedit')
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
            <h3 className="font-bold text-lg text-slate-800">Edit Type {type.nama_jenis}</h3>
            <form onSubmit={handleUpdate}>
                <div className="form-control">
                <label className="label font-bold">Name</label>
                <input
                    type="text"
                    value={namaJenis}
                    onChange={(e) => setNamaJenis(e.target.value)}
                    className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                    placeholder="Name Category"
                />
                </div>
                <div className="form-control">
                    <label className="label font-bold t">Kategori</label>
                        <div className="relative">
                            <select
                                value={kategoriId}
                                onChange={(e) => setKategoriId(Number(e.target.value))}
                                className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                                defaultValue={type.category.id}
                            >
                                <option disabled value={0}>Choose Category</option>
                                    {category.map((category, index) =>(
                                        <option value={category.id} key={index}>
                                            {category.nama}
                                        </option>
                                    ))}
                                </select>
                        </div>
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

export default EditType