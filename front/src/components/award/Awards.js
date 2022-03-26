import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Award from "./Award";
import AwardAddForm from "./AwardAddForm";
import Style from '../../App.module.css'

function Awards({ portfolioOwnerId, isEditable }) {

    const [awards, setAwards] = useState([]);

    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        Api.get("award/list", portfolioOwnerId).then((res) => setAwards(res.data));
    }, [portfolioOwnerId]);

    return (
        <Card
            style={{backgroundColor: '#FFF5F5' , borderRadius: '15px'}}>
            <Card.Body>
            <Card.Title class={Style.mvpType}>수상이력</Card.Title>

            {awards.map((award) => (
                <Award
                    key={award.id}
                    award={award}
                    setAwards={setAwards}
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
                <AwardAddForm 
                    portfolioOwnerId={portfolioOwnerId}
                    setIsAdding={setIsAdding}
                    setAwards={setAwards}/>
            )}

            </Card.Body>
        </Card>
    )
}

export default Awards
