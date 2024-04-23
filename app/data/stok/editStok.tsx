"use client"
import React, { SyntheticEvent } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { TiEdit } from "react-icons/ti";
import SweetAlert from '@/app/components/sweetAlert';

type Stok = {
    id: number;
    jumlah: number;
    menu: {
        id: number,
        nama: string
    }
}

type Menu = {
    id: number;
    nama_menu: string;
}


    const API_URL = (`${process.env.NEXT_PUBLIC_API_URL}`)
    const EditStok = ({stok, menu} : {stok: Stok, menu: Menu[]}) => {
    const [modal, setModal] = useState(false);
    const [jumlah, setJumlah] = useState(stok.jumlah)
    const [menuId, setMenuId] = useState(stok.menu.id)
    const [status, setStatus] = useState<any>(null)
    const [message, setMessage] = useState<any>(null)
    const [isMutating, setIsMutating] = useState(false);

    const router = useRouter();

    const handleChange = () => {
        setModal(!modal);
    };

    const handleUpdate = async (e: SyntheticEvent) => {
        e.preventDefault();
    
        setIsMutating(true);
        let endpoint = `${API_URL}/stok/${stok.id}`;
        const data = {
            'jumlah': jumlah,
            'menu_id': menuId,
        };

        try {
            const res = await axios.patch(endpoint, data);
            setModal(false);
            setJumlah(jumlah);
            setMenuId(stok.menu.id);
            setIsMutating(false);

            setStatus(res.status)
            setMessage(res.data.message)
            
            router.refresh();
        } catch (error: any) {
            setIsMutating(false);
            setStatus(error.response.status)
            setMessage('Stok gagal diedit')
            router.refresh();
        }
    };

    return (
        <div>
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
            <h3 className="font-bold text-lg text-slate-800">Edit Stok {stok.menu.nama}</h3>
            <form onSubmit={handleUpdate}>
                        <div className="form-control">
                            <label className="label font-bold">Amount</label>
                            <input
                                type="number"
                                value={jumlah}
                                onChange={(e) => setJumlah(parseInt(e.target.value))}
                                className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                                placeholder="Amount"
                            />
                        </div>
                        {/* <div className="form-control">
                            <label className="label font-bold">Menu</label>
                            <div className="relative">
                                <select
                                    value={menuId}
                                    onChange={(e) => setMenuId(parseInt(e.target.value))}
                                    className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                                    defaultValue={stok.menu.id}
                                >
                                    <option value={0}>Choose Menu</option>
                                    {menu.map((item, index) =>(
                                        <option value={item.id} key={index}>
                                            {item.nama_menu}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div> */}
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
        {status && <SweetAlert status={status} message={message} isTransaksi={false} setStatus={setStatus} />}
        </div>
    );
};

export default EditStok