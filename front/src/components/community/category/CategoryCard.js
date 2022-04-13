import { ListGroup, OverlayTrigger, Tooltip } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil } from "@fortawesome/free-solid-svg-icons"
import Style from "../../../App.module.css"

function CategoryCard({
    setIsArticleOpen,
    setSelectedCategory,
    setIsEditing,
    category,
    setIsinitialCategory,
}) {
    return (
        <ListGroup.Item
            className={Style.categoryItem}
            value={category?.name}
            onClick={() => {
                setSelectedCategory(category)
                setIsinitialCategory(false)
                setIsArticleOpen(true)
            }}
        >
            <OverlayTrigger
                key="right"
                placement="right"
                overlay={
                    <Tooltip id={`tooltip-right`}>
                        {category?.description}
                    </Tooltip>
                }
            >
                <span>{category?.name}</span>
            </OverlayTrigger>

            <FontAwesomeIcon
                className="ms-1"
                style={{ color: "brown" }}
                onClick={() => setIsEditing(true)}
                icon={faPencil}
            />
        </ListGroup.Item>
    )
}

export default CategoryCard
