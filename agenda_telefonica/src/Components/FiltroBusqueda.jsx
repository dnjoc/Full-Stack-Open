const FiltroBusqueda = ({ busqueda, handleCambioBusqueda }) => {
  return (
    <>
     {/* Search by name:{" "} */}
     filter shown with:{" "}
      <input
        type="text"
        value={busqueda}
        onChange={handleCambioBusqueda}
      />
    </>
  );
};

export default FiltroBusqueda;
