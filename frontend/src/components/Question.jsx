const Question = ({ data }) => {
  return (
    <div className="question-body">
      <p>{data.question}</p>
      <span>{data.name}</span> {"  "}
      <span>{data.likes_count}</span>
    </div>
  );
};

export default Question;
