import { Diary } from "../types";

interface DiaryEntryProps {
  diary: Diary;
}

const DiaryEntry = (props: DiaryEntryProps) => {
  const { diary } = props;
  return (
    <div>
      <h3>{diary.date}</h3>
      <div>visibility: {diary.visibility}</div>
      <div>weather: {diary.weather}</div>
    </div>
  );
};

export default DiaryEntry;
