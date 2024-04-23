"use client"

import SweetAlert from '@/app/components/sweetAlert';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const importData = async (formData: FormData) => {
    try {

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/import-excel `, formData, {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            }
        })

        return response
    } catch (error: any) {
        return error
    }
}

const ImportProduct = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState<any>(null);
    const [message, setMessage] = useState<any>(null);
    const [modal, setModal] = useState(false)
    const [file, setFile] = useState<undefined | Blob>(undefined)

    const router = useRouter()

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('file', file as Blob)

        const response = await importData(formData);
        setStatus(response.status)
        console.log(response)
        if (response.status == 200) {
            setIsLoading(false);
            setMessage("Import data berhasil");
        } else {
            setIsLoading(false);
            setMessage('Import data gagal');
        }
    }

    const handleModal = () => {
        setModal(!modal);
    }

    const handleChangeFile = (event: any) => {
        const file = event.target.files[0];

        if (file) {
            setFile(file);

        } else {
            return
        }
    }

    const resetState = () => {
        setModal(false);
        setStatus(false)
        location.reload()
    }

    return (
        <div>
            <button className="p-2 rounded-md text-white bg-blue-primary hover:bg-blue-600 border-none text-sm font-medium" onClick={handleModal}>
                {isLoading ? 'Mendownload...' : 'Import Excel'}
            </button>
            <input type="checkbox" checked={modal} onChange={handleModal} className='modal-toggle' />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5">Import Data</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="nama_produk" className="text-sm font-semibold block mb-2">Pilih File Data</label>
                            <input type="file" id='nama_produk' onChange={handleChangeFile} className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="modal-action">
                            <button type='button' onClick={handleModal} className="btn btn-sm">Batal</button>

                            {isLoading ? (
                                <button type='button' className="btn btn-primary btn-sm">Menyimpan...</button>
                            ) : (
                                <button type='submit' onClick={handleModal} className="btn btn-primary btn-sm">Simpan</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
            {status && <SweetAlert status={status} message={message} isTransaksi={false} setStatus={setStatus} />}
        </div>
    )
}

export default ImportProduct