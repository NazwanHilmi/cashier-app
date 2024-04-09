import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const SweetAlert = ({ status, message, isTransaksi, id, resetState, setStatus }: {status: number | boolean, message: string, isTransaksi: boolean, id?: number, resetState?: () => void, setStatus: React.Dispatch<React.SetStateAction<number | boolean>>} ) => {
    const router = useRouter()
useEffect(() => {
    Swal.fire({
        html: status === 200 ? `<strong>${message}</strong>` : `<strong>${message}</strong>`,
        icon: status === 200 ? 'success' : 'error',
        showDenyButton: true,
        showConfirmButton: isTransaksi,
        denyButtonText: 'OK',
        confirmButtonText: isTransaksi ? 'Cetak Faktur' : undefined
        }).then((result) => { 
            if (result.isConfirmed && resetState) {
                resetState()
            }else {
                setStatus(false)
                router.refresh();
            }
        });
    }, [status]);

    return null;
};

export default SweetAlert;
