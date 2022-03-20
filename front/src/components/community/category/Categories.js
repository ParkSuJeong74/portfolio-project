import { useState } from 'react'
import {Card, Row, Col} from 'react-bootstrap'
import Category from './Category'
import CategoryAddForm from './CategoryAddForm'

function Categories({isLogin, setIsViewable}){
    const [categories, setCategories] = useState([
        '취업꿀팁', '저녁메뉴'
    ])

    const [isAdding, setIsAdding] = useState(false)

    return (
        <Card>
            <Card.Header>전체 게시판</Card.Header>

            {categories.map((category, index) => (
                <Category 
                    key={index}
                    category={category}
                    setIsViewable={setIsViewable}
                />
            ))}

            {/*로그인됐을 때만 카테고리 추가 가능 */}
            {isLogin && (
                <Row className="mt-3 text-center mb-4">
                    <Col sm={{ span: 20 }}>

                        <button
                            onClick={() => setIsAdding(true)}
                            className="formAddButton">
                        </button>
                        
                    </Col>
                </Row>
            )}

            {isAdding && (
                <CategoryAddForm 
                    setIsAdding={setIsAdding}
                    setCategories={setCategories}
                />
            )}
        </Card>
    )
}
export default Categories