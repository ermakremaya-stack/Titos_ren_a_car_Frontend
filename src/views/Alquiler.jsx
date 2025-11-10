import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaAlquiler from "../components/alquileres/TablaAlquiler.jsx";
import CuadroBusqueda from "../components/busquedas/CuadroBusqueda.jsx";
import ModalRegistroAlquiler from "../components/alquileres/ModalRegistroAlquiler.jsx";
import ModalEdicionAlquiler from "../components/alquileres/ModalEditarAlquiler.jsx";
import ModalEliminacionAlquiler from "../components/alquileres/ModalEliminarAlquiler.jsx";

const Alquileres = () => {

    const [paginaActual, establecerPaginaActual] = useState(1);
    const elementosPorPagina = 5; 

    const [alquileres, setAlquileres] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [alquileresFiltrados, setAlquileresFiltrados] = useState([]);
    const [textoBusqueda, setTextoBusqueda] = useState('');

    const [mostrarModal, setMostrarModal] = useState(false);
    const [nuevoAlquiler, setNuevoAlquiler] = useState({
        fecha_inicio: '',
        fecha_fin: '',
    });

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
        console.log("🚀 Iniciando guardarEdicion con:", alquilerEditado);
        if (!alquilerEditado.fecha_inicio.trim()) {
            console.warn("⚠️ No hay Fecha inicio Valida:", alquilerEditado?.fecha_inicio);
            return;
        }
        try {
            const respuesta = await fetch(`http://localhost:3000/api/actualizarAlquiler/${alquilerEditado.id_alquiler}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(alquilerEditado)
            });
            console.log("Respuesta del servidor:", respuesta);

            if (!respuesta.ok) throw new Error('Error al actualizar');
            setMostrarModalEdicion(false);
            await obtenerAlquileres();
            console.log("✅ Alquiler actualizado correctamente");
        } catch (error) {
            console.error("Error al editar alquiler:", error);
            alert("No se pudo actualizar el alquiler.");
        }
    };





    const abrirModalEliminacion = (alquiler) => {
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
        if (!nuevoAlquiler.fecha_inicio.trim()) return;

        try {
            const respuesta = await fetch('http://localhost:3000/api/registrarAlquiler', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoAlquiler)
            });

            if (!respuesta.ok) throw new Error('Error al guardar');

            
            setNuevoAlquiler({ fecha_inicio: '', fecha_fin: ''});
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
            const datos = await respuesta.json();
            setAlquileres(datos);
            if (!respuesta.ok) {
                throw new Error("Error al obtener los alquileres");
            }
            const alquileresNormalizados = datos.map(a => ({
                id_alquiler: a.Id_Alquiler,
                fecha_inicio: a.Fecha_Inicio,
                fecha_fin: a.Fecha_Fin
            }));

            setAlquileres(alquileresNormalizados);
            setAlquileresFiltrados(alquileresNormalizados);
            setCargando(false);


        } catch (error) {
            console.error(error.message);
            setCargando(false);
        }
    };

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