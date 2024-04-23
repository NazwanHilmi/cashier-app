"use client";
import React, { SyntheticEvent, use } from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Meja = {
    id: number;
    nomor_meja: number;
    kapasitas: number;
    status: string;
};

const API_URL = "http://127.0.0.1:8000/api";
const EditMeja = (meja: Meja) => {
    const [modal, setModal] = useState(false);
    const [nomorMeja, setNomorMeja] = useState(meja.nomor_meja);
    const [kapasitas, setKapasitas] = useState(meja.kapasitas);
    const [status, setStatus] = useState(meja.status);
    const [statusOptions, setStatusOptions] = useState(["Terpakai", "Tersedia"]);
    const [isMutating, setIsMutating] = useState(false);
    const router = useRouter();
    const handleChange = () => setModal(!modal);
    const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsMutating(true);
    let endpoint = `${API_URL}/meja/${meja.id}`;
    const data = {
        nomor_meja: nomorMeja,
        kapasitas: kapasitas,
        status: status,
    };
        await axios.patch(endpoint, data);
        setNomorMeja(Number);
        setKapasitas(Number);
        setStatus("");
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
            <h3 className="font-bold text-lg">Edit Meja</h3>
            <form onSubmit={handleUpdate}>
                <div className="form-control">
                <label className="label font-bold">Nomor Meja</label>
                <input
                    type="number"
                    value={nomorMeja}
                    onChange={(e) => setNomorMeja(Number(e.target.value))}
                    className="input w-full input-bordered"
                    placeholder="Masukan Nomor Meja"
                />
                </div>
                <div className="form-control">
                <label className="label font-bold">Kapasitas</label>
                <input
                    type="number"
                    value={kapasitas}
                    onChange={(e) => setKapasitas(Number(e.target.value))}
                    className="input w-full input-bordered"
                    placeholder="Masukan Kapasitas"
                />
                </div>
                <div className="form-control">
                <label className="label font-bold">Status</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="input w-full input-bordered"
                >
                    <option value="" disabled>
                    Pilih Status
                    </option>
                    {statusOptions.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                    ))}
                </select>
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

export default EditMeja;
