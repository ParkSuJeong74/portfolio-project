import React, {useState} from 'react'
import EducationCard from './EducationCard'
import EducationEditForm from './EducationEditForm'


function Education({education, isEditable, setEducations}){
    const [isEditing, setIsEditing] = useState(false)
    return (
        <>
            {isEditing ? (
                <EducationEditForm 
                    setEducations = {setEducations}
                    currentEducation = {education}
                    setIsEditing={setIsEditing}
                    />
            ) : (
                <EducationCard 
                    setIsEditing={setIsEditing}
                    education={education}
                    isEditable={isEditable}/>
            )}
        </>
    )
}

export default Education