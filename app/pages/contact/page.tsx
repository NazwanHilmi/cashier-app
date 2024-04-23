import Image from 'next/image'
import React from 'react'
import AyahLogo from "/public/images/white-ayahcoding.png";

const contactPage = () => {
    return (
        <div className='w-full h-full rounded p-12 bg-slate-200 font-montserrat'>
          <div className='flex items-center content-center justify-between'>
            <div className='bg-white rounded-md p-12'>
              <form action="">
                <div className='form-control pt-2'>
                  <label htmlFor="" className='label font-bold'>Nama</label>
                  <input type="text" className='input mr-24 w-full input-bordered bg-white text-slate-800 border-slate-300'  placeholder="Ucup"/>
                </div>
                <div className='form-control pt-2'>
                  <label htmlFor="" className='label font-bold'>Email</label>
                  <input type="text" className='input input-bordered bg-white text-slate-800 border-slate-300'  placeholder="orang@gmail.com"/>
                </div>
                <div className='form-control pt-2'>
                  <label htmlFor="" className='label font-bold'>Message</label>
                  <textarea className='input w-full input-bordered bg-white text-slate-800 border-slate-300' style={{ height: '150px' }}></textarea>
                </div>
                <div className="modal-action">
                    <button type="button" className="btn btn-sm bg-close-btn border-none hover:bg-slate-600 font-medium text-sm text-white">
                      Submit
                    </button>
                </div>
              </form>
            </div>

            <div className=''>
              {/* <Image src={AyahLogo} alt="Ayah Coding" /> */}
              <p> Jalan Siliwangi 41 43212 Cianjur Jawa Barat</p>
            </div>

          </div>
        </div>
  )
}

export default contactPage