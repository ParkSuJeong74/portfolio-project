import { useEffect, useState } from 'react'
import {Card, Row, Col} from 'react-bootstrap'
import Category from './Category'
import CategoryAddForm from './CategoryAddForm'
import * as Api from '../../../api'

import Style from '../../../App.module.css'

function Categories({categories, isLogin, dispatch, setIsArticleOpen, setSelectedCategory}){
    useEffect(() => {
        async function getData(){
			try{
				await Api.get('category/list').then((res) => {
					dispatch({
						type: 'SET',
						payload: res.data
					})
				})
			} catch(err){
				console.log(err)
			}
		}
		getData()
    }, [categories])
		

    // 추가중인지 여부
    const [isAdding, setIsAdding] = useState(false)

    return (
        <Card className="mt-4 text-center">
            <Card.Header 
                className={Style.cateHeader} 
                style={{backgroundColor: '#D9DDFF'}}>
                    전체 게시판
            </Card.Header>

            {categories.map((category) => (
                <Category 
                    key={category.id}
                    category={category}
                    setIsArticleOpen={setIsArticleOpen}
                    setSelectedCategory={setSelectedCategory}
                    dispatch={dispatch} />
            ))}

            {/*로그인됐을 때만 카테고리 추가 가능 */}
            {isLogin && (
                <Row className="mt-3 text-center mb-4">
                    <Col sm={{ span: 20 }}>
                        <button
                            onClick={() => setIsAdding(true)}
                            className={[Style.formAddButton, Style.communityAddButton].join(' ')}>
                        </button>                    
                    </Col>
                </Row>
            )}

            {isAdding && (
                <CategoryAddForm 
                    setIsAdding={setIsAdding}
                    dispatch={dispatch} />
            )}
        </Card>
    )
}
export default Categories
