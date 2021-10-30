import React, { useEffect, useState, forwardRef, useCallback } from 'react'
import { Button, Col, Row } from 'reactstrap';

function importAll(r) {
  return r.keys().map(r);
}

const imagesClient = importAll(require.context('../../assets/landingpage/faq/client/', false, /\.(png|jpe?g|svg)$/));
const imagesConsultant = importAll(require.context('../../assets/landingpage/faq/consultant/', false, /\.(png|jpe?g|svg)$/));
const description = {
  client_1: {
    title: 'Sign up to Pinion',
    description: 'Sign up as an entity in the platform.',
  },
  client_2: {
    title: 'Get your account verified by Pinion Team',
    description: 'Complete the registration forms and all administrative requirements to get verified.',
  },
  client_3: {
    title: 'Post your project on the Marketplace',
    description: 'Post your issues into the marketplace by filling out the form. Clear description about the issues will provide sufficient understanding for experts to bid on the project.',
  },
  client_4: {
    title: 'Choose your Consultant',
    description: 'During the tender phase, you will be able to review the candidates and finally choose one to consult to.',
  },
  client_5: {
    title: 'Get inspired!',
    description: 'The project starts when all the adminstrations procedures are completed. As the Client, your responsbility is to provide information for your Consultant and review the work. A Project Completion Sheet (PCS) will be submitted at the end of the project. When you approve it, Pinion will transfer the fund to the Consultant.',
  },
  consultant_1: {
    title: 'Sign up to Pinion',
    description: 'Sign up as an individual consultant in the platform.',
  },
  consultant_2: {
    title: 'Complete your profile',
    description: 'Register your experiences and expertise into the platform to get noticed.',
  },
  consultant_3: {
    title: 'Browse the Marketplace',
    description: 'Find projects that suits your expertise, level, time, and benefits.',
  },
  consultant_4: {
    title: 'Submit your application',
    description: 'Fill out and submit your application form to join the project tender. Clients will choose suitable consultant 7 days after the tender closes.',
  },
  consultant_5: {
    title: 'Project starts!',
    description: 'The project starts when all the adminstrations procedures are completed. As a Consultant, your responsbility is to provide advices for your Client to solve their issues. Submit the Project Completion Sheet (PCS) to complete the project. When it gets approved, Pinion will transfer the fund to you.',
  },
}

function FAQ(props, ref) {
  const [side, setSide] = useState(null)
  const [choosen, setChoosen] = useState('');

  return (
    <div className="faq w-100 d-flex align-items-center justify-content-center" ref={ref}>
      <Row className="w-100">
        <Col xs="12" className="d-flex align-items-center justify-content-center p-0">
          <div className="w-100 text-center">
            <div className="text-pinion-primary faq-text-1 font-weight-bold mb-2">How It Works</div>
            <div className="d-flex align-items-center justify-content-center mb-5">
              <Button color={side === 'client' || choosen.includes('client') ? 'warning' : 'pinion-yellow'} className="text-pinion-primary rounded-pill-left" style={{ width: '120px' }} onClick={() => {
                setSide('client')
                setChoosen('client_1')
              }}>
                Client
              </Button>
              <Button color={side === 'consultant' || choosen.includes('consultant') ? 'warning' : 'pinion-yellow'} className="text-pinion-primary rounded-pill-right" style={{ width: '120px' }} onClick={() => {
                setSide('consultant')
                setChoosen('consultant_1')
              }}>
                Consultant
              </Button>
            </div>
            <Row style={{ height: '30vh' }} className="mb05">
              <Col xs="12" className="d-flex align-items-center justify-content-center">
                {!side
                  ? <AllSide side={side} onChoosen={(e) => setChoosen(e)} />
                  : (side === 'consultant'
                    ? <Consultant side={side} onChoosen={(e) => setChoosen(e)} />
                    : <Client side={side} onChoosen={(e) => setChoosen(e)} />
                  )
                }
              </Col>
            </Row>
            <div>
              {choosen
                ? <>
                  <div className="text-pinion-primary faq-text-2 font-weight-bold">{description[choosen].title}</div>
                  <div className="text-pinion-primary faq-text-3 mt-2">{description[choosen].description}</div>
                </>
                : <>
                  <div className="text-pinion-primary faq-text-2 font-weight-bold">&nbsp;</div>
                  <div className="text-pinion-primary faq-text-3 mt-2">Choose a side to go over the details</div>
                </>
              }
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

const AllSide = ({ side, onChoosen }) => {
  const [choosen, setChoosen] = useState('');

  useEffect(() => onChoosen(choosen), [onChoosen, choosen])

  const handleHover = useCallback((e) => {
    setChoosen(e)
  }, [])

  return (
    <Row className="w-100">
      <Col xs="12" className="d-flex align-items-center faq-allside p-0">
        <Client side={side} onChoosen={handleHover} />
        <div>
          <img src={imagesClient[9]} alt="consultant_5" style={{ width: '150px' }} />
        </div>
        <Consultant side={side} onChoosen={handleHover} />
      </Col>
    </Row>
  )
}

const Client = ({ side, onChoosen }) => {
  const [choosen, setChoosen] = useState('');
  useEffect(() => onChoosen(choosen), [onChoosen, choosen])

  return (
    <Row className="w-100 px-md-5 ml-4 mx-lg-0">
      <Col xs="12" className="d-flex align-items-center justify-content-between p-0">
        <div>
          {choosen === 'client_1'
            ? <img src={imagesClient[1]} alt="client_1_1" className={`client-1-active ${choosen === 'client_1' ? '' : 'hide'}`} onClick={() => setChoosen('client_1')} onMouseEnter={() => setChoosen('client_1')} onMouseLeave={() => setChoosen('')} />
            : <img src={imagesClient[0]} alt="client_1" className={`client-1 ${choosen === 'client_1' && 'hide'}`} onClick={() => setChoosen('client_1')} onMouseEnter={() => setChoosen('client_1')} onMouseLeave={() => setChoosen('')} />
          }
        </div>
        <div>
          {choosen === 'client_2'
            ? <img src={imagesClient[3]} alt="client_2_2" className={`client-2-active ${choosen === 'client_2' ? '' : 'hide'}`} onClick={() => setChoosen('client_2')} onMouseEnter={() => setChoosen('client_2')} onMouseLeave={() => setChoosen('')} />
            : <img src={imagesClient[2]} alt="client_2" className={`client-2 ${choosen === 'client_2' && 'hide'}`} onClick={() => setChoosen('client_2')} onMouseEnter={() => setChoosen('client_2')} onMouseLeave={() => setChoosen('')} />
          }
        </div>
        <div>
          {choosen === 'client_3'
            ? <img src={imagesClient[5]} alt="client_3_3" className={`client-3-active ${choosen === 'client_3' ? '' : 'hide'}`} onClick={() => setChoosen('client_3')} onMouseEnter={() => setChoosen('client_3')} onMouseLeave={() => setChoosen('')} />
            : <img src={imagesClient[4]} alt="client_3" className={`client-3 ${choosen === 'client_3' && 'hide'}`} onClick={() => setChoosen('client_3')} onMouseEnter={() => setChoosen('client_3')} onMouseLeave={() => setChoosen('')} />
          }
        </div>
        <div>
          {choosen === 'client_4'
            ? <img src={imagesClient[7]} alt="client_4_4" className={`client-4-active ${choosen === 'client_4' ? '' : 'hide'}`} onClick={() => setChoosen('client_4')} onMouseEnter={() => setChoosen('client_4')} onMouseLeave={() => setChoosen('')} />
            : <img src={imagesClient[6]} alt="client_4" className={`client-4 ${choosen === 'client_4' && 'hide'}`} onClick={() => setChoosen('client_4')} onMouseEnter={() => setChoosen('client_4')} onMouseLeave={() => setChoosen('')} />
          }
        </div>
        {side === 'client' &&
          <div>
            {choosen === 'client_5'
              ? <img src={imagesClient[9]} alt="client_5_5" className={`client-5-active ${choosen === 'client_5' ? '' : 'hide'}`} onClick={() => setChoosen('client_5')} onMouseEnter={() => setChoosen('client_5')} onMouseLeave={() => setChoosen('')} />
              : <img src={imagesClient[8]} alt="client_5" className={`client-5 ${choosen === 'client_5' && 'hide'}`} onClick={() => setChoosen('client_5')} onMouseEnter={() => setChoosen('client_5')} onMouseLeave={() => setChoosen('')} />
            }
          </div>
        }
      </Col>
    </Row>
  )
}

const Consultant = ({ side, onChoosen }) => {
  const [choosen, setChoosen] = useState('');

  useEffect(() => onChoosen(choosen), [onChoosen, choosen])

  return (
    <Row className="w-100 px-md-5">
      <Col xs="12" className="d-flex align-items-center justify-content-between p-0">
        {side === 'consultant' &&
          <div>
            {choosen === 'consultant_5'
              ? <img src={imagesConsultant[9]} alt="consultant_5_5" className={`consultant-5-active ${choosen === 'consultant_5' ? '' : 'hide'}`} onClick={() => setChoosen('consultant_5')} onMouseEnter={() => setChoosen('consultant_5')} onMouseLeave={() => setChoosen('')} />
              : <img src={imagesConsultant[8]} alt="consultant_5" className={`consultant-5 ${choosen === 'consultant_5' && 'hide'}`} onClick={() => setChoosen('consultant_5')} onMouseEnter={() => setChoosen('consultant_5')} onMouseLeave={() => setChoosen('')} />
            }
          </div>
        }
        <div>
          {choosen === 'consultant_4'
            ? <img src={imagesConsultant[7]} alt="consultant_4_4" className={`consultant-4-active ${choosen === 'consultant_4' ? '' : 'hide'}`} onClick={() => setChoosen('consultant_4')} onMouseEnter={() => setChoosen('consultant_4')} onMouseLeave={() => setChoosen('')} />
            : <img src={imagesConsultant[6]} alt="consultant_4" className={`consultant-4 ${choosen === 'consultant_4' && 'hide'}`} onClick={() => setChoosen('consultant_4')} onMouseEnter={() => setChoosen('consultant_4')} onMouseLeave={() => setChoosen('')} />
          }
        </div>
        <div>
          {choosen === 'consultant_3'
            ? <img src={imagesConsultant[5]} alt="consultant_3_3" className={`consultant-3-active ${choosen === 'consultant_3' ? '' : 'hide'}`} onClick={() => setChoosen('consultant_3')} onMouseEnter={() => setChoosen('consultant_3')} onMouseLeave={() => setChoosen('')} />
            : <img src={imagesConsultant[4]} alt="consultant_3" className={`consultant-3 ${choosen === 'consultant_3' && 'hide'}`} onClick={() => setChoosen('consultant_3')} onMouseEnter={() => setChoosen('consultant_3')} onMouseLeave={() => setChoosen('')} />
          }
        </div>
        <div>
          {choosen === 'consultant_2'
            ? <img src={imagesConsultant[3]} alt="consultant_2_2" className={`consultant-2-active ${choosen === 'consultant_2' ? '' : 'hide'}`} onClick={() => setChoosen('consultant_2')} onMouseEnter={() => setChoosen('consultant_2')} onMouseLeave={() => setChoosen('')} />
            : <img src={imagesConsultant[2]} alt="consultant_2" className={`consultant-2 ${choosen === 'consultant_2' && 'hide'}`} onClick={() => setChoosen('consultant_2')} onMouseEnter={() => setChoosen('consultant_2')} onMouseLeave={() => setChoosen('')} />
          }
        </div>
        <div>
          {choosen === 'consultant_1'
            ? <img src={imagesConsultant[1]} alt="consultant_1_1" className={`consultant-1-active ${choosen === 'consultant_1' ? '' : 'hide'}`} onClick={() => setChoosen('consultant_1')} onMouseEnter={() => setChoosen('consultant_1')} onMouseLeave={() => setChoosen('')} />
            : <img src={imagesConsultant[0]} alt="consultant_1" className={`consultant-1 ${choosen === 'consultant_1' && 'hide'}`} onClick={() => setChoosen('consultant_1')} onMouseEnter={() => setChoosen('consultant_1')} onMouseLeave={() => setChoosen('')} />
          }
        </div>
      </Col>
    </Row>
  )
}

export default forwardRef(FAQ)
