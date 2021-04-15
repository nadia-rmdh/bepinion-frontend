import React, { useState } from 'react';
import PageLayout from '../Layout/PageLayout';
import { Carousel, CarouselItem } from 'reactstrap';
import items from './jobs';

function CareerPage(props) {
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [carouselAnimating, setCarouselAnimating] = useState(false);

    const next = () => {
        if (carouselAnimating) return;
        const nextIndex = carouselIndex === items.length - 1 ? 0 : carouselIndex + 1;
        setCarouselIndex(nextIndex);
    }

    const prev = () => {
        if (carouselAnimating) return;
        const prevIndex = carouselIndex === 0 ? items.length - 1 : carouselIndex - 1;
        setCarouselIndex(prevIndex)
    }

    const goto = (index) => {
        if (carouselAnimating) return;
        setCarouselIndex(index);
    }

    return (<PageLayout>
        <section className="careers" id="careers">
            <div className="container py-5">
                <h2 className="h2 text-center">Mari berkembang bersama kami<br /> dan mulai kesempatan karirmu</h2>
                <hr className="hr-main mb-5"/>
                <div className="d-flex flex-wrap justify-content-center mx-n1 mb-5">
                    {items.map((job, idx) => {
                        const buttonClass = `btn ${carouselIndex === idx ? 'btn-netis-primary' : 'btn-outline-netis-primary'} rounded-pill py-2 px-3`;
                        return (<div className="px-1 mb-3" key={job.name}>
                            <button
                                onClick={() => goto(idx)}
                                className={buttonClass}
                            >{job.name}
                            </button>
                        </div>)
                    })}
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <Carousel
                            activeIndex={carouselIndex}
                            next={next}
                            previous={prev}
                            interval={false}
                        >
                            {items.map(item => (
                                <CarouselItem
                                    key={item.name}
                                    onExiting={() => setCarouselAnimating(true)}
                                    onExited={() => setCarouselAnimating(false)}
                                >
                                    <div style={{ padding: '0 40px 20px 40px' }}>
                                        <JobDetailCard {...item}></JobDetailCard>
                                    </div>
                                </CarouselItem>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
        </section>
    </PageLayout>);
}

function JobDetailCard(props) {
    return (<div className="card rounded-12 shadow border-0">
    <div className="card-header bg-netis-primary text-white" style={{ borderRadius: '12px 12px 0 0' }}>
        <h3 className="h5 text-center mb-0">{props.name}</h3>
    </div>
    <div className="card-body">
        <p className="mt-3 mb-4">
Batas Pendaftaran pada tanggal <strong>{props.dueDate}</strong>
</p>
        <h4 className="mb-0">Kualifikasi</h4>
        <hr className="hr-main ml-0"/>
        <ul className="list-custom-check">
            {props.qualifications.map((item,index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
        <h4 className="mb-0 mt-5">Tanggung Jawab</h4>
        <hr className="hr-main ml-0"/>
        <ul className="list-custom-check">
            {props.responsibilities.map((item,index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
        <div className="text-center mt-5">
            <a target="_blank" rel="noreferrer noopener" className="btn btn-lg btn-netis-primary px-5" href="https://bit.ly/RekrutmenWidyaSkilloka">
                Daftar
            </a>
        </div>
    </div>
</div>);
}

export default CareerPage;