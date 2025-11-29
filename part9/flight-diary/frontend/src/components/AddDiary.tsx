import * as diaryService from "../service/diaryService" 
import type { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry, Visibility, Weather } from "../util/types"
import { toast } from 'react-toastify';

const AddDiary = ({ setEntries } : { setEntries : React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>> }) => {

    const addEntry = async (formData: FormData) => {
        const newEntry : NewDiaryEntry = {
            comment : formData.get("comment") as string,
            date : formData.get("date") as string,
            weather : formData.get("weather") as Weather,
            visibility : formData.get("visibility") as Visibility,
        }
        console.log(newEntry)
        try{
            const diaryAdded : DiaryEntry = await diaryService.addDiary(newEntry)
            const nonSensitiveDiaryAdded : NonSensitiveDiaryEntry= {
                id : diaryAdded.id,
                date : diaryAdded.date,
                weather : diaryAdded.weather,
                visibility : diaryAdded.visibility
            }
            setEntries(prev => [...prev, nonSensitiveDiaryAdded])
            toast.success("Diary added!")
        }catch(error){
            console.error("Error saving diary: ", error)
            toast.error("Error adding diary")
        }
    }

    return(
        <>
            <form action={addEntry}>
                <div>
                    <label htmlFor="date">date</label>
                    <input type="text" name="date" required/>
                </div>
                <div>
                    <label htmlFor="visibility">visibility</label>
                    <input type="text" name="visibility" required/>
                </div>
                <div>
                    <label htmlFor="weather">weather</label>
                    <input type="text" name="weather" required/>
                </div>
                <div>
                    <label htmlFor="comment">comment</label>
                    <input type="text" name="comment" required/>
                </div>
                <button type="submit">Add</button>
            </form>
        </>
    )
}

export default AddDiary