import { Card, Button, Row, Col } from "react-bootstrap";

function ProjectCard({ project, isEditable, setIsEditing }) {

  return (
    <Card.Text>
      <Row className="align-items-center" style={{paddingLeft: '28px'}}>
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
              style={{
                backgroundColor: '#B041E3',
                color: 'white',
                border: '#B041E3',
                width: '50px',
                height: '40px',
                fontSize: '1rem',
                textAlign: 'center',
                borderRadius: '5px',
              }}>
                  편집
              </button>
          </Col>
        )}
      
      </Row>
    </Card.Text>
  );
}

export default ProjectCard;
