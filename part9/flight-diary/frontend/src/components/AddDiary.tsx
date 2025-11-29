import axios from "axios";
import * as diaryService from "../service/diaryService" 
import { Visibility, Weather, type DiaryEntry, type NewDiaryEntry, type NonSensitiveDiaryEntry } from "../util/types"
import { toast } from 'react-toastify';
import { useState } from "react";

const AddDiary = ({ setEntries } : { setEntries : React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>> }) => {

    const [weather, setWeather] = useState<Weather>(Weather.Sunny)
    const [visibility, setVisibility] = useState<Visibility>(Visibility.Great)
    
    const addEntry = async (formData: FormData) => {
        const newEntry : NewDiaryEntry = {
            comment : formData.get("comment") as string,
            date : formData.get("date") as string,
            weather : formData.get("weather") as Weather,
            visibility : formData.get("visibility") as Visibility,
        }
        console.log("newEntry: ", newEntry)
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
            if(axios.isAxiosError(error)){
                toast.error(error.response?.data.split(".")[1])
                console.error("Error saving diary: ", error)
            }else{
                console.error("Error saving diary: ", error)
            }
        }
    }

    return(
        <>
            <form action={addEntry}>
                <div>
                    <label htmlFor="date">date</label>
                    <input type="date" name="date" id="date" required/>
                </div>
                <div>
                    weather
                   <label>
                        <input
                            type="radio"
                            name="weather"
                            value={Weather.Sunny}
                            checked={weather === Weather.Sunny}
                            onChange={(e) => setWeather(e.target.value as Weather)}
                            required
                        />
                        sunny
                   </label>
                   <label>
                        <input
                            type="radio"
                            name="weather"
                            value={Weather.Rainy}
                            checked={weather === Weather.Rainy}
                            onChange={(e) => setWeather(e.target.value as Weather)}
                            required
                        />
                        rainy
                   </label>
                   <label>
                        <input
                            type="radio"
                            name="weather"
                            value={Weather.Cloudy}
                            checked={weather === Weather.Cloudy}
                            onChange={(e) => setWeather(e.target.value as Weather)}
                            required
                        />
                        cloudy
                   </label>
                   <label>
                        <input
                            type="radio"
                            name="weather"
                            value={Weather.Stormy}
                            checked={weather === Weather.Stormy}
                            onChange={(e) => setWeather(e.target.value as Weather)}
                            required
                        />
                        stormy
                   </label>
                   <label>
                        <input
                            type="radio"
                            name="weather"
                            value={Weather.Windy}
                            checked={weather === Weather.Windy}
                            onChange={(e) => setWeather(e.target.value as Weather)}
                            required
                        />
                        windy
                   </label>
                </div>
                <div>
                    visibility
                    <label>
                        <input
                            type="radio"
                            name="visibility"
                            value={Visibility.Great}
                            checked={visibility === Visibility.Great}
                            onChange={(e) => setVisibility(e.target.value as Visibility)}
                            required
                        />
                        great
                   </label>
                    <label>
                        <input
                            type="radio"
                            name="visibility"
                            value={Visibility.Good}
                            checked={visibility === Visibility.Good}
                            onChange={(e) => setVisibility(e.target.value as Visibility)}
                            required
                        />
                        good
                   </label>
                    <label>
                        <input
                            type="radio"
                            name="visibility"
                            value={Visibility.Ok}
                            checked={visibility === Visibility.Ok}
                            onChange={(e) => setVisibility(e.target.value as Visibility)}
                            required
                        />
                        ok
                   </label>
                    <label>
                        <input
                            type="radio"
                            name="visibility"
                            value={Visibility.Poor}
                            checked={visibility === Visibility.Poor}
                            onChange={(e) => setVisibility(e.target.value as Visibility)}
                            required
                        />
                        poor
                   </label>
                </div>
                <div>
                    <label htmlFor="comment">comment</label>
                    <input type="text" name="comment" id="comment" required/>
                </div>
                <button type="submit">Add</button>
            </form>
        </>
    )
}

export default AddDiary