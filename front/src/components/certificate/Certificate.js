import { useState, useEffect } from "react"
import CertificateCard from "./CertificateCard"
import CertificateEditForm from "./CertificateEditForm"
import * as Api from '../../api'


function Certificate({setCertificates, certificate, isEditable}){
    const [isEditing, setIsEditing] = useState(false)

    const removeCertificate = async () => {
        try{
            await Api.delete(`certificate/${certificate.id}`)
            setCertificates(prev => prev.filter(item => item.id !== certificate.id))
        } catch(error) {
            alert(error.response.data)
        }
    }

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
                    removeCertificate={removeCertificate}
                />
            )}
        </>
    )
}
export default Certificate
