'use client'

import React, { useState } from 'react';
import Image from 'next/image'
import Kantor from "/public/images/office.jpg";
import axios from 'axios';
import GoogleMapEmbed from './maps';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/send-email', formData);

      if (response.status === 200) {
        alert('Pesan berhasil dikirim!');
        // Reset form
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Gagal mengirim pesan');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal mengirim pesan');
    }
  };

  return (
    <div className='w-full h-full rounded p-12 bg-slate-200 font-montserrat'>
      <div className='flex items-center content-center justify-between bg-white rounded-md'>
        <div className='bg-sky-600 rounded-md p-12'>
          <form onSubmit={handleSubmit}>
            <div className='form-control pt-2'>
              <label htmlFor="name" className='label font-bold text-white'>Nama</label>
              <input 
                type="text" 
                id='name'
                name='name'
                className='input mr-24 w-full input-bordered bg-white text-slate-800 border-slate-300'
                placeholder="Ucup"
                value={formData.name}
                onChange={handleChange}
                required
                />
            </div>
            <div className='form-control pt-2'>
              <label htmlFor="email" className='label font-bold text-white'>Email</label>
              <input 
                type="email"
                id="email"
                name="email"
                className='input w-full input-bordered bg-white text-slate-800 border-slate-300'
                placeholder="orang@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
                />
            </div>
            <div className='form-control pt-2'>
              <label htmlFor="message" className='label font-bold text-white'>Message</label>
              <textarea
                id="message"
                name="message"
                className='input w-full input-bordered bg-white text-slate-800 border-slate-300 h-40'
                style={{ height: '150px' }}
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="modal-action">
                <button type="submit" className="btn btn-sm bg-close-btn border-none hover:bg-slate-600 font-medium text-sm text-white">
                  Submit
                </button>
            </div>
          </form>
        </div>

        <div className='pr-6'>
          <div className='text-center'>
          {/* <Image src={Kantor} alt="My Kantor" width={150} height={140}/> */}
            <GoogleMapEmbed />
            <p> Jalan Siliwangi 41 43212 Cianjur Jawa Barat</p>

          </div>
        </div>

      </div>
    </div>
  )
}

export default ContactPage;
