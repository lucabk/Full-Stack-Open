import { useEffect, useState } from "react"
import type { NonSensitiveDiaryEntry } from "../util/types"
import * as diaryService from "../service/diaryService"
import SingleDiary from "./SingleDiary"
import AddDiary from "./AddDiary"

const Diaries = () => {
    const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([])

    useEffect(()=> {
        diaryService
            .getAllDiaries()
            .then(res => setEntries(res))
            .catch(error => console.error(error))
    }, [])
    
    return(
        <div>
            <h1 style={{textAlign: "center"}}>Diaries</h1>
            <h2>Add new entry</h2>
            <AddDiary setEntries={setEntries} />

            <h2 style={{marginTop : 50}}><strong>Diary Entries</strong></h2>
            {entries.map(e => <SingleDiary key={e.id} singlEntry={e}/>)}
        </div>
    )   
}

export default Diaries