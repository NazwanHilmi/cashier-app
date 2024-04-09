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
}

const API_URL = "http://127.0.0.1:8000/api";
const DeleteMeja = (meja: Meja) => {
    const [modal, setModal] = useState(false);
    const [nomorMeja, setNomorMeja] = useState("");
    const [isMutating, setIsMutating] = useState(false);
    const router = useRouter();
    const handleChange = () => setModal(!modal);
    const handleDelete = async (mejaId: Number) => {
        setIsMutating(true);
        let params = { id: mejaId }
        let endpoint = `${API_URL}/meja/${mejaId}`;
        const data = { 
            nomor_meja:  nomorMeja,
        };
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
                        Are sure to delete {meja.nomor_meja} ?
                    </h3>
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleChange}>
                            Close
                        </button>
                        {!isMutating ? (
                            <button
                                type="button"
                                onClick={() => handleDelete(meja.id)}
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

export default DeleteMeja;
