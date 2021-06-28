import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Row, Col, Label, Input } from "reactstrap";

export const CrazyEightCardDetail = ({ data }) => {
    console.log(data)

    return (
        <Row>
            <Col xs="12">
                <Input
                    type="input"
                    className="form-control"
                    name="title"
                    id="title"
                    // onChange={formik.handleChange}
                    // onBlur={formik.handleBlur}
                    // value={values.title}
                    maxLength="50"
                    placeholder="Judul Card"
                />
            </Col>
            <Col xs="12">
                <Label htmlFor="description" className="input-label">Deskripsi</Label>
                <Input
                    type="textarea"
                    rows={5}
                    className="form-control"
                    name="description"
                    id="description"
                    // onChange={formik.handleChange}
                    // onBlur={formik.handleBlur}
                    // value={values.description}
                    placeholder="Deskripsi"
                />
            </Col>
        </Row>
    )
}