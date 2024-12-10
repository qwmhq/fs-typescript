import { CoursePart } from "../types";

const h3Style = {
  padding: 0,
  marginBottom: 0,
};

const pStyle = {
  margin: 0,
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  return (
    <div>
      <h3 style={h3Style}>
        {coursePart.name} {coursePart.exerciseCount}
      </h3>
      {coursePart.kind === "basic" ||
      coursePart.kind === "background" ||
      coursePart.kind === "special" ? (
        <i>{coursePart.description}</i>
      ) : null}
      {coursePart.kind === "group" ? (
        <p style={pStyle}>project exercises {coursePart.groupProjectCount}</p>
      ) : null}
      {coursePart.kind === "background" ? (
        <p style={pStyle}>submit to {coursePart.backgroundMaterial}</p>
      ) : null}
      {coursePart.kind === "special" ? (
        <p style={pStyle}>
          required skills: {coursePart.requirements.join(", ")}
        </p>
      ) : null}
    </div>
  );
};

export default Part;
