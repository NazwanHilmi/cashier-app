"use client"

import React, { SyntheticEvent, ChangeEvent, useState } from 'react'
import axios from 'axios';
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import SweetAlert from '@/app/components/sweetAlert';


type Type = {
    id: number,
    nama_jenis: string
    category: {
        id: number;
        nama: string;
    }
}

type Category = {
    id: number,
    nama: string
}

const API_URL = (`${process.env.NEXT_PUBLIC_API_URL}`)
const AddMenu = ({ type, category } : { type: Type[], category: Category[] }) => {
    const [modal, setModal] = useState(false)
    const [isMutating, setIsMutating] = useState(false)
    const [namaMenu, setNamaMenu] = useState("")
    const [harga, setHarga] = useState("")
    const [image, setImage] = useState(null as File | null | "");
    const [deskripsi, setDeskripsi] = useState("")
    const [typeId, setTypeId] = useState("")
    const [categoryId, setCategoryId] = useState("");
    const [filteredTypes, setFilteredTypes] = useState<Type[]>([]);
    const [status, setStatus] = useState<any>(null)
    const [message, setMessage] = useState<any>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const router = useRouter();

    const handleChange = () => {
        setModal(!modal);
        setNamaMenu('');
        setHarga('');
        setImage('');
        setImagePreview(null);
        setDeskripsi('');
        setCategoryId('');
        setTypeId('');
    };

    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedCategoryId = e.target.value;
        setCategoryId(selectedCategoryId);
    
        const filtered = type.filter(t => t.category.id === parseInt(selectedCategoryId));
        setFilteredTypes(filtered);
    };

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value: any = e.target;
        if (value.files && value.files[0]) {
            const selectedImage = value.files[0];
            setImage(selectedImage);
            const imageUrl = URL.createObjectURL(selectedImage);
            setImagePreview(imageUrl)
        }
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        setIsMutating(true);

        let endpoint = `${API_URL}/menu`
        const formData = new FormData();
            formData.append('nama_menu', namaMenu);
            formData.append('harga', harga);
            formData.append('deskripsi', deskripsi);
            formData.append('type_id', typeId);
            if (image){
                formData.append('image', image);
            }
        
        try {
            const res = await axios.post(endpoint, formData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            });

            setModal(false)
            setNamaMenu('')
            setHarga('')
            setImage(null as File | null | "")
            setImagePreview(null);
            setDeskripsi('')
            setTypeId('')
            setCategoryId('')
            setIsMutating(false);

            setMessage(res.data?.message)
            setStatus(res.status)

            router.refresh()
        } catch (error : any) {
            setIsMutating(false);
            setMessage(error.response.status)
            setStatus("Menu gagal ditambahkan")
            router.refresh()
        }
        
    }

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
                    <h3 className="font-bold text-lg text-slate-800">Add New Menu</h3>
                    <form onSubmit={handleSubmit} >
                        <div className="form-control">
                            <label className="label font-bold">Name</label>
                            <input
                                type="text"
                                value={namaMenu}
                                onChange={(e) => setNamaMenu(e.target.value)}
                                className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                                placeholder="Menu Name"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Harga</label>
                            <input
                                type="number"
                                value={harga}
                                onChange={(e) => setHarga(e.target.value)}
                                className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                                placeholder="Harga"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Image</label>
                            <input 
                                type="file" 
                                name="image" 
                                onChange={handleChangeImage} 
                                className="bg-white border-slate-300"
                                />
                            {imagePreview && (
                                <img src={imagePreview} alt="Preview" className="mt-2 max-w-52 max-h-52" />
                            )}
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Deskripsi</label>
                            <textarea 
                                className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                                onChange={(e) => setDeskripsi(e.target.value)}
                                placeholder="Deskripsi">
                            </textarea>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Kategori</label>
                            <select className="select select-bordered w-full bg-white text-slate-800 border-slate-300" onChange={handleCategoryChange} defaultValue={0}>
                                <option value={0}>Select Category</option>
                                {category.map((item, index) => (
                                    <option value={item.id} key={index}>{item.nama}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Jenis</label>
                            <select className="select select-bordered w-full bg-white text-slate-800 border-slate-300 " onChange={(e) => setTypeId(e.target.value)} defaultValue={0}>
                                <option value={0}>Pilih Type</option>
                                {filteredTypes.map((item, index) => (
                                    <option value={item.id}key={index}>{item.nama_jenis}</option>
                                ))}
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
            {status && <SweetAlert status={status} message={message} isTransaksi={false} setStatus={setStatus} />}
        </div>
    );
}

export default AddMenu