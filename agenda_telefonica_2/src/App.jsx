import { useState, useEffect } from "react";
import axios from 'axios'
import Numbers from "./Components/Numbers.jsx";
import Formulario from "./Components/Formulario.jsx";
import FiltroBusqueda from "./Components/FiltroBusqueda.jsx";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState({ name: "", number: "" });
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault();
    const { name, number } = newName;
    console.log("entrando al evento del formulario", event.target.elements);
    if (persons.find((person) => person.name === name)) {
      alert(`Name ${name} already exists in the phonebook!`);
      setNewName("");
    } else {
      const personObject = {
        //agregar el nombre con la inicial mayuscula
        name: name.charAt(0).toUpperCase() + name.slice(1),
        //name: name,
        //important: Math.random() < 0.5,
        number: number,
        id: persons.length + 1,
      };
      //setPersons(persons.concat(personObject)) otra forma de hacer en contac
      setPersons((prevPersons) => prevPersons.concat(personObject));
      setNewName({ name: "", number: "" });
      console.log("El contacto fue agregado", persons);
    }
    console.log("El contacto fue agregado", persons);
  };
  const handleContactChange = (event) => {
    console.log(event.target.value);
    const { name, value } = event.target;
    setNewName((prevContact) => ({ ...prevContact, [name]: value }));
  };
  const handleCambioBusqueda = (event) => {
    setBusqueda(event.target.value);
  };

  const filtroDePersonas = persons.filter((person) =>
    person.name.toLowerCase().includes(busqueda.toLowerCase())
  );
  return (
    <div>
      <h2>Phonebook</h2>
      <FiltroBusqueda
        busqueda={busqueda}
        handleCambioBusqueda={handleCambioBusqueda}
      />
      <h2>add new</h2>
      <Formulario
        onSubmit={addPerson}
        handleNameChange={handleContactChange}
        handleNumberChange={handleContactChange}
        newContact={newName}
      />
      <h2>Numbers</h2>
      {filtroDePersonas.map((person) => (
        <Numbers key={person.id} persons={person} />
      ))}
    </div>
  );
};
export default App;
