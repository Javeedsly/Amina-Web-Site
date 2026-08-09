import React, { useEffect, useState } from 'react'
import './Header.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { Navigation, Autoplay, EffectFade, Pagination } from 'swiper/modules';
import axios from 'axios'
import { Link } from 'react-router-dom';

import heroImg1 from '../../../Image/WhatsApp Image 2026-08-09 at 14.07.49.jpeg'
import heroImg2 from '../../../Image/WhatsApp Image 2026-08-09 at 14.07.49 (1).jpeg'
import heroImg3 from '../../../Image/WhatsApp Image 2026-08-09 at 14.07.49 (2).jpeg'
import heroImg4 from '../../../Image/WhatsApp Image 2026-08-09 at 14.07.49 (3).jpeg'

const heroSlides = [
    {
        image: heroImg1,
        title: 'Gushtingiri Dünya Çempionatı',
        subtitle: 'Dushanbe 2026 · 13–17 Avqust',
    },
    {
        image: heroImg4,
        title: 'Qazaq Küreşi Dünya Çempionatı',
        subtitle: 'Bakı İdman Sarayı · 22–23 Avqust',
    },
    {
        image: heroImg2,
        title: 'Karakucak Güreşi Dünya Şampionatı',
        subtitle: 'Keçiören, Ankara · 16 Avqust',
    },
    {
        image: heroImg3,
        title: 'Ənənəvi Yayladağı Türkiyə Çempionatı',
        subtitle: 'Hatay · 9 Avqust',
    },
]

function Header() {
    const [NewsCart, setNewsCart] = useState([])
    async function GetNewsData() {
        const res = await axios.get("https://amina-back-end.onrender.com/xeberler")
        setNewsCart(res.data)
    }
    useEffect(() => {
        GetNewsData()
    }, [])
    return (
        <header>
            <div className="heroBanner">
                <Swiper
                    modules={[Autoplay, EffectFade, Pagination]}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    speed={1200}
                    loop={true}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    className="heroSwiper"
                >
                    {heroSlides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            {({ isActive }) => (
                                <div className="heroSlide">
                                    <img
                                        className={isActive ? 'kenburns' : ''}
                                        src={slide.image}
                                        alt={slide.title}
                                    />
                                    <div className="heroOverlay" />
                                    <div className={`heroText ${isActive ? 'reveal' : ''}`}>
                                        <span className="heroTag">Yaxın Tədbir</span>
                                        <h2>{slide.title}</h2>
                                        <p>{slide.subtitle}</p>
                                        <a href="#calendar" className="heroBtn">Təqvimə Bax</a>
                                    </div>
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <Swiper navigation={true} loop={true} modules={[Navigation]} className="mySwiper">
                <SwiperSlide style={{ display: "none" }}></SwiperSlide>
                {
                    NewsCart && NewsCart
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .slice(0, 4)
                        .map((item, index) => (
                            <SwiperSlide>
                                <div className="swiperBox" key={index}>
                                    <div className="leftBox">
                                        <p>{item.title}</p>
                                        <Link to={`news/${item.name}`}>
                                            <button>Daha Ətraflı </button>
                                        </Link>
                                    </div>
                                    <div className="rightBox">
                                        <img src={item.image1} alt="" />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                }
            </Swiper>
        </header>
    )
}

export default Header