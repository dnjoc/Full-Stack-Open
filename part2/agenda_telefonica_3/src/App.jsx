import { useState, useEffect } from "react";
import consultasServices from "./services/consultasBD.js";
//import axios from 'axios'
import Numbers from "./components/Numbers.jsx";
import Formulario from "./Components/Formulario.jsx";
import FiltroBusqueda from "./components/FiltroBusqueda.jsx";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState({ name: "", number: "" });
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    consultasServices.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);
  console.log("render", persons.length, "persons");

  const addPerson = (event) => {
    event.preventDefault();
    const { name, number } = newName;
    console.log("nuevo nombre", newName.name);
    console.log("entrando al evento del formulario", event.target.elements);
    const existingPerson = persons.find(
      (person) => person.name === name.charAt(0).toUpperCase() + name.slice(1)
    );
    console.log("Persona encontrada:", existingPerson);
    if (existingPerson) {
      console.log("existe la persona");
      if (existingPerson.number !== number) {
        if (
          window.confirm(
            `Name ${name} is already added to phonebook, replace the old number with a new one `
          )
        ) {
          consultasServices
            .update(existingPerson.id, { ...existingPerson, number: number })
            .then((returnedPerson) => {
              setPersons(
                persons.map((person) =>
                  person.id === existingPerson.id ? returnedPerson : person
                )
              );
              setNewName({ name: "", number: "" });
              console.log("telefono actualizado");
              alert("Number Updated");
            });
        }
        setNewName({ name: "", number: "" });
      } else {
        alert("The name and number are the same");
        setNewName({ name: "", number: "" });
      }
    } else {
      const personObject = {
        //agregar el nombre con la inicial mayuscula
        name: name.charAt(0).toUpperCase() + name.slice(1),
        //name: name,
        //important: Math.random() < 0.5,
        number: number,
        //id: persons.length + 1,
      };
      //setPersons(persons.concat(personObject)) otra forma de hacer en contac
      consultasServices.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName({ name: "", number: "" });
        console.log("El contacto fue agregado", persons);
      });
      // setPersons((prevPersons) => prevPersons.concat(personObject));
      // setNewName({ name: "", number: "" });
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
  const toggleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta entrada?")) {
      consultasServices
        .del(id)
        .then((response) => {
          if (response === 200 || response === 204) {
            alert("Eliminado con exito");
            setPersons(persons.filter((n) => n.id !== id));
          } else {
            console.error("Error al eliminar el registro:", response);
          }
        })
        .catch((error) => {
          console.error("Error al eliminar el registro:", error);
        });
    }
  };
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
        <Numbers
          key={person.id}
          persons={person}
          toggleDelete={() => toggleDelete(person.id)}
        />
      ))}
    </div>
  );
};
export default App;
