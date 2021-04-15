import React, { forwardRef, useState } from 'react';
import { Row, Col, Button, Collapse } from 'reactstrap';
import Slide from 'react-reveal/Slide';
import Fade from 'react-reveal/Fade';

function Feature(props, ref) {

    const [collapseFeature, setCollapseFeature] = useState(false);
    const toggleCollapse = () => {
        setCollapseFeature(!collapseFeature);
    }
    return (
        <section ref={ref} className="text-center py-5 px-md-4 feature" id="feature">
            <h3 className="text-center sub-title">Fitur Kami</h3>
            <hr className="hr-work" />
            <div className="px-md-5">
                <Slide left>
                    <FeatureItem
                        direction="left"
                        image={require('../../assets/img/landing-page/feature/feature-psikotes.png')}
                        title="Psikotes Online"
                        alt="psikotes"
                        feature="Dapatkan kemudahan akses pada asesmen psikologi
                        yang sudah terintegrasi dengan kecerdasan buatan.
                        Anda akan secara otomatis mendapatkan hasil asesmen
                        secara digital dan dapat diakses bebas kapan saja dan dimana saja."
                        class="flex-row"
                    />
                </Slide>
                <Slide right>
                    <FeatureItem
                        direction="right"
                        image={require('../../assets/img/landing-page/feature/feature-interview.png')}
                        title="Wawancara Online"
                        alt="interview"
                        feature="Dapatkan kenyamanan wawancara online yang seluruhnya akan dipandu
                        oleh HR Virtual kami. HR virtual kami membantu Anda dalam melakukan
                        wawancara dengan berbagai aspek pertanyaan yang telah dirumuskan
                        untuk memudahkan proses wawancara. Anda akan mendapatkan hasil
                        wawancara online secara digital dengan berbagai analisis detail para
                        pelamar perusahaan Anda."
                        class="flex-row-reverse"
                    />
                </Slide>
                <Slide left>
                    <FeatureItem
                        direction="left"
                        image={require('../../assets/img/landing-page/feature/feature-gestur.png')}
                        title="Asesmen Gestur"
                        alt="gesture"
                        feature="Terintegrasi dengan kecerdasan buatan, hasil video wawancara online
                        yang dilakukan oleh pelamar akan secara otomatis mendeteksi serta
                        menganalisis gestur pelamar saat melakukan wawancara online. Melalui
                        hasil tersebut, dapat merepresentasikan kecenderungan pelamar yang
                        diwujudkan melalui gestur selama melakukan wawancara, sehingga hasil
                        tersebut bisa menjadi data basis ataupun tambahan bagi perusahaan
                        Anda dalam merekrut."
                        class="flex-row"
                    />
                </Slide>
                {!collapseFeature &&
                    <Fade>
                        <Button className="btn-sm button-feature-collapse scale-div" onClick={toggleCollapse}>
                            <i className="fa fa-angle-double-down mr-2" />&nbsp;
                            Fitur Lainnya
                        </Button>
                    </Fade>
                }
                <Collapse isOpen={collapseFeature}>
                    <Slide right>
                        <FeatureItem
                            direction="right"
                            image={require('../../assets/img/landing-page/feature/feature-wajah.png')}
                            title="Asesmen Wajah"
                            alt="Wajah"
                            feature="Selain melakukan pendeteksian dan analisis terhadap gestur, dalam rangkuman hasil pelamar
                            Anda juga akan mendapat hasil analisis melalui bentuk wajah serta detail pada fitur wajah pelamar.
                            Melalui hal ini, Anda dapat melihat melalui detail wajah tersebut karakteristik spesifik dalam aspek
                            tertentu mengenai pelamar."
                            class="flex-row-reverse"
                        />
                    </Slide>
                    <Slide left>
                        <FeatureItem
                            direction="left"
                            image={require('../../assets/img/landing-page/feature/feature-tangan.png')}
                            title="Asesmen Garis Tangan"
                            alt="tangan"
                            feature="Hasil karakteristik pelamar juga dapat Anda dapatkan melalui analisis
                            garis tangan. Sehingga dapat mengenali lebih dekat mengenai karakter
                            pelamar dan menjadikan hal tersebut sebagai referensi nilai tambahan."
                            class="flex-row"
                        />
                    </Slide>
                    <Slide right>
                        <FeatureItem
                            direction="right"
                            image={require('../../assets/img/landing-page/feature/feature-shio.png')}
                            title="Asesmen Lainnya (shio, bazi, zodiac)"
                            alt="shio"
                            feature="Selain menggunakan teknologi kecerdasan buatan, Anda juga bisa
                            mendapatkan hasil analisis lainnya melalui chinese astrology meliputi
                            karakteristik kepribadian, saran pengembangan pekerjaan hingga partner
                            dalam bekerja masing-masing pelamar Anda."
                            class="flex-row-reverse"
                        />
                    </Slide>
                </Collapse>
                {collapseFeature &&
                    <Fade>
                        <Button className="btn-sm button-feature-collapse scale-div" onClick={toggleCollapse}>
                            <i className="fa fa-angle-double-up mr-2" />&nbsp;
                            Tutup
                        </Button>
                    </Fade>
                }
            </div>
        </section>
    )
}

function FeatureItem(props) {
    return (
        <div className="feature-content">
            <div className="text-center feature-title">
                {props.title}
            </div>
            <Row className={props.class}>
                <Col sm="6" md="3" className="py-4 feature-icon text-center d-flex align-items-center">
                    <img src={props.image} width="150" alt={props.alt} className="mx-auto" />
                </Col>
                <Col sm="6" md="9" className={`py-4 feature-desc d-flex align-items-center`}>
                    {props.feature}
                </Col>
            </Row>
        </div>
    )
}

export default forwardRef(Feature);
