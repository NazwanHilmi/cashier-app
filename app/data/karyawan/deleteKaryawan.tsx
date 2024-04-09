"use client";
import React, { SyntheticEvent, use } from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Pelanggan = {
    id: number;
    nama: string;
    email: string;
    nomor_telepon: string;
    alamat: string;
}

const API_URL = "http://127.0.0.1:8000/api";
const DeletePelanggan = (pelanggan: Pelanggan) => {
    const [modal, setModal] = useState(false);
    const [nama, setNama] = useState("")
    const [isMutating, setIsMutating] = useState(false);
    const router = useRouter();
    const handleChange = () => setModal(!modal);
    const handleDelete = async (pelangganId: Number) => {
        setIsMutating(true);
        let params = { id: pelangganId }
        let endpoint = `${API_URL}/pelanggan/${pelangganId}`;
        const data = { nama: nama };
        await axios.delete(endpoint);

        setIsMutating(false);
        router.refresh();
        setModal(false);
    };
    return (
        <div>
            <button className="btn" onClick={handleChange}>
                Delete
            </button>
            <input
                type="checkbox"
                checked={modal}
                onChange={handleChange}
                className="modal-toggle"
            />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">
                        Are sure to delete {pelanggan.nama} ?
                    </h3>
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleChange}>
                            Close
                        </button>
                        {!isMutating ? (
                            <button
                                type="button"
                                onClick={() => handleDelete(pelanggan.id)}
                                className="btn btn-primary"
                            >
                                Delete
                            </button>
                        ) : (
                            <button type="button" className="btn loading">
                                Delete loading ...
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeletePelanggan;
