import React, { useState } from "react"
import { Form, Col, Row } from "react-bootstrap"
import * as Api from "../../api"
import DatePicker from "react-datepicker"
import Style from '../../App.module.css'

function ProjectAddForm({ portfolioOwnerId, setProjects, setIsAdding }) {
  //useState로 title 상태를 생성함.
  const [title, setTitle] = useState("")
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState("")

  const [from_date, setFrom_date] = useState(new Date())
  const [to_date, setTo_date] = useState(new Date())

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    // portfolioOwnerId를 user_id 변수에 할당함.
    const user_id = portfolioOwnerId

    // "award/create" 엔드포인트로 post요청함.
    await Api.post("project/create", {
      user_id: portfolioOwnerId,
      title,
      description,
      from_date,
      to_date,
    })

    // "awardlist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("projectlist", user_id)
    // awards를 response의 data로 세팅함.
    setProjects(res.data)
    // award를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.

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
            selected={from_date}
            onChange={(from_date) => setFrom_date(from_date)}
          />
        </Col>
        <Col xs={'auto'} sm={'auto'}>
          <Form.Label className="mb-1">종료날짜</Form.Label>
            <DatePicker
              type="text"
              wrapperClassName="datePicker"
              dateFormat="yyyy.MM.dd(eee)"
              selected={to_date}
              onChange={(to_date) => setTo_date(to_date)}
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
