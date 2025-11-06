import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import TablaAlquiler from '../components/alquiler/TablaAlquiler';



const Alquiler = () => {

    const [alquiler, setAlquiler] = useState([]);
    const [cargando, setCargando] = useState(true);


    const obtenerAlquiler = async () => {
        try {
            const respuesta = await fetch('http://localhost:3000/api/alquiler');
            if (!respuesta.ok) {
                throw new Error('Error al obtener las Alquiler');
            }
            const datos = await respuesta.json();
            setAlquiler(datos);
            setCargando(false);

        } catch (error) {
            console.log(error.message);
            setCargando(false);
        }
    }


        useEffect(() => {
        obtenerAlquiler();
    }, []);


    return (
        <>
            <Container className="mt-4">

                <h4>Alquiler</h4>

                

                <TablaAlquiler
                    Alquilerr={AlquilerFiltrados}
                    cargando={cargando}
                />

            </Container>
            
        </>
    );
}
export default Alquiler;
