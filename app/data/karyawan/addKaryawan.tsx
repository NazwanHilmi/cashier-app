"use client"
import React, { SyntheticEvent, useState } from 'react'
import axios from 'axios';
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";

const API_URL = (`${process.env.NEXT_PUBLIC_API_URL}`)
const AddKaryawan = () => {
    const [modal, setModal] = useState(false)
    const [nip, setNip] = useState("")
    const [nik, setNik] = useState("")
    const [nama, setNama] = useState("")
    const [jenisKelamin, setJenisKelamin] = useState<any>(null)
    const [telepon, setTelepon] = useState("")
    const [tempatLahir, setTempatLahir] = useState("")
    const [tanggalLahir, setTanggalLahir] = useState("")
    const [agama, setAgama] = useState("")
    const [statusNikah, setStatusNikah] = useState("")
    const [alamat, setAlamat] = useState("")
    const [foto, setFoto] = useState("")
    const [isMutating, setIsMutating] = useState(false)
    const router = useRouter()

    const handleChange = () => {
        setModal(!modal);
        setNik('');
        setNip('');
        setNama('');
        setJenisKelamin('');
        setTelepon('');
        setTempatLahir('');
        setTanggalLahir('');
        setAgama('');
        setStatusNikah('');
        setAlamat('');
        setFoto('');
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()

        setIsMutating(true)

        let endpoint = `${API_URL}/karyawan`
        const data = {
                'nip': nip,
                'nik': nik,
                'nama': nama,
                'jenis_kelamin': jenisKelamin,
                'tempat_lahir': tempatLahir,
                'tanggal_lahir': tanggalLahir,
                'telepon': telepon,
                'agama': agama,
                'status_nikah': statusNikah,
                'alamat' : alamat,
                'foto' : foto
            }
        try {
                await axios.post(endpoint, data);
                setNip('');
                setNik('');
                setNama('');
                setJenisKelamin('');
                setTempatLahir('');
                setTanggalLahir('');
                setTelepon('');
                setAgama('');
                setStatusNikah('');
                setAlamat('');
                setFoto('');
                setIsMutating(false);
                router.refresh();
                setModal(false);
            } catch (error: any) {
                setIsMutating(false);
                router.refresh();
            }
        };
    
    return (
        <div className='font-montserrat'>
            <button className="btn text-white bg-blue-primary hover:bg-blue-600 border-none text-sm font-medium" onClick={handleChange}>
                <FaPlus size='20'/>
            </button>
            <input
                type="checkbox"
                checked={modal}
                onChange={handleChange}
                className="modal-toggle"
            />
            <div className="modal">
                <div className="modal-box bg-white border-slate-950">
                    <h3 className="font-bold text-lg text-slate-800">Add New Employee</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label font-bold">NIP</label>
                            <input
                                type="text"
                                value={nip}
                                onChange={(e) => setNip(e.target.value)}
                                className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                                placeholder="NIP"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">NIK</label>
                            <input
                                type="text"
                                value={nik}
                                onChange={(e) => setNik(e.target.value)}
                                className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                                placeholder="NIK"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Name</label>
                            <input
                                type="text"
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                                className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                                placeholder="Nama"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Gender</label>
                            <select 
                                value={jenisKelamin}
                                onChange={(e) => setJenisKelamin(e.target.value)}
                                className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                                placeholder="Gender"
                            >
                                    <option value={0}>Choose Gender</option>
                                <option value="1">Laki Laki</option>
                                <option value="2">Perempuan</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Nomor Telepon</label>
                            <input
                                type="number"
                                value={telepon}
                                onChange={(e) => setTelepon(e.target.value)}
                                className="input w-full input-bordered"
                                placeholder="Nomor Telepon"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Alamat</label>
                            <input
                                type="text"
                                value={alamat}
                                onChange={(e) => setAlamat(e.target.value)}
                                className="input w-full input-bordered"
                                placeholder="Alamat"
                            />
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleChange}>
                                Close
                            </button>
                            {!isMutating ? (
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            ) : (
                                <button type="button" className="btn loading">
                                    Submit loading ...
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddKaryawan