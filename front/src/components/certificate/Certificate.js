import { useState, useEffect } from "react"
import CertificateCard from "./CertificateCard"
import CertificateEditForm from "./CertificateEditForm"
import * as Api from '../../api'


function Certificate({setCertificates, certificate, isEditable}){
    const [isEditing, setIsEditing] = useState(false)
    const [isRemoving, setIsRemoving] = useState(false)

    useEffect(() => {
        if(isRemoving){
            async function certificateRemove(){
                
                const user_id = certificate.user_id
                
                await Api.delete(`certificates/${certificate.id}`)
    
                const res = await Api.get("certificatelist", user_id)
                setCertificates(res.data)
    
                setIsRemoving(false)
            }
            certificateRemove()
        }
    }, [isRemoving])

    return (
        <>
            {isEditing ? (
                <CertificateEditForm 
                    setCertificates={setCertificates}
                    currentCertificate={certificate}
                    setIsEditing={setIsEditing}
                />
            ) : (
                <CertificateCard 
                    certificate={certificate}
                    isEditable={isEditable}
                    setIsEditing={setIsEditing}
                    setIsRemoving={setIsRemoving}
                />
            )}
        </>
    )
}
export default Certificate