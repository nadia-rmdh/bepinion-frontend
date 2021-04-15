import React from 'react';
import PageLayout from '../Layout/PageLayout';

function CareerNotFound(props) {

    return (<PageLayout>
        <section className="careers" id="careers">
            <div className="container py-5">
                <div className="row my-5">
                    <div className="col-md-12">
                        <img src={require(`../../../assets/img/job/iconlowonganclose.png`)} alt="No Job" width="100%" />
                    </div>
                </div>
            </div>
        </section>
    </PageLayout>);
}

export default CareerNotFound;
