"use client"

import axios from 'axios';
import React from 'react';
import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/navigation';
import SweetAlert from '@/app/components/sweetAlert';

const API_URL = 'http://127.0.0.1:8000/api'
const AddMeja = () => {
    const [modal, setModal] = useState(false)
    const [nomorMeja, setNomorMeja] = useState(0)
    const [kapasitas, setKapasitas] = useState(0)
    const [statusOptions, setStatusOptions] = useState('Tersedia');
    const [status, setStatus] = useState<any>(null)
    const [message, setMessage] = useState<any>(null)
    const [isMutating, setIsMutating] = useState(false)
    const router = useRouter()
    const handleChange = () => setModal(!modal)
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()

        setIsMutating(true)

        const data = { 
            'nomor_meja': nomorMeja,
            'kapasitas': kapasitas,
            'status': status
        }
        let endpoint = `${API_URL}/meja`
        try {
                const res = await axios.post(endpoint, data);
                setModal(false);
                setIsMutating(false);
                setNomorMeja(0)
                setKapasitas(0)
                setStatusOptions('Tersedia')
    
                setStatus(res.status)
                setMessage(res.data.message)
                
                router.refresh();
            } catch (error: any) {
                setIsMutating(false);
                setStatus(error.response.status)
                setMessage('Meja gagal diedit')
                router.refresh();
            }
    }
    return (
        <div>
            <button className="btn text-white bg-blue-primary hover:bg-blue-600 border-none text-sm font-medium" onClick={handleChange}>
                Tambah Meja
            </button>
            <input
                type="checkbox"
                checked={modal}
                onChange={handleChange}
                className="modal-toggle"
            />
            <div className="modal">
                <div className="modal-box bg-white border-slate-950">
                    <h3 className="font-bold text-lg text-slate-800">Add New Stok</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label font-bold">Nomor Meja</label>
                            <input
                                type="number"
                                value={nomorMeja}
                                min={0}
                                onChange={(e) => setNomorMeja(parseInt(e.target.value))}
                                className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                                placeholder="Masukan Nomor Meja"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Kapasitas</label>
                            <input
                                type="number"
                                value={kapasitas}
                                min={0}
                                onChange={(e) => setKapasitas(parseInt(e.target.value))}
                                className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                                placeholder="Masukan Kapasitas"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Status</label>
                            <select className="input w-full input-bordered bg-white text-slate-800 border-slate-300" value={statusOptions} defaultValue={0} onChange={(e) => setStatusOptions(e.target.value)}>
                                <option disabled value={0}>Pilih Status</option>
                                <option value="available">Tersedia</option>
                                <option value="reserved">Terpakai</option>
                            </select>
                            </div>
                            <div className="modal-action">
                            <button type="button" className="btn btn-sm bg-close-btn border-none hover:bg-slate-600 font-medium text-sm text-white" onClick={handleChange}>
                                Close
                            </button>
                            {!isMutating ? (
                                <button type="submit" className="btn btn-sm bg-blue-primary hover:bg-blue-600 font-medium border-none text-white text-sm">
                                    Submit
                                </button>
                            ) : (
                                <button type="button" className="loading loading-md bg-slate-600"></button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddMeja