import { useState } from "react"
import CertificateCard from "./CertificateCard"
import CertificateEditForm from "./CertificateEditForm"

function Certificate({setCertificates, certificate, isEditable}){
    const [isEditing, setIsEditing] = useState(false)

    return (
        <>
            {isEditing ? (
                <CertificateEditForm 
                    setCertificates={setCertificates}
                    currentCertificate={certificate}
                    isEditable={isEditable}
                />
            ) : (
                <CertificateCard 
                    certificate={certificate}
                    isEditable={isEditable}
                    setIsEditing={setIsEditing}
                />
            )}
        </>
    )
}
export default Certificate