import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Project from "./Project";
import ProjectAddForm from "./ProjectAddForm";
import '../../App.css'

function Projects({ portfolioOwnerId, isEditable }) {
  //useState로 projects 상태를 생성함.
  const [projects, setProjects] = useState([]);
  //useState로 isAdding 상태를 생성함.
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // "projectlist/유저id"로 GET 요청하고, response의 data로 projects를 세팅함.
    Api.get("projectlist", portfolioOwnerId).then((res) => setProjects(res.data));
  }, [portfolioOwnerId]);

  return (
    <Card
      style={{backgroundColor: '#FFF5F5'}}>
      <Card.Body>
        <Card.Title style={{
          fontWeight: 'bold',
          fontSize: '2em',
          marginBottom: '20px',
          padding: '20px 0 20px 28px'
        }}>프로젝트</Card.Title>
        {projects.map((project) => (
          <Project
            key={project.id}
            project={project}
            setProjects={setProjects}
            isEditable={isEditable}
          />
        ))}
        {isEditable && (
          <Row className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }}>

              <button
                onClick={() => setIsAdding(true)}
                className="formAddButton">
              </button>
              
            </Col>
          </Row>
        )}
        {isAdding && (
          <ProjectAddForm
            portfolioOwnerId={portfolioOwnerId}
            setProjects={setProjects}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Projects;

