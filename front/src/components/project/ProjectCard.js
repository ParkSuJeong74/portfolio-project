import { Card, Row, Col } from "react-bootstrap";
import Style from '../../App.module.css'

function ProjectCard({ project, isEditable, setIsEditing, removeProject }) {

  return (
    <Card.Text>
      <Row className="align-items-center" 
          style={{paddingLeft: '28px'}}>
        <Col>
          <span style={{
            fontWeight: 'bold',
            fontSize: '1.2rem',
          }}>{project.title}</span>
          <br />
          <span className="text-muted">{project.description}</span>
          <br />
          <span className="text-muted">{project.fromDate} ~ {project.toDate}</span>
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
