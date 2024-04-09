"use client"

import React, { SyntheticEvent } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import SweetAlert from '@/app/components/sweetAlert';


type Menu = {
    id: number;
    nama_menu: string;
}

type Stok = {
    id: number;
    jumlah: number;
    menu: {
        id: number,
        nama: string
    }
}

const API_URL = (`${process.env.NEXT_PUBLIC_API_URL}`)
const AddStok = ({menu, stok}: {menu: Menu[], stok: Stok[]}) => {
    const [modal, setModal] = useState(false)
    const [jumlah, setJumlah] = useState(0)
    const [menuId, setMenuId] = useState(0)
    const [status, setStatus] = useState<any>(null)
    const [message, setMessage] = useState<any>(null)
    const [isMutating, setIsMutating] = useState(false)
    const router = useRouter()
    const handleChange = () => {
        setModal(!modal);
        setJumlah(0);
        setMenuId(0);
    };

    const menuItem = menu.filter(menuItem => {
        return !stok.some(stokItem => stokItem.menu.id === menuItem.id)
    })

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        setIsMutating(true);
        let endpoint = `${API_URL}/stok`;
        const data = {
            'jumlah': jumlah,
            'menu_id': menuId,
        };
        try {
            const res = await axios.post(endpoint, data);
            setJumlah(0);
            setMenuId(0);
            setIsMutating(false);
            router.refresh();

            setMessage(res.data?.message)
            setStatus(res.status)

            setModal(false);
        } catch (error: any) {
            setIsMutating(false);
            setMessage(error.response.status)
            setStatus("Stok gagal ditambahkan")
            router.refresh();
        }
    };

    return (
        <div className='font-montserrat'>
            <button className="p-2 rounded-md text-white bg-blue-primary hover:bg-blue-600 border-none text-sm font-medium" onClick={handleChange}>
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
                    <h3 className="font-bold text-lg text-slate-800">Add New Stok</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label font-bold">Amount</label>
                            <input
                                type="number"
                                value={jumlah}
                                min="0"
                                onChange={(e) => setJumlah(parseInt(e.target.value))}
                                className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                                placeholder="Amount"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Menu</label>
                            <div className="relative">
                                <select
                                    value={menuId}
                                    onChange={(e) => setMenuId(parseInt(e.target.value))}
                                    className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                                    defaultValue={0}
                                >
                                    <option value={0}>Choose Menu</option>
                                    {menuItem.map((item, index) =>(
                                        <option value={item.id} key={index}>
                                            {item.nama_menu}
                                        </option>
                                    ))}
                                </select>
                            </div>
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
            {status && <SweetAlert status={status} message={message} isTransaksi={false} setStatus={setStatus} />}
        </div>
    );
};

export default AddStok;