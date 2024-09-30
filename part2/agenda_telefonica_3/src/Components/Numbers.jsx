const Numbers = ({ persons, toggleDelete }) => {
  console.log("console log de Numbers", persons);
  return (
    <>
      {/* <p>{numbers.name} {numbers.number}</p> */}
      {/* {person.map((persons) => ( */}
      {/* <Numbers  numbers={person} /> */}
      {/* <p key={persons.id}> */}
      <li>
        {" "}
        {persons.name} {persons.number}
      <button onClick={toggleDelete}>delete</button>
      </li>
      {/* ))} */}
    </>
  );
};
export default Numbers;
