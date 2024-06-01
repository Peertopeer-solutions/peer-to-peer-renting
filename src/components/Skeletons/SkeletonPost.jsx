import Skeleton from "./Skeleton"

const SkeletonPost = () => {
    return (
        <div className="post">
            <Skeleton classes="image "/>
            <Skeleton classes="text widht-100" />
            <Skeleton classes="text width-50" />
            <Skeleton classes="text width-50" />
        </div>
    )
}
export default SkeletonPost