import React, { useState} from 'react'
import AwardCard from './AwardCard'
import AwardEditForm from './AwardEditForm'
import * as Api from '../../api'

function Award({award, setAwards, isEditable}) {
    const [isEditing, setIsEditing] = useState(false)

    const removeAward = async() => {
        try{
            await Api.delete(`award/${award.id}`)
            setAwards(prev => prev.filter(item => item.id !== award.id))
            
        } catch(error) {
            alert(error.response.data)
        }
    }

    return (
        <>
            {isEditing ? (
                <AwardEditForm 
                    setAwards = {setAwards}
                    currentAward = {award}
                    setIsEditing={setIsEditing}
                />
            ) : (
                <AwardCard 
                    setIsEditing={setIsEditing}
                    removeAward={removeAward}
                    award={award}
                    isEditable={isEditable}/>
            )}
        </>
    )
}

export default Award
