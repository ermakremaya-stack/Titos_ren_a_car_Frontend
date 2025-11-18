import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaAlquiler from "../components/alquileres/TablaAlquiler.jsx";
import CuadroBusqueda from "../components/busquedas/CuadroBusqueda.jsx";
import ModalRegistroAlquiler from "../components/alquileres/ModalRegistroAlquiler.jsx";
import ModalEdicionAlquiler from "../components/alquileres/ModalEditarAlquiler.jsx";
import ModalEliminacionAlquiler from "../components/alquileres/ModalEliminarAlquiler.jsx";
import ModalDetalleAlquiler from '../components/detalle_alquiler/ModalDetalleAlquiler.jsx';


const Alquileres = () => {

    const [paginaActual, establecerPaginaActual] = useState(1);
    const elementosPorPagina = 5;

    const [alquileres, setAlquileres] = useState([]);
    const [cargando, setCargando] = useState(true);

    const usuario = JSON.parse(localStorage.getItem("usuarioTito")) || {};
    const puedeEliminar = usuario.rol !== "Usuario"; // Solo NO clientes

    const [alquileresFiltrados, setAlquileresFiltrados] = useState([]);
    const [textoBusqueda, setTextoBusqueda] = useState('');

    const [mostrarModal, setMostrarModal] = useState(false);

    const [usuarios, setUsuario] = useState([]);
    const [coches, setCoches] = useState([]);


    // /////////////////////////////
    const obtenerFechaActual = () => {
    const ahora = new Date();
    ahora.setMinutes(ahora.getMinutes() - ahora.getTimezoneOffset());
    return ahora.toISOString().slice(0, 16);
};

const obtenerFechaFin = () => {
    const fin = new Date();
    fin.setHours(fin.getHours() + 1);
    fin.setMinutes(fin.getMinutes() - fin.getTimezoneOffset());
    return fin.toISOString().slice(0, 16);
};

const [nuevoAlquiler, setNuevoAlquiler] = useState({
    fecha_inicio: obtenerFechaActual(),
    fecha_fin: obtenerFechaFin(),
});

// Estado para detalles de un alquiler
const [detallesAlquiler, setDetallesAlquiler] = useState([]);
const [mostrarModalDetalles, setMostrarModalDetalles] = useState(false);
const [detallesNuevosAlquiler, setDetalleNuevoAlquiler] = useState([]); 




// ///////////////////////////////////////////////////////////////////

    // Calcular coches paginados
    const alquileresPaginadas = alquileresFiltrados.slice(
        (paginaActual - 1) * elementosPorPagina,
        paginaActual * elementosPorPagina
    );

    const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
    const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

    const [alquilerEditado, setAlquilerEditado] = useState(null);
    const [alquilerEliminar, setAlquilerEliminar] = useState(null);

    const abrirModalEdicion = (alquiler) => {
        console.log("Alquiler recibido para editar:", { ...alquiler })
        setAlquilerEditado({ ...alquiler });
        setMostrarModalEdicion(true);
    };



    const guardarEdicion = async () => {
        if (!alquilerEditado?.fecha_inicio?.trim()) {
            alert("Debe ingresar una fecha de inicio válida");
            return;
        }

        try {
            const respuesta = await fetch(
                `http://localhost:3000/api/actualizarAlquiler/${alquilerEditado.id_alquiler}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        fecha_inicio: alquilerEditado.fecha_inicio,
                        fecha_fin: alquilerEditado.fecha_fin
                    })
                }
            );

            if (!respuesta.ok) throw new Error("Error al actualizar");

            setMostrarModalEdicion(false);
            await obtenerAlquileres();
            console.log("Alquiler actualizado correctamente");
        } catch (error) {
            console.error("Error al editar alquiler:", error);
            alert("No se pudo actualizar el alquiler.");
        }
    };








    const abrirModalEliminacion = (alquiler) => {
        if (!puedeEliminar) {
            alert("No tienes permiso para eliminar alquileres.");
            return;
        }
        setAlquilerEliminar(alquiler);
        setMostrarModalEliminar(true);
    };


    const confirmarEliminacion = async () => {
        try {
            const respuesta = await fetch(`http://localhost:3000/api/eliminarAlquiler/${alquilerEliminar.id_alquiler}`, {
                method: 'DELETE',
            });
            if (!respuesta.ok) throw new Error('Error al eliminar');
            setMostrarModalEliminar(false);
            setAlquilerEliminar(null);
            await obtenerAlquileres();
        } catch (error) {
            console.error("Error al eliminar alquiler:", error);
            alert("No se pudo eliminar el alquiler.");
        }
    };




    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        setNuevoAlquiler(prev => ({ ...prev, [name]: value }));
    };

    const agregarAlquiler = async () => {
    if (!nuevoAlquiler.fecha_inicio.trim() || detallesNuevosAlquiler.length === 0) {
        alert("Completa la fecha de inicio y agrega al menos un detalle de alquiler.");
        return;
    }

    try {
        // 1️⃣ Registrar el alquiler
        const respuesta = await fetch('http://localhost:3000/api/registrarAlquiler', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoAlquiler)
        });

        if (!respuesta.ok) throw new Error('Error al guardar el alquiler');

        const { id_alquiler } = await respuesta.json();

        // 2️⃣ Registrar los detalles de alquiler
        for (const d of detallesNuevosAlquiler) {
            await fetch('http://localhost:3000/api/registrarDetalleAlquiler', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...d, Id_Alquiler: id_alquiler })
            });
        }

        // Limpiar formulario y refrescar lista
        setNuevoAlquiler({ fecha_inicio: '', fecha_fin: '' });
        setDetalleNuevoAlquiler([]);
        setMostrarModal(false);
        await obtenerAlquileres();

    } catch (error) {
        console.error("Error al agregar el alquiler:", error);
        alert("No se pudo guardar el alquiler. Revisa la consola.");
    }
};


    const obtenerAlquileres = async () => {
        try {
            const respuesta = await fetch("http://localhost:3000/api/Alquileres");
            if (!respuesta.ok) throw new Error("Error al obtener los alquileres");

            const datos = await respuesta.json();

            // Normalizamos los datos para usar nombres consistentes en frontend
            const alquileresNormalizados = datos.map(a => ({
                id_alquiler: a.Id_Alquiler,      // coincide con la DB pero adaptado al frontend
                fecha_inicio: a.Fecha_Inicio,
                fecha_fin: a.Fecha_Fin
            }));

            setAlquileres(alquileresNormalizados);
            setAlquileresFiltrados(alquileresNormalizados);
            setCargando(false);
        } catch (error) {
            console.error("Error en obtenerAlquileres:", error.message);
            setCargando(false);
        }
    };
//////////////////////////// DETALLE ///////////////////////////////
    const obtenerDetalleAlquiler = async (id_alquiler) => {
    try {
        const resp = await fetch('http://localhost:3000/api/Detalle_Alquiler'); // Ajusta la ruta
        if (!resp.ok) throw new Error('Error al cargar detalles');
        const todos = await resp.json();

        const filtrados = todos.filter(d => d.Id_Alquiler === parseInt(id_alquiler));

        const detallesConNombres = await Promise.all(
            filtrados.map(async (d) => ({
                ...d,
                marca: await obtenerNombreCoche(d.Id_Coche),
                nombre1: await obtenerNombreUsuario(d.Id_Usuario)
            }))
        );

        setDetallesAlquiler(detallesConNombres);
        setMostrarModalDetalles(true);
    } catch (error) {
        console.error(error);
        alert("No se pudieron cargar los detalles del alquiler.");
    }
};
////////////////////////////////////////////////////////////

// Funciones auxiliares
const obtenerNombreCoche = async (id) => {
    try {
        const resp = await fetch(`http://localhost:3000/api/Coches/${id}`);
        if (!resp.ok) return '—';
        const data = await resp.json();
        return data.nombre_coche || '—';
    } catch {
        return '—';
    }
};
// ////////////////////////// DETALLE ///////////////////////////////
    const obtenerNombreUsuario = async (id) => {
        try {
            const resp = await fetch(`http://localhost:3000/api/usuarios/${id}`);
            if (!resp.ok) return '—';
            const data = await resp.json();
            return data.nombre || '—';
        } catch {
            return '—';
        }
    };
//////////////////////////////////////////////////////////////////////////

    const [textoVisible, setTextoVisible] = useState("")

    setTextoVisible

    const manejarCambioBusqueda = (e) => {

        const original = e.target.value;
        setTextoVisible(original);

        const texto = e.target.value
            .toLowerCase()
            .normalize("NFD") // separa acentos de letras
            .replace(/[\u0300-\u036f]/g, ""); // elimina acentos
        setTextoBusqueda(texto);

        const filtrados = alquileres.filter(
            (alquiler) =>
                alquiler.fecha_inicio.toLowerCase().includes(texto) ||
                alquiler.fecha_fin.toLowerCase().includes(texto)
        );
        setAlquileresFiltrados(filtrados)
    };

    useEffect(() => {
        obtenerAlquileres();
    }, []);

    return (
        <>
            <Container className="mt-4">
                <h4>Alquileres</h4>
                <Row>
                    <Col lg={5} md={8} sm={8} xs={7}>
                        <CuadroBusqueda
                            textoBusqueda={textoBusqueda}
                            manejarCambioBusqueda={manejarCambioBusqueda}
                        />
                    </Col>

                    <Col className="text-end">
                        <Button
                            className="color-boton"
                            onClick={() => setMostrarModal(true)}
                        >
                            + Nuevo Alquiler
                        </Button>
                    </Col>
                </Row>

                <br />

                <TablaAlquiler
                    alquileres={alquileresPaginadas}
                    cargando={cargando}
                    abrirModalEdicion={abrirModalEdicion}
                    abrirModalEliminacion={abrirModalEliminacion}
                    totalElementos={alquileres.length}
                    elementosPorPagina={elementosPorPagina}
                    paginaActual={paginaActual}
                    establecerPaginaActual={establecerPaginaActual}
                />

                <ModalRegistroAlquiler
                    mostrarModal={mostrarModal}
                    setMostrarModal={setMostrarModal}
                    nuevoAlquiler={nuevoAlquiler}
                    manejarCambioInput={manejarCambioInput}
                    agregarAlquiler={agregarAlquiler}
                    detalles={detallesAlquiler}
                />

                <ModalEdicionAlquiler
                    mostrar={mostrarModalEdicion}
                    setMostrar={setMostrarModalEdicion}
                    alquilerEditado={alquilerEditado}
                    setAlquilerEditado={setAlquilerEditado}
                    guardarEdicion={guardarEdicion}
                />

                <ModalEliminacionAlquiler
                    mostrar={mostrarModalEliminar}
                    setMostrar={setMostrarModalEliminar}
                    alquiler={alquilerEliminar}
                    confirmarEliminacion={confirmarEliminacion}
                />
            </Container>
        </>

    );
};

export default Alquileres;