import React, {useState, useEffect} from 'react'
import EducationCard from './EducationCard'
import EducationEditForm from './EducationEditForm'
import * as Api from '../../api'


function Education({education, isEditable, setEducations}){
    const [isEditing, setIsEditing] = useState(false)
    const [isRemoving, setIsRemoving] = useState(false)

    useEffect(() => {
        if(isRemoving){
            async function educationRemove(){
                
                const user_id = education.user_id
                
                await Api.delete(`educations/${education.id}`)
    
                const res = await Api.get("educationlist", user_id)
                setEducations(res.data)
    
                setIsRemoving(false)
            }
            educationRemove()
        }
    }, [isRemoving])
    
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
                    isEditable={isEditable}
                    setIsRemoving={setIsRemoving}
                    />
            )}
        </>
    )
}

export default Education