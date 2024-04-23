"use client"
import React, { SyntheticEvent, use } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";

type Pelanggan = {
    id: number;
    nama: string;
    email: string;
    nomor_telepon: string;
    alamat: string;
}

const API_URL = 'http://127.0.0.1:8000/api'
const EditPelanggan = (pelanggan: Pelanggan) => {
const [modal, setModal] = useState(false);
const [nama, setNama] = useState(pelanggan.nama);
const [email, setEmail] = useState(pelanggan.email)
const [nomorTelepon, setNomorTelepon] = useState(pelanggan.nomor_telepon)
const [alamat, setAlamat] = useState(pelanggan.alamat)
const [isMutating, setIsMutating] = useState(false);
const router = useRouter();
const handleChange = () => setModal(!modal);
const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsMutating(true);
    let endpoint = `${API_URL}/pelanggan/${pelanggan.id}`;
    const data = { 
            nama: nama,
            email: email,
            nomor_telepon: nomorTelepon,
            alamat: alamat
        };
    await axios.patch(endpoint, data);
    setNama('')
    setAlamat('')
    setNomorTelepon('')
    setAlamat('')
    setIsMutating(false);
    router.refresh();
    setModal(false);
};

return (
    <div>
    <button className="btn" onClick={handleChange}>
        Edit
    </button>
    <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
    />
    <div className="modal">
        <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Category</h3>
        <form onSubmit={handleUpdate}>
        <div className="form-control">
                            <label className="label font-bold">Nama</label>
                            <input
                                type="text"
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                                className="input w-full input-bordered"
                                placeholder="Nama"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input w-full input-bordered"
                                placeholder="Email"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Image</label>
                            <input
                                type="text"
                                value={nomorTelepon}
                                onChange={(e) => setNomorTelepon(e.target.value)}
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
                <button type="submit" className="btn bg-gray-500">
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
};

export default EditPelanggan