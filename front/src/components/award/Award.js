import React, { useState} from 'react'
import AwardCard from './AwardCard'
import AwardEditForm from './AwardEditForm'
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

function Award({award, setAwards, isEditable}) {
    const [isEditing, setIsEditing] = useState(false)

    

    return (
        <>
           <AwardCard 
                setIsEditing={setIsEditing}
                award={award}
                isEditable={isEditable}
                setAwards={setAwards}
            />
                    
            {isEditing &&(
                <Dialog open={isEditing} onClose={() => setIsEditing((cur) => !cur)}>
                    <DialogTitle>수상이력 편집</DialogTitle>
                    <DialogContent>
                        <AwardEditForm 
                            setAwards = {setAwards}
                            currentAward = {award}
                            setIsEditing={setIsEditing}
                         />
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}

export default Award
