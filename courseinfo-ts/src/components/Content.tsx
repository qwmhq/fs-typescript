import { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = (props: ContentProps) => {
  const { courseParts } = props;
  return (
    <div>
      {courseParts.map((part, idx) => <Part key={idx} coursePart={part}/>)}
    </div>
  );
};

export default Content;
