import { useState, useEffect } from "react";
import consultasServices from "./services/consultasBD.js";
import Notification from "./components/Notification.jsx";
//import axios from 'axios'
import Numbers from "./components/Numbers.jsx";
import Formulario from "./components/Formulario.jsx";
import FiltroBusqueda from "./components/FiltroBusqueda.jsx";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState({ name: "", number: "" });
  const [busqueda, setBusqueda] = useState("");
  const [message, setMessage] = useState('message...')
  const [errors, setErrors] = useState(false)

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
    const capitalizeName = (name) => {
      return name.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    }
    
    const existingPerson = persons.find(
      (person) => capitalizeName(person.name) === capitalizeName(name)
    );

    // const prueba = capitalizeName("daniel castellanos")
    // console.log("se actualizo el nombre", prueba)

    // const existingPerson = persons.find(
    //   (person) => person.name === name.charAt(0).toUpperCase() + name.slice(1)
    // );
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
              setErrors(false)
              setMessage(
                `Number Updated`,
              )
              ocultarMensaje()
              //alert("Number Updated");
            })
            .catch((error) => {
              setErrors(false)
              console.log(error)
              setMessage(
                `'${name}' phone could not be updated`,
              )
              ocultarMensaje()
            });
        }
        setNewName({ name: "", number: "" });
      } else {
        //alert("The name and number are the same");
        setErrors(true)
        setMessage(
          "The name and number are the same",
        )
        ocultarMensaje()
        setNewName({ name: "", number: "" });
      }
    } else {
      const personObject = {
        //agregar el nombre con la inicial mayuscula
        name: name.charAt(0).toUpperCase() + name.slice(1),
        number: number,
      };
      //setPersons(persons.concat(personObject)) otra forma de hacer en contac
      consultasServices.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName({ name: "", number: "" });
        setErrors(false)
        setMessage(
         "The contact was added",
        )
        ocultarMensaje()
        console.log("El contacto fue agregado", persons);
      })
      //agregamos el catch para recibir el error al guardar un nuevo contacto
      .catch(error => {
        console.log("error de registro", error.response.data.error)
        setErrors(true)
        if (error.response && error.response.data.error) {
          if (error.response.data.error.includes('Name must be at least 3 characters long')) {
            setMessage("Error: El nombre debe tener al menos 3 caracteres");
          } else if (error.response.data.error.includes('name missing')) {
            setMessage("Error: El nombre es requerido");
          } else if (error.response.data.error.includes('number missing')) {
            setMessage("Error: El número es requerido");
          } else if (error.response.data.error.includes('Invalid phone number format')) {
            setMessage("Error en el formato del numero, ejemplo: XX-XXXXXXX o XXX-XXXXXXXX");
          } else {
            setMessage(`Error: ${error.response.data.error}`);
          }
        } else {
          setMessage("Error: Unable to add contact");
        }
        ocultarMensaje()
    })
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
            setErrors(false)
            setMessage(
              `Number Deleted`,
            )
            ocultarMensaje()
            //alert("Eliminado con exito");
            setPersons(persons.filter((n) => n.id !== id));
          } else {
            setErrors(true)
            setMessage(
              `Error deleting record: '${response}'`,
            )
            ocultarMensaje()
            console.error("Error deleting record:", response);
          }
        })
        .catch((error) => {
          setErrors(true)
          setMessage(
            `Error deleting record: '${error}'`,
          )
          ocultarMensaje()
          console.error("Error deleting record:", error);
        });
    }
  };
  function ocultarMensaje() {
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
  return (
    <div className="container" >
      <h2>Phonebook</h2>
      <Notification 
      message={message} 
      indicator={errors} 
      />
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
