import type { NonSensitiveDiaryEntry } from "../util/types"

const SingleDiary = ({ singlEntry } : { singlEntry : NonSensitiveDiaryEntry}) => {
    return(
        <div className="single-diary">
            <strong>{singlEntry.date}</strong><br/>
            visibility: {singlEntry.visibility}<br/>
            weather: {singlEntry.weather}<br/>
        </div>
    )
}

export default SingleDiary