import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaMantenimiento from "../components/mantenimientos/TablaMantenimiento.jsx";
import CuadroBusqueda from "../components/busquedas/CuadroBusqueda.jsx";
import ModalRegistroMantenimiento from "../components/mantenimientos/ModalRegistrarMantenimiento.jsx";
import ModalEdicionMantenimiento from "../components/mantenimientos/ModalEditarMantenimiento.jsx";
import ModalEliminacionMantenimiento from "../components/mantenimientos/ModalEliminarMantenimiento.jsx";

const Mantenimientos = () => {

    const [paginaActual, establecerPaginaActual] = useState(1);
    const elementosPorPagina = 5; 

    const [mantenimientos, setMantenimientos] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [mantenimientosFiltrados, setMantenimientosFiltrados] = useState([]);
    const [textoBusqueda, setTextoBusqueda] = useState('');

    const [mostrarModal, setMostrarModal] = useState(false);

    const [nuevoMantenimiento, setNuevoMantenimiento] = useState({
        Descripcion: '',
        Justificacion: '',
        Fecha_Inicio: '',
        Fecha_Fin: '',
        Costo:'',
    });

    // Calcular coches paginados
    const mantenimientosPaginadas = mantenimientosFiltrados.slice(
        (paginaActual - 1) * elementosPorPagina,
        paginaActual * elementosPorPagina
    );


    const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
    const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

    const [mantenimientoEditado, setMantenimientoEditado] = useState(null);
    const [mantenimientoEliminar, setMantenimientoEliminar] = useState(null);

    const abrirModalEdicion = (mantenimiento) => {
        console.log("Mantenimiento recibido para editar:", { ...mantenimiento })
        setMantenimientoEditado({ ...mantenimiento });
        setMostrarModalEdicion(true);
    };



    const guardarEdicion = async () => {
        console.log("🚀 Iniciando guardarEdicion con:", mantenimientoEditado);
        if (!mantenimientoEditado.fecha_inicio.trim()) {
            console.warn("⚠️ No hay Fecha inicio Valida:", mantenimientoEditado?.fecha_inicio);
            return;
        }
        try {
            const respuesta = await fetch(`http://localhost:3000/api/actualizarMantenimiento/${mantenimientoEditado.Id_Mantenimiento}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mantenimientoEditado)
            });
            console.log("Respuesta del servidor:", respuesta);

            if (!respuesta.ok) throw new Error('Error al actualizar');
            setMostrarModalEdicion(false);
            await obtenerMantenimientos();
            console.log("✅ Mantenimiento actualizado correctamente");
        } catch (error) {
            console.error("Error al editar mantenimiento:", error);
            alert("No se pudo actualizar el mantenimiento.");
        }
    };





    const abrirModalEliminacion = (mantenimiento) => {
        setMantenimientoEliminar(mantenimiento);
        setMostrarModalEliminar(true);
    };



    const confirmarEliminacion = async () => {
        try {
            const respuesta = await fetch(`http://localhost:3000/api/eliminarMantenimiento/${mantenimientoEliminar.Id_Mantenimiento}`, {
                method: 'DELETE',
            });
            if (!respuesta.ok) throw new Error('Error al eliminar');
            setMostrarModalEliminar(false);
            setMantenimientoEliminar(null);
            await obtenerMantenimientos();
        } catch (error) {
            console.error("Error al eliminar un mantenimiento:", error);
            alert("No se pudo eliminar el mantenimiento.");
        }
    };




    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        setNuevoMantenimiento(prev => ({ ...prev, [name]: value }));
    };

    const agregarMantenimiento = async () => {
        if (!setNuevoMantenimiento.Fecha_Inicio.trim()) return;

        try {
            const respuesta = await fetch('http://localhost:3000/api/registrarMantenimiento', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoMantenimiento) // cambio aqui por set
            });

            if (!respuesta.ok) throw new Error('Error al guardar');

            
            setNuevoMantenimiento({ fecha_inicio: '', fecha_fin: ''});
            setMostrarModal(false);
            await obtenerMantenimientos(); 
        } catch (error) {
            console.error("Error al agregar el mantenimiento:", error);
            alert("No se pudo guardar el alquiler. Revisa la consola.");
        }
    };


    const obtenerMantenimientos = async () => {
        try {
            const respuesta = await fetch("http://localhost:3000/api/Mantenimientos");
            const datos = await respuesta.json();
            setMantenimientos(datos);
            if (!respuesta.ok) {
                throw new Error("Error al obtener los alquileres");
            }
            const mantenimientosNormalizados = datos.map(a => ({
                Id_Mantenimiento: a.Id_Mantenimiento,
                Descripcion: a.Descripcion,
                Justificacion: a.Justificacion,
                Fecha_Inicio: a.Fecha_Inicio,
                Fecha_Fin: a.Fecha_Fin
            }));

            setMantenimientos(mantenimientosNormalizados);
            setMantenimientosFiltrados(mantenimientosNormalizados);
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

        const filtrados = mantenimientos.filter(
            (mantenimiento) =>
                mantenimiento.fecha_inicio.toLowerCase().includes(texto) ||
                mantenimiento.fecha_fin.toLowerCase().includes(texto) 
        );
        setAlquileresFiltrados(filtrados)
    };

    useEffect(() => {
        obtenerMantenimientos();
    }, []);

    return (
        <>
            <Container className="mt-4">
                <h4>Mantenimientos</h4>
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
                    alquileres={mantenimientosPaginadas}
                    cargando={cargando}
                    abrirModalEdicion={abrirModalEdicion}
                    abrirModalEliminacion={abrirModalEliminacion}
                    totalElementos={alquileres.length}
                    elementosPorPagina={elementosPorPagina}
                    paginaActual={paginaActual}
                    establecerPaginaActual={establecerPaginaActual}
                />

                <ModalRegistroMantenimiento
                    mostrarModal={mostrarModal}
                    setMostrarModal={setMostrarModal}
                    nuevoMantenimiento={nuevoMantenimiento}
                    manejarCambioInput={manejarCambioInput}
                    agregarMantenimiento={agregarMantenimiento}
                />

                <ModalEdicionMantenimiento
                    mostrar={mostrarModalEdicion}
                    setMostrar={setMostrarModalEdicion}
                    alquilerEditado={mantenimientoEditado}
                    setMantenimientoEditado={setEditado}
                    guardarEdicion={guardarEdicion}
                />

                <ModalEliminacionMantenimiento
                    mostrar={mostrarModalEliminar}
                    setMostrar={setMostrarModalEliminar}
                    mantenimiento={mantenimientoEliminar}
                    confirmarEliminacion={confirmarEliminacion}
                />
            </Container>
        </>

    );
};

export default Mantenimientos;