import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Award from "./Award";
import AwardAddForm from "./AwardAddForm";
import Style from '../../App.module.css'

function Awards({ portfolioOwnerId, isEditable }) {
  //useState로 awards 상태를 생성함.
    const [awards, setAwards] = useState([]);
    //useState로 isAdding 상태를 생성함.
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
    // "awardlist/유저id"로 GET 요청하고, response의 data로 awards를 세팅함.
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
