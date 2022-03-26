import React, { useEffect,useState } from "react"
import { Card, Row, Col } from "react-bootstrap";
import Style from '../../App.module.css'
import dayjs from "dayjs"

function ProjectCard({ project, isEditable, setIsEditing, removeProject }) {
  const [period, setPeriod] = useState('')
  let from_date = dayjs(project.fromDate)
  let to_date = dayjs(project.toDate)

  useEffect(() => {
    if (to_date.diff(from_date, "year") > 0){
      setPeriod(`${to_date.diff(from_date, "year")}년 동안`)
    } else if (to_date.diff(from_date, "month") > 0){
      setPeriod(`${to_date.diff(from_date, "month")}개월 동안`)
      //console.log(to_date.diff(from_date, "month"))
    } else {
      setPeriod(`${to_date.diff(from_date, "day")}일 동안`)
    }
}, [])

  

  return (
    <Card.Text>
      <Row className="align-items-center" 
          style={{paddingLeft: '28px'}}>
        <Col className="mb-3">
          <span style={{
            fontWeight: 'bold',
            fontSize: '1.2rem',
          }}>{project.title}</span>
          <br />
          <span className="text-muted">{project.description}</span>
          <br />
          <span className="text-muted">{project.fromDate} ~ {project.toDate} <span style={{ marginLeft: "10px" }}>({period})</span></span>

        </Col>

        {isEditable && (
          <Col xs={2}>
            <button
              onClick={() => setIsEditing((prev) => !prev)}
              className={Style.mvpEditButton}>
                수정
            </button>

            <button
              onClick={() => removeProject()}
              className={Style.mvpRemoveButton}>
                삭제
            </button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default ProjectCard;
