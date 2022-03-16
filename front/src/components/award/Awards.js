import {Card, Row, Col, Button} from 'react-bootstrap'
import React, {useEffect, useState} from "react"
import * as Api from "../../api"
import Award from './Award'
import AwardAddForm from './AwardAddForm'

function Awards({portfolioOwnerId, isEditable}){
  const [awards, setAwards] = useState([])
  const [isAdding, setIsAdding] = useState(false) 

  /* useEffect(() => {
    //"awardlist/유저id"로 GET 요청하고, response의 data로 awards를 세팅함
    Api.get("awardlist", portfolioOwnerId).then((res) => setAwards(res.data))
  }, [portfolioOwnerId]) */
  
  const awardlist = [
    {
      user_id:"c69beb5a-0ab1-4791-9eaf-1572d63650c3",
      title:"개근상",
      description:"하루도 빠짐없이 출석하였습니다."
    },
    {
      user_id:"c69beb5a-0ab1-4791-9eaf-1572d63650c3",
      title:"두상",
      description:"머리"
    }
  ]

  return (
    <Card>
      <Card.Body>
        <Card.Title>수상이력</Card.Title>
        {/* {awards.map((award) => (
          <Award 
            key={award.id}
            award={award}
            setAwards={setAwards}
            isEditable={isEditable}
          />
        ))} */}
        {awardlist.map((award) => (
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