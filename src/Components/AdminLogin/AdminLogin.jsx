import React, { useContext, useState } from 'react'
import './AdminLogin.scss'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userContext } from '../../context/userContext';
import toast from 'react-hot-toast'; // Toast əlavə olundu

function AdminLogin() {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const { setUser } = useContext(userContext)

    const navigate = useNavigate();

    async function handleSubmitLogin(e) {
        e.preventDefault();
        
        // Boşluqları da yoxlayırıq (.trim())
        if (userName.trim().length === 0 || password.trim().length === 0) {
            toast.error("İstifadəçi adı və şifrə boş ola bilməz!");
            return;
        }
        
        try {
            const res = await axios.post("https://amina-back-end.onrender.com/login", {
                username: userName,
                password: password,
            });

            // Əgər API tokeni obyektin içində qaytarırsa res.data.token, əks halda res.data
            const token = res.data?.token || res.data; 
            const decoded = jwtDecode(token);
            
            sessionStorage.setItem('user', JSON.stringify(decoded));
            localStorage.setItem('token', token);
            setUser(decoded);
            
            toast.success("Uğurla giriş etdiniz!");
            navigate("/admin");

        } catch (error) {
            toast.error("Məlumatlar yanlışdır və ya server xətası baş verdi.");
            console.error(error);
        }
    }

    return (
        <div className='adminLogin'>
            <form onSubmit={handleSubmitLogin}>
                <label>Going Admin</label>
                <input type="text" onChange={(e) => setUserName(e.target.value)} placeholder='Admin...' />
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password...' />
                <button type='submit'>Go</button>
            </form>
        </div>
    )
}

export default AdminLogin