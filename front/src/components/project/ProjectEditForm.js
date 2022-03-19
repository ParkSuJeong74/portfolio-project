import React, { useState } from "react"
import { Form, Col, Row } from "react-bootstrap"
import * as Api from "../../api"
import DatePicker from "react-datepicker"
import '../../App.css'

function ProjectEditForm({ currentProject, setProjects, setIsEditing }) {
  //useState로 title 상태를 생성함.
  const [title, setTitle] = useState(currentProject.title)
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(currentProject.description);

  const [from_date, setFrom_date] = useState(
    new Date(currentProject.from_date)
  )
  const [to_date, setTo_date] = useState(
    new Date(currentProject.to_date)
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    // currentAward의 user_id를 user_id 변수에 할당함.
    const user_id = currentProject.user_id;

    // "awards/수상 id" 엔드포인트로 PUT 요청함.
    await Api.put(`projects/${currentProject.id}`, {
      user_id,
      title,
      description,
      from_date,
      to_date
    })

    // "awardlist/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get("projectlist", user_id);
    // awards를 response의 data로 세팅함.
    setProjects(res.data)
    // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
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
            wrapperClassName="datePicker"
            dateFormat="yyyy.MM.dd(eee)"
            selected={from_date}
            onChange={(from_date) => setFrom_date(from_date)}
          />
        </Col>
        <Col xs={'auto'} sm={'auto'}>
          <Form.Label className="mb-1">종료날짜</Form.Label>
            <DatePicker
              wrapperClassName="datePicker"
              dateFormat="yyyy.MM.dd(eee)"
              selected={to_date}
              onChange={(to_date) => setTo_date(to_date)}
            />
        </Col>
      </Row>

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>

        <button
          type="submit"
          className="mvpConfirmButton me-3">
          확인
        </button>

        <button
          onClick={() => setIsEditing(false)}
          className="mvpCancelButton">
          취소
        </button>
          
        </Col>
      </Form.Group>
    </Form>
  )
}

export default ProjectEditForm;
