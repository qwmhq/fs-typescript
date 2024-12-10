import { useEffect, useState } from "react";
import diaryService from "./services/diaryService";
import { Diary } from "./types";
import DiaryForm from "./components/DiaryForm";
import DiaryEntry from "./components/DiaryEntry";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  useEffect(() => {
    diaryService.getAll().then((data) => setDiaries(data));
  }, []);

  const onDiarySubmit = (d: Diary) => {
    setDiaries(diaries.concat(d));
  }

  return (
    <>
      <DiaryForm onSubmit={onDiarySubmit}/>
      <h2>Diary Entries</h2>
      {diaries.map((d, idx) => (
        <DiaryEntry key={idx} diary={d} />
      ))}
    </>
  );
};

export default App;
