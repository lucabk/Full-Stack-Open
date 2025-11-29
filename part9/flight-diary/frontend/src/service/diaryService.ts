import axios from "axios";
import type { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "../util/types";

const baseUrl = "http://localhost:3000/api/diaries"

export const getAllDiaries = async () => {
    const res = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl)
    return res.data
}

export const addDiary = async (newEntry : NewDiaryEntry) => {
    const res = await axios.post<DiaryEntry>(baseUrl, newEntry);
    return res.data
}