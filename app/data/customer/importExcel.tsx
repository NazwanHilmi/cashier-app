'use client'

import React, {useState} from 'react'
import { useRouter } from "next/navigation";
import axios from 'axios'
import SweetAlert from '@/app/components/sweetAlert';
import { SiMicrosoftexcel } from "react-icons/si";

const API_URL = (`${process.env.NEXT_PUBLIC_API_URL}`)

const importData = async (formData: FormData) => {
    try {

        const response = await axios.post(`${API_URL}/customer/import-excel`, formData, {
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

const ImportExcel = () => {
    const [isMutating, setIsMutating] = useState(false)
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
            setIsMutating(false);
            setMessage("Import data berhasil");
        } else {
            setIsMutating(false);
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
        <button onClick={handleModal} className='p-2 rounded-md text-white bg-green-500 hover:bg-green-700 border-none text-sm font-medium'>
            <span className='flex gap-1'><SiMicrosoftexcel size={20}/> Import</span>
        </button>
        <input
                type="checkbox"
                checked={modal}
                onChange={handleModal}
                className="modal-toggle"
            />
             <div className="modal">
                <div className="modal-box bg-white border-slate-950">
                    <h3 className="font-bold text-lg text-slate-800">Import Data</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label htmlFor='nama_kategori' className="label font-bold text-slate-800">Pilih File</label>
                            <input
                                type="file"
                                id='nama_kategori'
                                onChange={handleChangeFile}
                                className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                                placeholder="Name Category"
                            />
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn btn-sm bg-close-btn border-none hover:bg-slate-600 font-medium text-sm text-white" onClick={handleModal}>
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
            {status && <SweetAlert status={status} message={message} isTransaksi={false} setStatus={setStatus} resetState={resetState} />}

    </div>
  )
}

export default ImportExcel