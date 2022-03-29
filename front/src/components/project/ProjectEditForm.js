import React, { useState } from "react"
import { Form, Col, Row } from "react-bootstrap"
import * as Api from "../../api"
import DatePicker from "react-datepicker"
import Style from '../../App.module.css'
import {TimeUtil} from '../../common/TimeUtil'

function ProjectEditForm({ currentProject, setProjects, setIsEditing }) {

    const [title, setTitle] = useState(currentProject.title)

    const [description, setDescription] = useState(currentProject.description);

    const [fromDate, setFromDate] = useState(
        new Date(currentProject.fromDate)
    )
    const [toDate, setToDate] = useState(
        new Date(currentProject.toDate)
    )

    const handleSubmit = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        const userId = currentProject.userId;

        const from_date = (TimeUtil.getTime(fromDate)).toISOString().split('T')[0]
        const to_date = (TimeUtil.getTime(toDate)).toISOString().split('T')[0]

        const editedProject = await Api.put(`project/${currentProject.id}`, {
            userId,
            title,
            description,
            fromDate: from_date,
            toDate: to_date
        })

        setProjects((prev) => prev.map((project) => {
            return project.id === currentProject.id
                ? (editedProject.data)
                : (project)
        }))

        setIsEditing(false)
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

        <Form.Group as={Row} className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }}>

            <button
                type="submit"
                className={Style.mvpConfirmButton}>
                확인
            </button>

            <button
                onClick={() => setIsEditing(false)}
                className={Style.mvpCancelButton}>
                취소
            </button>
                
            </Col>
        </Form.Group>
    </Form>
    )
}

export default ProjectEditForm;
