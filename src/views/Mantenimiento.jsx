import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import TablaMantenimientos from "../components/mantenimientos/TablaMantenimiento";
import ModalRegistrarMantenimiento from "../components/mantenimientos/ModalRegistrarMantenimiento";
import ModalEliminarMantenimiento from "../components/mantenimientos/ModalEliminarMantenimiento";
import ModalDetallesMantenimiento from "../components/Detalle_Mantenimiento/ModalDetallesMantenimiento";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Mantenimiento = () => {
    const [mantenimientos, setMantenimientos] = useState([]);
    const [empleados, setEmpleados] = useState([]);
    const [coches, setCoches] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarEliminar, setMostrarEliminar] = useState(false);
    const [mostrarDetalles, setMostrarDetalles] = useState(false);

    const [detalles, setDetalles] = useState([]);
    const [mantenimientoSeleccionado, setMantenimientoSeleccionado] = useState(null);

    const [buscar, setBuscar] = useState("");

    const [nuevoMantenimiento, setNuevoMantenimiento] = useState({
        Descripcion: "",
        Justificacion: "",
        Fecha_Inicio: "",
        Fecha_Fin: "",
        Costo: 0
    });

    // PAGINACIÓN
    const [paginaActual, establecerPaginaActual] = useState(1);
    const elementosPorPagina = 3;

    // CONSULTAS
    const obtenerMantenimientos = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/mantenimientos");
            const data = await res.json();
            setMantenimientos(data);
        } catch (error) {
            console.error("Error al obtener mantenimientos:", error);
        }
        setCargando(false);
    };

    const obtenerEmpleados = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/empleados");
            setEmpleados(await res.json());
        } catch (error) {
            console.error("Error cargando empleados:", error);
        }
    };

    const obtenerCoches = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/coches");
            setCoches(await res.json());
        } catch (error) {
            console.error("Error cargando coches:", error);
        }
    };

    const obtenerDetalles = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/detalles-mantenimiento/${id}`);
            const data = await res.json();
            setDetalles(data);
            setMostrarDetalles(true);
        } catch (error) {
            console.error("Error al obtener detalles:", error);
        }
    };

    useEffect(() => {
        obtenerMantenimientos();
        obtenerEmpleados();
        obtenerCoches();
    }, []);

    // FILTRO
    const mantenimientosFiltrados = mantenimientos.filter((m) =>
        m.Descripcion.toLowerCase().includes(buscar.toLowerCase()) ||
        m.Justificacion.toLowerCase().includes(buscar.toLowerCase()) ||
        String(m.Id_Mantenimiento).includes(buscar)
    );

    // PAGINACIÓN
    const indexUltimo = paginaActual * elementosPorPagina;
    const indexPrimero = indexUltimo - elementosPorPagina;
    const mantenimientosPaginados = mantenimientosFiltrados.slice(indexPrimero, indexUltimo);
    const totalPaginas = Math.ceil(mantenimientosFiltrados.length / elementosPorPagina);

    const cambiarPagina = (num) => establecerPaginaActual(num);

    // GUARDAR
    const guardarMantenimiento = async () => {
        try {
            const body = { ...nuevoMantenimiento, detalles };

            const res = await fetch("http://localhost:3000/api/mantenimientos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (!res.ok) throw new Error("Error al guardar");

            obtenerMantenimientos();
            setMostrarModal(false);
            setDetalles([]);

        } catch (error) {
            console.error("Error al guardar mantenimiento:", error);
        }
    };

    // ⭐⭐⭐ ELIMINAR (CORREGIDA: elimina directo sin duplicar)
    const eliminarMantenimiento = async () => {
        try {
            await fetch(
                `http://localhost:3000/api/mantenimientos/${mantenimientoSeleccionado.Id_Mantenimiento}`,
                { method: "DELETE" }
            );

            // Quitar directamente del estado, sin recargar lista
            setMantenimientos(prev =>
                prev.filter(m => m.Id_Mantenimiento !== mantenimientoSeleccionado.Id_Mantenimiento)
            );

            setMostrarEliminar(false);

        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    };

    // MODALES
    const abrirModalEdicion = (m) => {
        setMantenimientoSeleccionado(m);
        setNuevoMantenimiento({
            Descripcion: m.Descripcion,
            Justificacion: m.Justificacion,
            Fecha_Inicio: m.Fecha_Inicio,
            Fecha_Fin: m.Fecha_Fin,
            Costo: m.Costo
        });
        setMostrarModal(true);
    };

    const abrirModalNuevo = () => {
        setMantenimientoSeleccionado(null);
        setNuevoMantenimiento({
            Descripcion: "",
            Justificacion: "",
            Fecha_Inicio: "",
            Fecha_Fin: "",
            Costo: 0
        });
        setDetalles([]);
        setMostrarModal(true);
    };

    const abrirModalEliminar = (m) => {
        setMantenimientoSeleccionado(m);
        setMostrarEliminar(true);
    };

    // EXPORTAR PDF
    const exportarPDF = () => {
        const doc = new jsPDF();

        doc.text("Reporte de Mantenimientos", 14, 10);

        const columnas = [
            "ID",
            "Descripción",
            "Justificación",
            "Fecha Inicio",
            "Fecha Fin",
            "Costo"
        ];

        const filas = mantenimientos.map(m => [
            m.Id_Mantenimiento,
            m.Descripcion,
            m.Justificacion,
            m.Fecha_Inicio,
            m.Fecha_Fin,
            m.Costo
        ]);

        autoTable(doc, {
            head: [columnas],
            body: filas,
            startY: 20,
        });

        doc.save("mantenimientos.pdf");
    };

    // EXPORTAR EXCEL
    const exportarExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(mantenimientos);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Mantenimientos");

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array"
        });

        const file = new Blob([excelBuffer], { type: "application/octet-stream" });

        saveAs(file, "mantenimientos.xlsx");
    };

    return (
        <div className="container mt-3">
            <br/>
            <br/>
            <br/>
            <h2 className="text-center">Gestión de Mantenimientos</h2>

            {/* Barra Superior */}
            <div className="d-flex justify-content-between align-items-center mb-3">

                {/* Buscador */}
                <input
                    type="text"
                    placeholder="Buscar..."
                    className="form-control w-25"
                    value={buscar}
                    onChange={(e) => {
                        setBuscar(e.target.value);
                        establecerPaginaActual(1);
                    }}
                />

                {/* Botones */}
                <div>
                    <Button variant="danger" size="sm" className="me-2" onClick={exportarPDF}>
                        PDF
                    </Button>

                    <Button variant="success" size="sm" className="me-2" onClick={exportarExcel}>
                        Excel
                    </Button>

                    <Button size="sm" className="btn btn-primary" onClick={abrirModalNuevo}>
                        Agregar
                    </Button>
                </div>
            </div>

            {/* Tabla */}
            <TablaMantenimientos
                mantenimientos={mantenimientosPaginados}
                cargando={cargando}
                abrirModalEdicion={abrirModalEdicion}
                abrirModalEliminacion={abrirModalEliminar}
                obtenerDetalles={obtenerDetalles}
            />

            {/* Paginación */}
            {totalPaginas > 1 && (
                <div className="d-flex justify-content-center mt-3">
                    <nav>
                        <ul className="pagination">
                            {[...Array(totalPaginas)].map((_, i) => (
                                <li
                                    key={i}
                                    className={`page-item ${paginaActual === i + 1 ? "active" : ""}`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => cambiarPagina(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            )}

            {/* Modales */}
            <ModalRegistrarMantenimiento
                mostrar={mostrarModal}
                setMostrar={setMostrarModal}
                nuevoMantenimiento={nuevoMantenimiento}
                setNuevoMantenimiento={setNuevoMantenimiento}
                detalles={detalles}
                setDetalles={setDetalles}
                empleados={empleados}
                coches={coches}
                agregarMantenimiento={guardarMantenimiento}
            />

            <ModalEliminarMantenimiento
                mostrar={mostrarEliminar}
                setMostrar={setMostrarEliminar}
                mantenimiento={mantenimientoSeleccionado}
                confirmar={eliminarMantenimiento}
            />

            <ModalDetallesMantenimiento
                mostrar={mostrarDetalles}
                setMostrar={setMostrarDetalles}
                detalles={detalles}
                mantenimiento={mantenimientoSeleccionado}
            />
        </div>
    );
};

export default Mantenimiento;
