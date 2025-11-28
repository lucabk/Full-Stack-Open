import type { CoursePart } from "../util/types"


const Part = ({ course } : { course : CoursePart}) => {
    
    switch(course.kind) {
        case "basic":
            return (
                <div className="courses">
                    <strong>{course.name} {course.exerciseCount}</strong><br/>
                    {course.description}
                </div>
            )
        case "group":
            return(
                <div className="courses">
                    <strong>${course.name} {course.exerciseCount}</strong><br/>
                    project exercises {course.groupProjectCount}
                </div>
            )    
        case "background":
             return(
                <div className="courses">
                    <strong>{course.name} {course.exerciseCount}</strong><br/>
                    {course.description}<br/>
                    submit to {course.backgroundMaterial}

                </div>
             )
        case "special":
             return(
                <div className="courses">
                    <strong>{course.name} {course.exerciseCount}</strong><br/>
                    {course.description}<br/>
                    required skills: {course.requirements.join(", ")}

                </div>
             )
        default:
            return null
    }

}

export default Part