import React from 'react';
import PageLayout from '../Layout/PageLayout';
import './style.scss';

function Services(props) {

    const services = [
        { image: 'psikotes', title: 'Psikotes & Asesmen', desc: 'Layanan ini digunakan untuk memprediksi perilaku melalui sejumlah simulasi untuk mengukur kompetensi seseorang dalam menangani tanggung jawab sehingga dapat ditemukan area kekuatan maupun kompetensi yang perlu dikembangkan oleh individu tersebut.' },
        { image: 'recruitment', title: 'Recruitment Services', desc: 'Layanan untuk staff search / mass recruitment, yaitu pencarian kandidat yang kompeten untuk memenuhi kebutuhan perusahaan. Lingkup kerja Recruitment Service dimulai dari mencari kandidat, menyeleksi, sampai klien memilih satu orang untuk mengisi satu posisi.' },
        { image: 'organizational', title: 'Organizational Development', desc: 'Organizational Development (OD) adalah suatu kerangka kerja yang disusun untuk pengembangan perusahaan melalui analisis visi, misi, tata nilai organisasi, sistem manajemen, struktur organisasi, analisa tanggung jawab, dan indikator keberhasilan perusahaan dengan hasil kinerja setiap karyawan dan pencapaian perusahaan.' },
        { image: 'experimental', title: 'Experimental Training', desc: 'Pelatihan merupakan salah satu intervensi yang bisa diberikan untuk meningkatkan pengetahuan, keterampilan, dan mengubah perilaku. Kami menyesuaikan layanan pelatihan dengan kondisi perusahaan berdasarkan analisis kebutuhan pelatihan.' },
        { image: 'konseling', title: 'Konseling', desc: 'Layanan konseling intensif yang dilakukan secara personal untuk menggali situasi dan permasalahan, potensi dan tantangan, serta komitmen dan motivasi setiap individu dalam berkarir di perusahaan' },
        { image: 'coach', title: 'Coach & Mentoring', desc: 'Coaching & Mentoring adalah layanan pendampingan oleh tenaga profesional untuk membantu mengatasi masalah yang berkaitan dengan kinerja, produktivitas dan wawasan seputar dunia kerja' },
    ];

    return (<PageLayout>
        <section className="services" style={{ marginBottom: 70 }} id="services">
            <div className="container py-5">
                <div className="row justify-content-center text-center">
                    <div className="col-12 services-title">
                        <h2 className="h1">Layanan Kami</h2>
                        <hr className="hr-main mb-5" />
                    </div>
                    {services.map((srvc) => {
                        return (
                            <div className="col-sm-12 col-md-4 col-lg-4 services-item">
                                <img className="mt-5" src={require(`../../../assets/img/services/${srvc.image}.png`)} alt="Product Human Resource Information System Illustration" width="50%" />
                                <h5>{srvc.title}</h5>
                                <p>{srvc.desc}</p>
                            </div>
                        )
                    })}
                </div>

            </div>
        </section>
    </PageLayout>);
}

// function ComingSoonBox() {
//     return (<div className="bg-stripe" style={{ paddingTop: '100%', marginBottom: '1rem', position: 'relative' }}>
//         <div style={{ position: 'absolute', top: '25%', left: '25%', right: 0,   bottom: 0, transform: 'translate(-17.5%, -17.5%) rotate(-45deg)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//             <span className="h5" style={{ color: '#AEAEAE', lineHeight: 0, margin: 0 }}>COMING SOON</span>
//         </div>
//     </div>);
// }

export default Services;