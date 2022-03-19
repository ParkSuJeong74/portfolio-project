import React, { useState,useEffect } from "react";
import ProjectCard from "./ProjectCard";
import ProjectEditForm from "./ProjectEditForm";
import * as Api from '../../api'


function Project({ project, setProjects, isEditable }) {
  //useState로 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false)

  useEffect(() => {
    if(isRemoving){
        async function projectRemove(){
            
            const user_id = project.user_id
            
            await Api.delete(`projects/${project.id}`)

            const res = await Api.get("projectlist", user_id)
            setProjects(res.data)

            setIsRemoving(false)
        }
        projectRemove()
    }
  }, [isRemoving])

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
          setIsRemoving={setIsRemoving}
        />
      )}
    </>
  );
}

export default Project;
