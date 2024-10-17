import { useState } from "react";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function getMostVoted(votes, anecdotes) {
  //get the element with the most votes
  let maxVotes = 0;
  let maxIndex = 0;
  votes.forEach((value, index) => {
    if (value >= maxVotes) {
      maxVotes = value;
      maxIndex = index;
    }
  });
  return maxIndex;
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  //make an array to hold votes for each array item
  const [selected, setSelected] = useState(getRandomInt(anecdotes.length));
  //make an array in the state with the length of anectodes
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  console.log(votes);
  const mostVoted = getMostVoted(votes, anecdotes);
  const getNextFeedBack = () => {
    //get the next one in the arrray if selected is smaller than length
    setSelected(selected < anecdotes.length - 1 ? selected + 1 : 0);
  };
  const addVote = () => {
    //make a copy of the votes array
    const newVotes = [...votes];
    //add one to the selected index
    newVotes[selected] = newVotes[selected] + 1;
    //update the state
    setVotes(newVotes);
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <div>
        <Button onClick={addVote} text="vote" />
        <Button onClick={getNextFeedBack} text="next feedback" />
      </div>

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVoted]}</p>
      <p>has {votes[mostVoted]} votes</p>
    </>
  );
};

export default App;
