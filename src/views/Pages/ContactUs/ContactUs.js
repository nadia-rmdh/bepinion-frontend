import React from 'react';
import PageLayout from '../Layout/PageLayout';
import ContactFormCard from './ContactFormCard';
import {ReactComponent as MapMarkerOutline} from '../../../assets/img/map-marker-outline.svg';
import {ReactComponent as WhatsappOutline} from '../../../assets/img/whatsapp-outline.svg';
import {ReactComponent as MailOutline} from '../../../assets/img/mail-outline.svg';

function ContactUs(props) {
    return (
        <PageLayout>
            <section className="contactUs" id="contactUs">
                <div className="container py-5">
                    <h1 className="text-center">Hubungi Kami</h1>
                    <hr className="hr-main"/>
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <p style={{ lineHeight: 1.7 }}>Silahkan menghubungi kami untuk pertanyaan, masukan ataupun ketertarikan anda mengenai layanan atau produk pada website kami. Anda akan dihubungkan langsung dengan customer support kami secara profesional untuk membantu anda. Anda juga dapat mengakses fungsi obrolan online kami - cukup klik pada logo di bawah ini.</p>
                        </div>
                    </div>
                    <div className="row justify-content-center mt-5">
                        <div className="col-md-5">
                            <ContactFormCard />
                        </div>
                        <div className="col-sm-5 d-none d-md-block">
                            <div className="py-3 px-4">
                                <img className="mb-5" src={require('../../../assets/img/illustrations/contact-us.svg')} alt="ilustrasi hubungi kami" width="100%" />
                                <div className="d-flex align-items-start">
                                    <div style={{ width: 14}} className="mr-3">
                                        <MapMarkerOutline/>
                                    </div>
                                    <p className="mb-1" style={{ flex: '1', maxWidth: 260 }}>
                                    Gang Mawar, Nomor 98D RT 05/RW 22<br />
                                    Jatirejo, Sendangadi, Mlati, Sleman, Daerah Istimewa Yogyakarta, 55285</p>
                                    {/* <p className="mb-1" style={{ flex: '1', maxWidth: 260 }}>
                                        Jalan Palagan Tentara Pelajar KM 7,
                                        RT/RW 004/016, 
                                        Ngaglik, Sleman, Daerah Istimewa Yogyakarta 55581                                    
                                    </p> */}
                                </div>
                                <div className="d-flex align-items-start">
                                    <div style={{ width: 14}} className="mr-3">
                                        <WhatsappOutline/>
                                    </div>
                                    <p className="mb-1" style={{ flex: '1' }}><a href="https://wa.me/6281226798802">+62 812 2679 8802</a></p>
                                </div>
                                <div className="d-flex align-items-start">
                                    <div style={{ width: 14}} className="mr-3">
                                        <MailOutline/>
                                    </div>
                                    <p className="mb-1" style={{ flex: '1' }}> <a href="mailto:info@widyaskilloka.com">info@widyaskilloka.com</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}

export default ContactUs;
