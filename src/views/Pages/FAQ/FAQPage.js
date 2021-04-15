import React from "react";
import PageLayout from "../Layout/PageLayout";
import { ListGroup, ListGroupItem, ListGroupItemHeading, UncontrolledCollapse, ListGroupItemText } from "reactstrap";
import questions from './faq.json';
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

function FAQPage(props) {
    return (<PageLayout>
        <section className="faqPage py-5" id="faqPage">
            <div className="container">
                <h2 className="h1 text-center">Frequently Asked Questions</h2>
                <hr className="hr-main"/>
                {Object.keys(questions).map((title, index) => <React.Fragment key={index}>
                    <h3>{title}</h3>
                    <hr className="hr-main ml-0 mr-auto"/>
                    
                    <ListGroup className="mb-5">
                        {questions[title].map(faq => {
                            const togglerId = 'faqToggler' + faq.question.replace(/[^a-zA-Z0-9]/ig, '-');

                            return (<ListGroupItem key={faq.question}>
                                <ListGroupItemHeading className="mb-0" id={togglerId}><strong>{faq.question}</strong></ListGroupItemHeading>
                                <UncontrolledCollapse toggler={'#' + togglerId}>
                                    <ListGroupItemText className="mt-3">
                                        <ReactMarkdown source={faq.answer}/>
                                    </ListGroupItemText>
                                </UncontrolledCollapse>
                            </ListGroupItem>)
                        })}
                    </ListGroup>
                </React.Fragment>)}

                <div className="text-center">
                    <h3>Masih ada Pertanyaan yang belum terjawab?</h3>
                    <Link to="/contact" className="btn btn-lg btn-netis-primary">Hubungi Kami</Link>
                </div>
            </div>
        </section>
    </PageLayout>)
}

export default FAQPage;