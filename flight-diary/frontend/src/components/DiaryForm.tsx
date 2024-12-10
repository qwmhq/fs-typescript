import { useState } from "react";
import { Diary, Visibility, Weather } from "../types";
import diaryService from "../services/diaryService";
import axios from "axios";

interface DiaryFormProps {
  onSubmit: (diary: Diary) => void;
}

const DiaryForm = (props: DiaryFormProps) => {
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Ok);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [date, setDate] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const diary = await diaryService.create({
        date,
        weather,
        visibility,
        comment,
      });
      props.onSubmit(diary);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response!.data);
        setTimeout(() => {
          setError(null);
        }, 5000);
      } else {
        console.error(error);
      }
    }
  };

  const onVisibilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVisibility(e.target.value as Visibility);
  };

  const onWeatherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeather(e.target.value as Weather);
  };

  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const onCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const errorStyle = {
    color: "red",
  };

  return (
    <>
      <h2>Add new entry</h2>
      {error === null || <div style={errorStyle}>{error}</div>}
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="date">date</label>
          <input id="date" type="date" onChange={onDateChange} />
        </div>
        <div>
          <fieldset>
            <legend>visibility</legend>
            {Object.values(Visibility).map((val, idx) => (
              <div key={idx}>
                <input
                  id={val}
                  type="radio"
                  name="visibility"
                  value={val}
                  onChange={onVisibilityChange}
                  checked={visibility === val}
                />
                <label htmlFor={val}>{val}</label>
              </div>
            ))}
          </fieldset>
        </div>
        <div>
          <fieldset>
            <legend>weather</legend>
            {Object.values(Weather).map((val, idx) => (
              <div key={idx}>
                <input
                  type="radio"
                  id={val}
                  name="weather"
                  value={val}
                  onChange={onWeatherChange}
                  checked={weather === val}
                />
                <label htmlFor={val}>{val}</label>
              </div>
            ))}
          </fieldset>
        </div>
        <div>
          <label htmlFor="comment">comment</label>
          <input
            id="comment"
            type="text"
            value={comment}
            onChange={onCommentChange}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default DiaryForm;
