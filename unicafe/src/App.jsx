import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({
  good,
  neutral,
  bad,
  totalResponses,
  averageScore,
  positiveFeedback,
}) => {
  return (
    <table>
      <tbody>
        <StatisticLine text={"good"} value={good} />
        <StatisticLine text={"neutral"} value={neutral} />
        <StatisticLine text={"bad"} value={bad} />
        <StatisticLine text={"all"} value={totalResponses} />
        <StatisticLine text={"average"} value={averageScore.toFixed(1)} />
        <StatisticLine
          text={"positive feedback"}
          value={positiveFeedback.toFixed(2) + "%"}
        />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Calculate total feedback score: good (1), neutral (0), bad (-1)
  const totalScore = good * 1 + neutral * 0 + bad * -1;
  const totalResponses = good + neutral + bad;

  // Calculate average score (if there are any responses)
  const averageScore = totalResponses > 0 ? totalScore / totalResponses : 0;

  //calculate the percentage of positive feedback
  const positiveFeedback =
    totalResponses > 0 ? (good / totalResponses) * 100 : 0;

  console.log("rendering with new feedback");
  const goodFeedback = () => {
    console.log("Increasing good value", good);
    setGood(good + 1);
  };
  const neutralFeedback = () => {
    console.log("Increasing neutral value", neutral);
    setNeutral(neutral + 1);
  };
  const badFeedback = () => {
    console.log("Increasing bad value", bad);
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give Feedback!</h1>
      <Button onClick={goodFeedback} text="good" />
      <Button onClick={neutralFeedback} text="neutral" />
      <Button onClick={badFeedback} text="bad" />
      <h1>Statistics</h1>
      {totalResponses > 0 ? (
        <>
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            totalResponses={totalResponses}
            averageScore={averageScore}
            positiveFeedback={positiveFeedback}
          />
        </>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

export default App;
