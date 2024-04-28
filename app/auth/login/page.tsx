"use client"

import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { SyntheticEvent, useState } from 'react'
import { IoEye, IoEyeOff } from "react-icons/io5";

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | boolean>(false)
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const { push } = useRouter()

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    
    const handleLogin = async (event: SyntheticEvent) => {
        event.preventDefault()
        try{
            setIsLoading(true)
            const res:any = await signIn("credentials", {
                redirect: false,
                email: email,
                password: password,
                callbackUrl: '/'
            })

            if (res.ok && res.status == 200){

                const updateSession = await getSession();
                push(`${updateSession?.user}/category`)
            }else {
                setIsLoading(false)

                switch (res.error){
                    case 'Request failed with status code 422':
                        setError('Email atau password salah')
                        break
                    case 'Request failed with status code 400':
                        setError('Email atau password salah')
                        break
                    default:
                        setError('Terjadi Kesalahan')
                }
            }
        } catch(error:any){
            setIsLoading(false);
            setError('Terjadi kesalahan!')
        }
    }


    return (
        <div className="p-10 min-h-screen flex justify-center items-center">
            <div className="rounded-xl w-2/6 overflow-hidden shadow-lg">
                <div className="text-xl text-center font-bold bg-blue-dark border-b-white border p-3 text-white">
                    LOGIN
                </div>
                <div className="px-10 py-5 bg-blue-dark">
                <form onSubmit={handleLogin}>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                        <input type="email" value={email} disabled={isLoading} onChange={(e) => setEmail(e.target.value)} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 bg-white text-black focus:outline-none focus:ring-white focus:border-white" placeholder="example@gmail.com" required />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                        <div className="relative w-full">
                            <input type={showPassword ? "text" : "password"} disabled={isLoading} value={password} onChange={(e) => setPassword(e.target.value)} className="shadow-sm rounded-md w-full px-3 py-2 border bg-white text-black border-gray-300 focus:outline-none focus:ring-white focus:border-white" placeholder="Enter your password" required />
                            {showPassword ? <IoEye size={22} onClick={handleShowPassword} className='cursor-pointer absolute right-1 top-1/2 -translate-y-1/2 text-blue-400 text-md' /> : <IoEyeOff size={22} onClick={handleShowPassword} className='cursor-pointer absolute right-1 top-1/2 -translate-y-1/2 text-blue-400 text-md' />}
                        </div>
                    </div>
                    <div className='flex justify-end w-full'>
                        <button type="submit" className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black focus:outline-none focus:ring-2 focus:ring-offset-2 ${isLoading ? 'bg-black opacity-80' : 'bg-white'}`} disabled={isLoading}>
                            {isLoading ? <div className="animate-spin w-4 h-4 border-t-2 border-b-2 border-t-white border-b-white rounded-full"></div> : 'Masuk'}
                        </button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;