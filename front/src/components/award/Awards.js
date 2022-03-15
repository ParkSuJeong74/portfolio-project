import {Card, Row, Col, Button} from 'react-bootstrap'
import React, {useEffect, useState} from "react"
import * as Api from "../../api"
import Award from './Award'
import AwardAddForm from './AwardAddForm'
import AwardCard from './AwardCard'

function Awards({portfolioOwnerId, isEditable}){
  const [awards, setAwards] = useState([])
  const [isAdding, setIsAdding] = useState(false) //현재는 추가중인 상태가 아니다.

  useEffect(() => {
    Api.get("awardlist", portfolioOwnerId).then((res) => setAwards(res.data))
  })

  return (
    <Card>
      <Card.Body>
        <Card.Title>수상이력</Card.Title>
        {awards.map((award) => (
          <Award 
            key={award.id}
            award={award}
            setAwards={setAwards}
            isEditable={isEditable}
          />
        ))}
        {isEditable && (
          <Row className="text-center">
            <Col>
              <Button onClick={() => setIsAdding(true)}>+</Button>
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