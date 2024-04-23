"use client"

import SweetAlert from '@/app/components/sweetAlert';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'


const API_URL = (`${process.env.NEXT_PUBLIC_API_URL}`)
const downloadPdf = async (id: number) => {
    try {
        const response: any = await axios.get(`${API_URL}/cetak-nota/${id}`, {
                responseType: "blob",
                headers: {
                    Accept: "application/pdf",
                },
            }
        );


        return response
    } catch (error: any) {
        return error
    }
}

const ExportPDF = ({id}: {id: number}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState<any>(null);
    const [message, setMessage] = useState<any>(null);

    const router = useRouter()

    const handleDownloadPDF = async () => {

        const response = await downloadPdf(id);

        console.log(response)
        setStatus(response.status)
        if (response.status == 200) {
            const blob = await response.data;
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `faktur`); 
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);

            setIsLoading(false);
            setMessage("Download data berhasil");
        } else {
            setIsLoading(false);
            setMessage('Download data gagal');
        }
    }

    const resetState = () => {
        setStatus(false)
        router.refresh()
        location.reload()
    }
    

    return (
        <div>
            <button className="p-2 rounded-md text-white bg-red-500 hover:bg-red-600 border-none text-sm font-medium" onClick={handleDownloadPDF}>
                {isLoading ? 'Mendownload...' : 'Export Pdf'}
            </button>

            {status && <SweetAlert status={status} message={message} isTransaksi={false} setStatus={setStatus} resetState={resetState}/>}
        </div>
    )
}

export default ExportPDF