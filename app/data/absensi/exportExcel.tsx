'use client'

import React, {useState} from 'react'
import axios from 'axios'
import { SiMicrosoftexcel } from "react-icons/si";
import SweetAlert from '@/app/components/sweetAlert';

const API_URL = (`${process.env.NEXT_PUBLIC_API_URL}`)
const ExportExcel = () => {
    const [isMutating, setIsMutating] = useState(false)
    const [status, setStatus] = useState<any>(null);
    const [message, setMessage] = useState<any>(null);
    
    const handleExport = async () => {
        try {
            const response = await axios.get(`${API_URL}/absensi-excel`, {
                responseType: "blob",
                headers: {
                    Accept: "application/excel",
                },
            });
            setStatus(response.status)
            if (response.status == 200) {
                const url = window.URL.createObjectURL(new Blob([response.data]))
                const excel = document.createElement('a');
                excel.href = url;
                excel.download = 'absensi_excel.xlsx';
    
                document.body.appendChild(excel);
                excel.click();
                window.URL.revokeObjectURL(url);
                setIsMutating(false);
                setMessage("Download data berhasil");
            } else {
                setIsMutating(false);
                setMessage('Download data gagal');
            }
        } catch (error: any) {
            console.error('Error exporting data: ', error)
        }
    }

  return (
    <div>
        <button onClick={handleExport} className='p-2 rounded-md text-white bg-green-600 hover:bg-green-700 border-none text-sm font-medium'>
            {isMutating ? 'Mendownload...' : <span className='flex gap-1'><SiMicrosoftexcel size={20}/> Export</span>} 
        </button>
        {status && <SweetAlert status={status} message={message} isTransaksi={false} setStatus={setStatus}/>}
    </div>
  )
}

export default ExportExcel