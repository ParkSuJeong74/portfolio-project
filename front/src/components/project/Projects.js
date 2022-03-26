import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Project from "./Project";
import ProjectAddForm from "./ProjectAddForm";
import Style from'../../App.module.css'

function Projects({ portfolioOwnerId, isEditable }) {

    const [projects, setProjects] = useState([]);

    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        Api.get("project/list", portfolioOwnerId).then((res) => setProjects(res.data));
    }, [portfolioOwnerId]);

    return (
        <Card
            style={{backgroundColor: '#FFF5F5' , borderRadius: '15px'}}>
            <Card.Body>
                <Card.Title class={Style.mvpType}>프로젝트</Card.Title>

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
                        className={Style.formAddButton}>
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
