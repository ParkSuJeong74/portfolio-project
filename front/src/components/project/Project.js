import React, { useState,useEffect } from "react";
import ProjectCard from "./ProjectCard";
import ProjectEditForm from "./ProjectEditForm";
import * as Api from '../../api'

function Project({ project, setProjects, isEditable }) {
  //useState로 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  
  const removeProject = async() => {
    try{
      await Api.delete(`project/${project.id}`)
      setProjects(prev => prev.filter(item => item.id !== project.id))
    } catch(err){
      console.log(err)
    }
  }

  return (
    <>
      {isEditing ? (
        <ProjectEditForm
          currentProject={project}
          setProjects={setProjects}
          setIsEditing={setIsEditing}
        />
      ) : (
        <ProjectCard
          project={project}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          removeProject={removeProject}
        />
      )}
    </>
  );
}

export default Project;
