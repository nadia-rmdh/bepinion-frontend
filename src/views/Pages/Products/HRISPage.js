import React from 'react';
import PageLayout from '../Layout/PageLayout';

export default function HRISPage (props) {
    return (
        <PageLayout>
            <section id="productHris">
                <div className="container py-5">
                    <h2 className="text-center">Human Resource Information System</h2>
                    <hr className="hr-main mb-5"/>
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                    <p style={{ lineHeight: 2 }}>HRIS adalah platform digital yang akan mempermudah manajemen sumber daya manusia di perusahaan anda. Produk HRIS Widya Skilloka akan membantu dalam manajemen kehadiran karyawan, memantau lokasi kerja, dan membantu memudahkan pengurusan administrasi mengenai reimburse serta penghitungan cuti karyawan. Dengan dukungan teknologi Face Recognition, tentunya akan menjadikan aplikasi HRIS Widya Skilloka hadir lebih akurat. HRIS kami hadir sebagai HR Business Partner yang akan membantu perencanaan strategis pengembangan sumber daya manusia mulai dari proses rekruitmen, asesmen, experimental training hingga konsultasi.</p>
                        </div>
                    </div>
                    <div className="row no-gutters justify-content-center">
                        <div className="col-md-8">
                            <img className="mt-5" src={require('../../../assets/img/illustrations/product-hris.png')} alt="Product Human Resource Information System Illustration" width="100%"/>
                        </div>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}