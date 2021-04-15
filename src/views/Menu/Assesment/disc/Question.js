import React from 'react'
import { CustomInput, Label, FormGroup} from 'reactstrap';
import "./disc.css";

export default function Question(props) {
    const { code, onAnswered, answer = {}, statements, page, idx } = props;
    const number = page * 4;

    function changeOption(e) {
        const { value } = e.target;
        const name = e.target.name.split('_')[0]
        const newAnswer = { ...answer, [name]: value }

        if (name === 'most' && answer.least === value) {
            newAnswer.least = undefined;
        } else if (name === 'least' && answer.most === value) {
            newAnswer.most = undefined;
        }

        onAnswered(code, newAnswer);
        // { most: 'a1', least: 'b2' }
    }


    return (
        <div className="card item-test col-md-8 col-sm-12 mx-auto shadow border-0">
            <div className="card-body px-0 px-md-3">
                {/* <div> */}
                    <Label className="d-flex">
                        <span className="mr-auto p-3">
                            <h5><b>Pernyataan {idx + number + 1} :</b></h5>
                        </span>
                        <span style={{ paddingTop: '7px', paddingRight: '35px', color: '#32CD32' }}><i className="fa fa-check fa-2x"></i></span>
                        <span style={{ paddingRight: '15px', paddingTop: '7px', color: '#FF0000' }}><i className="fa fa-times fa-2x"></i></span>
                    </Label>
                {/* </div> */}
                <FormGroup className="disc-choices">
                    <div className="d-flex statement">
                        <span className="mr-auto p-3" style={answer.most === 'a' ? { color: "#32CD32" } : answer.least === 'a' ? { color: "#FF0000" } : undefined}>{statements.a}</span>
                        <CustomInput type="radio" className="mt-2 p-2 ml-1 mr-5" id={'mostA_' + code} name={'most_' + code} value="a" onChange={changeOption} checked={answer.most === 'a'} />
                        <CustomInput type="radio" className="mt-2 p-2" id={'leastA_' + code} name={'least_' + code} value="a" onChange={changeOption} checked={answer.least === 'a'} />
                    </div>
                    <br />
                    <div className="d-flex statement">
                        <span className="mr-auto p-3" style={answer.most === 'b' ? { color: "#32CD32" } : answer.least === 'b' ? { color: "#FF0000" } : undefined}>{statements.b}</span>
                        <CustomInput type="radio" className="mt-2 p-2 ml-1 mr-5" id={'mostB_' + code} name={'most_' + code} value="b" onChange={changeOption} checked={answer.most === 'b'} />
                        <CustomInput type="radio" className="mt-2 p-2" id={'leastB_' + code} name={'least_' + code} value="b" onChange={changeOption} checked={answer.least === 'b'} />
                    </div>
                    <br />
                    <div className="d-flex statement">
                        <span className="mr-auto p-3" style={answer.most === 'c' ? { color: "#32CD32" } : answer.least === 'c' ? { color: "#FF0000" } : undefined}>{statements.c}</span>
                        <CustomInput type="radio" className="mt-2 p-2 ml-1 mr-5" id={'mostC_' + code} name={'most_' + code} value="c" onChange={changeOption} checked={answer.most === 'c'} />
                        <CustomInput type="radio" className="mt-2 p-2" id={'leastC_' + code} name={'least_' + code} value="c" onChange={changeOption} checked={answer.least === 'c'} />
                    </div>
                    <br />
                    <div className="d-flex statement">
                        <span className="mr-auto p-3" style={answer.most === 'd' ? { color: "#32CD32" } : answer.least === 'd' ? { color: "#FF0000" } : undefined}>{statements.d}</span>
                        <CustomInput type="radio" className="mt-2 p-2 ml-1 mr-5" id={'mostD_' + code} name={'most_' + code} value="d" onChange={changeOption} checked={answer.most === 'd'} />
                        <CustomInput type="radio" className="mt-2 p-2" id={'leastD_' + code} name={'least_' + code} value="d" onChange={changeOption} checked={answer.least === 'd'} />
                    </div>
                </FormGroup>
            </div>
        </div>
    )
}