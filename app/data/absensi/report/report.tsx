'use client'

import React, { useState } from 'react';
import axios from 'axios';

type Absensi = {
    id: number;
    nama: string;
    tanggal_masuk: number;
    waktu_masuk: string;
    status: string;
    waktu_keluar: string;
}

const ReportAbsensi = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reportData, setReportData] = useState<Absensi[]>([]);

    const handleGenerateReport = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/absensi/report`, {
                params: {
                    startDate,
                    endDate
                }
            });
            setReportData(response.data);
        } catch (error) {
            console.error('Error fetching report data:', error);
        }
    };

    return (
        <div className="px-10 py-5">
            <h1 className="text-lg font-montserrat font-semibold">Laporan Absensi</h1>
            <div className="mt-5 flex gap-5">
                <div className='form-control'>
                    <label htmlFor="start_date" className="block font-semibold">Tanggal Mulai:</label>
                    <input type="date" id="start_date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="input input-sm bg-white input-bordered text-sm mt-1" />
                    <style jsx>{`
                            .form-control input[type="date"]::-webkit-calendar-picker-indicator {
                                filter: invert(100%);
                            }
                    `}</style>
                </div>
                <div className='form-control'>
                    <label htmlFor="end_date" className="block font-semibold">Tanggal Selesai:</label>
                    <input type="date" id="end_date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="input input-sm bg-white input-bordered text-sm mt-1" />
                    <style jsx>{`
                            .form-control input[type="date"]::-webkit-calendar-picker-indicator {
                                filter: invert(100%);
                            }
                    `}</style>
                </div>
                <div>
                    <button onClick={handleGenerateReport} className="btn btn-sm bg-blue-500 text-white mt-7">Generate Laporan</button>
                </div>
            </div>
            <div className="mt-5">
                <h2 className="text-lg font-semibold">Hasil Laporan:</h2>
                <table className="table mt-2">
                    <thead>
                        <tr className="text-white bg-gray-700">
                            <th className="text-xs">No.</th>
                            <th className="text-xs">Nama Karyawan</th>
                            <th className="text-xs">Tanggal Masuk</th>
                            <th className="text-xs">Waktu Masuk</th>
                            <th className="text-xs">Status</th>
                            <th className="text-xs">Waktu Keluar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportData.map((absensi, index) => (
                            <tr key={absensi.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                <td>{index + 1}</td>
                                <td>{absensi.nama}</td>
                                <td>{absensi.tanggal_masuk}</td>
                                <td>{absensi.waktu_masuk}</td>
                                <td>{absensi.status}</td>
                                <td>{absensi.waktu_keluar}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportAbsensi;
