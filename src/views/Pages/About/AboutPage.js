import React from 'react';
import PageLayout from '../Layout/PageLayout';

function AboutPage(props) {
    return (<PageLayout>
        <section className="aboutPage py-5" id="aboutPage">
            <div className="container">
                <h1>Tentang Perusahaan</h1>
                <hr className="hr-main mr-auto ml-0" />
                <p>PT Widya Indonesia Sejahtera (Widya Skilloka) adalah perseroan terbatas yang bergerak sebagai HR Business Partner dengan berpartisipasi dalam perencanaan strategis pengembangan sumber daya manusia untuk mendukung keberhasilan setiap unit kerja perusahaan.</p>
                <p>Di Widya Skilloka, kami terus mengembangkan inovasi layanan manajemen sumber daya manusia mengikuti pertumbuhan perusahaan yang semakin kompleks. Kami percaya bahwa manusia adalah aset terpenting dari sebuah perusahaan.</p>
            </div>
            <div className="container mt-5">
                <h1>Visi Perusahaan</h1>
                <hr className="hr-main mr-auto ml-0" />
                {/* <p>Menjadi Perusahaan Teknologi yang mampu berkontribusi dan berkolaborasi dalam menyukseskan gerakan revolusi Industri 4.0 di Indonesia melalui platform Digital HR Business Partner.</p> */}
                {/* visi baru */}
                <p>
                    Menjadi Perusahaan Teknologi
                    yang berperan sebagai Digital HR Business Partner
                    guna berkontribusi dan berkolaborasi
                    dalam menyukseskan gerakan Revolusi Industri 4.0
                    di Indonesia.
                </p>
            </div>
            <div className="container mt-5">
                <h1>Misi Perusahaan</h1>
                <hr className="hr-main mr-auto ml-0" />
                <ul className="list-custom-check">
                    <li>Mencetak talenta-talenta berkualitas yang mampu berkolaborasi dan beradaptasi.</li>
                    <li>Memberikan solusi yang optimal kepada mitra dalam mengatasi berbagai permasalahan di dunia rekrutmen dan pengembangan talent.</li>
                    <li>Membantu pihak ketiga seperti LPK, Sekolah, Universitas, Instansi dalam meningkatkan kompetensi</li>
                </ul>
            </div>
            <div className="container mt-5">
                <h1>Value</h1>
                <hr className="hr-main mr-auto ml-0" />
                <ul className="list-custom-check">
                    <li>Team Work (Collaboration)</li>
                    <li>Optimistic</li>
                    <li>Proactive</li>
                    <li>Continuous Improvement</li>
                    <li>Agile</li>
                    <li>Social Responsibility</li>
                    <li>Trust</li>
                </ul>
            </div>
        </section>
    </PageLayout>);
}

export default AboutPage;