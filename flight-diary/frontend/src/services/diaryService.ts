import axios from "axios";
import { Diary, NewDiary } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

const getAll = async (): Promise<Diary[]> => {
  const response = await axios.get<Diary[]>(baseUrl);
  return response.data;
};

const create = async (object: NewDiary): Promise<Diary> => {
  const response = await axios.post<Diary>(baseUrl, object);
  return response.data;
}

export default { create, getAll };
