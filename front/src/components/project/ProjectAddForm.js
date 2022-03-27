import React, { useState } from "react"
import { Form, Col, Row } from "react-bootstrap"
import * as Api from "../../api"
import DatePicker from "react-datepicker"
import Style from '../../App.module.css'
import dayjs from "dayjs"

function ProjectAddForm({ portfolioOwnerId, setProjects, setIsAdding }) {

    const [title, setTitle] = useState("")

    const [description, setDescription] = useState("")

    const [fromDate, setFromDate] = useState(new Date())
    const [toDate, setToDate] = useState(new Date())

    const handleSubmit = async (e) => {
        e.preventDefault()

        let from_date = dayjs(fromDate)
        let to_date = dayjs(toDate)

        from_date = dayjs(fromDate).format("YYYY-MM-DD")
        to_date = dayjs(toDate).format("YYYY-MM-DD")

        const newProject = await Api.post("project/create", {
            userId: portfolioOwnerId,
            title,
            description,
            fromDate: from_date,
            toDate: to_date
        })

        setProjects((prev) =>  [...prev, newProject.data])

        setIsAdding(false);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicTitle">
                <Form.Control
                    type="text"
                    placeholder="프로젝트 제목"
                    value={title}
                    style={{ 
                    width: 'auto',
                    border: 'solid 2px #DBC7FF'
                    }}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formBasicDescription" className="mt-3">
                <Form.Control
                    type="text"
                    placeholder="상세내역"
                    value={description}
                    style={{
                    border: 'solid 2px #DBC7FF'
                    }}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>

            <Row xs={1} sm={2} className="mt-3">
                <Col xs={'auto'} sm={'auto'}>
                    <Form.Label className="mb-1">시작날짜</Form.Label>
                    <DatePicker
                    type="text"
                    wrapperClassName="datePicker"
                    dateFormat="yyyy.MM.dd(eee)"
                    selected={fromDate}
                    onChange={(fromDate) => setFromDate(fromDate)}
                    />
                </Col>

                <Col xs={'auto'} sm={'auto'}>
                    <Form.Label className="mb-1">종료날짜</Form.Label>
                    <DatePicker
                        type="text"
                        wrapperClassName="datePicker"
                        dateFormat="yyyy.MM.dd(eee)"
                        selected={toDate}
                        onChange={(toDate) => setToDate(toDate)}
                    />
                </Col>
            </Row>

            <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                    
                    <button
                    type="submit"
                    className={Style.mvpConfirmButton}>
                    확인
                    </button>

                    <button
                    onClick={() => setIsAdding(false)}
                    className={Style.mvpCancelButton}>
                    취소
                    </button>
                    
                </Col>
            </Form.Group>
        </Form>
    )
}

export default ProjectAddForm
