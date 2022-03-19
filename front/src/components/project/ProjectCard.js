import { Card, Row, Col } from "react-bootstrap";
import '../../App.css'

function ProjectCard({ project, isEditable, setIsEditing, setIsRemoving }) {

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
          <span className="text-muted">{project.from_date} ~ {project.to_date}</span>
        </Col>

        {isEditable && (
          <Col xs={2}>
            <button
              onClick={() => setIsEditing((prev) => !prev)}
              className="mvpEditButton">
                수정
            </button>

            <button
              onClick={() => setIsRemoving((prev) => !prev)}
              className="mvpRemoveButton">
                삭제
            </button>
          </Col>
        )}
      
      </Row>
    </Card.Text>
  );
}

export default ProjectCard;
