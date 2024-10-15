const Formulario = ({
  onSubmit,
  handleNameChange,
  handleNumberChange,
  newContact,
}) => {
  return (
    <>
      <form className="form-group" onSubmit={onSubmit}>
        <div>
          {/* para evitar error en el value del input se agrega el || "" */}
          name:{" "}
          <input
            name="name"
            onChange={handleNameChange}
            value={newContact.name || ""}
          />
        </div>
        <div>
          number:{" "}
          <input
            name="number"
            onChange={handleNumberChange}
            value={newContact.number || ""}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default Formulario;
