const Numbers = ({ persons }) => {
  console.log("console log de Numbers", persons);
  return (
    <>
      {/* <p>{numbers.name} {numbers.number}</p> */}
      {/* {person.map((persons) => ( */}
      {/* <Numbers  numbers={person} /> */}
      {/* <p key={persons.id}> */}
      <p>
        {" "}
        {persons.name} {persons.number}
      </p>
      {/* ))} */}
    </>
  );
};
export default Numbers;
