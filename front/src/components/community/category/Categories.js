import { useState, useEffect } from 'react'
import {Card, Row, Col} from 'react-bootstrap'
import Category from './Category'
import CategoryAddForm from './CategoryAddForm'
import * as Api from '../../../api'

function Categories({isLogin, setIsArticleOpen}){
    const [categories, setCategories] = useState([
        '취업꿀팁', '저녁메뉴'
    ])
    //원래는 이렇게 선언하는 것!
    //const [categories, setCategories] = useState([])

     // "category/list"로 GET 요청하고, response의 data로 categories를 세팅함.
    /*   useEffect(() => {
        Api.get("category/list").then((res) => setCategories(res.data));
    }, []); */

    const [isAdding, setIsAdding] = useState(false)

    return (
        <Card>
            <Card.Header>전체 게시판</Card.Header>

            {categories.map((category) => (
                <Category 
                    key={category.id}
                    category={category}
                    setIsArticleOpen={setIsArticleOpen}
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