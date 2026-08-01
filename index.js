import { useState, useEffect } from "react";
import ItemColor from "./components/ItemColor";
import Swal from "sweetalert2";

const API_URL = "http://localhost:4000/api/colores";

function App() {
  const [colores, setColores] = useState([]);
  const [inputColor, setInputColor] = useState("");
  const [colorEditando, setColorEditando] = useState(null);

  const obtenerColoresAPI = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setColores(data);
    } catch (error) {
      console.error("Error al traer colores:", error);
    }
  };

  useEffect(() => {
    obtenerColoresAPI();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputColor.trim()) return;

    try {
      if (colorEditando) {
        const res = await fetch(`${API_URL}/${colorEditando._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombreColor: inputColor }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.mensaje || data.errores?.[0]?.msg);

        Swal.fire(
          "¡Actualizado!",
          "El color se modificó correctamente.",
          "success",
        );
        setColorEditando(null);
      } else {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombreColor: inputColor }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.mensaje || data.errores?.[0]?.msg);

        Swal.fire("¡Creado!", "El color se guardó exitosamente.", "success");
      }

      setInputColor("");
      obtenerColoresAPI();
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  // 3. BORRAR COLOR (DELETE)
  const handleBorrar = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
          if (res.ok) {
            Swal.fire("Borrado", "El color fue eliminado.", "success");
            obtenerColoresAPI();
          }
        } catch (error) {
          Swal.fire("Error", "No se pudo eliminar el color", "error");
        }
      }
    });
  };

  const handleIniciarEdicion = (colorObj) => {
    setColorEditando(colorObj);
    setInputColor(colorObj.nombreColor);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-extrabold mb-6 tracking-wide text-gray-100">
        Administrador de Colores
      </h1>

      <div className="w-full max-w-2xl bg-gray-900 p-4 rounded-xl border border-gray-800 mb-6 shadow-md">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Ingresa un color (ej: rojo, verde, #ff0055)"
            value={inputColor}
            onChange={(e) => setInputColor(e.target.value)}
            className="flex-grow bg-gray-950 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <button
            type="submit"
            className={`${
              colorEditando
                ? "bg-amber-600 hover:bg-amber-500"
                : "bg-blue-600 hover:bg-blue-500"
            } text-white font-bold px-6 py-2 rounded-lg transition-colors`}
          >
            {colorEditando ? "Guardar" : "Enviar"}
          </button>
          {colorEditando && (
            <button
              type="button"
              onClick={() => {
                setColorEditando(null);
                setInputColor("");
              }}
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Cancelar
            </button>
          )}
        </form>
      </div>

      <ul className="w-full max-w-2xl flex flex-col gap-3">
        {colores.map((colorObj) => (
          <ItemColor
            key={colorObj._id}
            colorItem={colorObj}
            onDelete={handleBorrar}
            onEdit={handleIniciarEdicion}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
