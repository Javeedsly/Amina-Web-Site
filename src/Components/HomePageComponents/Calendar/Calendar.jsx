import React, { useEffect, useRef, useState } from 'react';
import './Calendar.scss';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css/pagination';

import eventImg1 from '../../../Image/WhatsApp Image 2026-08-09 at 14.07.49.jpeg';
import eventImg2 from '../../../Image/WhatsApp Image 2026-08-09 at 14.07.49 (2).jpeg';
import eventImg3 from '../../../Image/WhatsApp Image 2026-08-09 at 14.07.49 (1).jpeg';
import eventImg4 from '../../../Image/WhatsApp Image 2026-08-09 at 14.07.49 (3).jpeg';

const events = [
    {
        id: 1,
        image: eventImg3,
        title: 'Ənənəvi Yayladağı Türkiyə Çempionatı',
        location: 'Devrent Sosyal Tesisleri, Yayladağı / Hatay',
        start: '2026-08-09T10:00:00',
        dateLabel: '9 Avqust 2026',
    },
    {
        id: 2,
        image: eventImg1,
        title: 'II Dünya Böyüklər Gushtingiri Çempionatı',
        location: 'Dushanbe, Tacikistan',
        start: '2026-08-13T00:00:00',
        dateLabel: '13–17 Avqust 2026',
    },
    {
        id: 3,
        image: eventImg2,
        title: 'Karakucak Güreşi Dünya Şampionatı',
        location: 'Bağlum Şəhit Hüseyin Demirtaş Stadionu, Keçiören / Ankara',
        start: '2026-08-16T10:30:00',
        dateLabel: '16 Avqust 2026',
    },
    {
        id: 4,
        image: eventImg4,
        title: 'Qazaq Küreşi Dünya Çempionatı',
        location: 'Bakı İdman Sarayı, Bakı',
        start: '2026-08-22T00:00:00',
        dateLabel: '22–23 Avqust 2026',
    },
];

function getCountdown(target, now) {
    const diff = new Date(target).getTime() - now;

    if (diff <= 0) {
        return { started: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { started: false, days, hours, minutes, seconds };
}

function Calendar() {
    const swiperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [now, setNow] = useState(Date.now());

    useEffect(() => {
        const timer = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleSelectDate = (index) => {
        setActiveIndex(index);
        if (swiperRef.current) {
            swiperRef.current.slideToLoop(index);
        }
    };

    return (
        <section id='calendar'>
            <div className="calendarHead">
                <h2>Yaxın Tədbirlər</h2>
                <p>Tarixi seçərək tədbirlər arasında keçid edin</p>
            </div>

            <div className="datePills">
                {events.map((item, index) => (
                    <button
                        key={item.id}
                        className={`datePill ${activeIndex === index ? 'active' : ''}`}
                        onClick={() => handleSelectDate(index)}
                    >
                        {item.dateLabel}
                    </button>
                ))}
            </div>

            <Swiper className="mySwiper"
                modules={[Autoplay, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                speed={900}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                loop={true}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
                {
                    events.map((item) => {
                        const countdown = getCountdown(item.start, now);
                        return (
                            <SwiperSlide key={item.id}>
                                <div className="leftBox">
                                    <img src={item.image} alt={item.title} />
                                </div>
                                <div className="rightBox">
                                    <div className="textBox">
                                        <p>{item.dateLabel}</p>
                                        <span>{item.title}</span>
                                        <small>{item.location}</small>
                                        {countdown.started ? (
                                            <div className="countdown started">Tədbir başlayıb!</div>
                                        ) : (
                                            <div className="countdown">
                                                <div className="countUnit">
                                                    <strong>{countdown.days}</strong>
                                                    <span>gün</span>
                                                </div>
                                                <div className="countUnit">
                                                    <strong>{countdown.hours}</strong>
                                                    <span>saat</span>
                                                </div>
                                                <div className="countUnit">
                                                    <strong>{countdown.minutes}</strong>
                                                    <span>dəq</span>
                                                </div>
                                                <div className="countUnit">
                                                    <strong>{countdown.seconds}</strong>
                                                    <span>san</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </section>
    );
}

export default Calendar;
