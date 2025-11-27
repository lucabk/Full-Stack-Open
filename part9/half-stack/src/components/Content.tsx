import type { ContentProps } from "../util/types"

const Content = ({ coursePart }: { coursePart: ContentProps }) => {
    return(
        <p>
            {coursePart.name} {coursePart.exerciseCount}
        </p>
    )
}

export default Content