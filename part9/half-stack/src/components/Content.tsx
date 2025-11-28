import type { CoursePart } from "../util/types"
import Part from "./Part"

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
    return(
        <>
            {courseParts.map(p => <Part key={p.name} course={p}/>)}
        </>
    )
}

export default Content