import { test, expect } from '@playwright/test';

const API_URL = 'https://apiv2-test.coordinadora.com/recogidas/cm-solicitud-recogidas-ms/solicitud-recogida';
const NUM_POR_DIA = 9000;
const PORCENTAJE_MANANA = 0.7;
const CRECIMIENTO = 0.15;
const YEAR = 5;

test('Prueba de carga para API de solicitudes de recogida', async ({}) => {

  for (let year = 1; year <= YEAR; year++) {
    // Calcular el número total de solicitudes esperadas para el año actual
    let totalRequestsForYear = NUM_POR_DIA;
    for (let i = 1; i <= year; i++) {
      totalRequestsForYear += totalRequestsForYear * CRECIMIENTO;
    }

    // Calcular el número total de solicitudes para la mañana y la tarde
    const morningRequests = Math.round(totalRequestsForYear * PORCENTAJE_MANANA);
    const afternoonRequests = totalRequestsForYear - morningRequests;

    console.log(`Año ${year}: Simulando ${morningRequests} solicitudes de la mañana y ${afternoonRequests} solicitudes de la tarde`);

    // Simular solicitudes de la mañana
    for (let i = 0; i < morningRequests; i++) {
      await makeRequest();
    }

    // Simular solicitudes de la tarde
    for (let i = 0; i < afternoonRequests; i++) {
      await makeRequest();
    }
  }
});

// Función solicitud de recogida
async function makeRequest() {
  const requestData = {
    direccion: "123 Calle Principal",
    fechaRecogida: "2024-05-07",
    nombreEntrega: "Juan",
    apellidosEntrega: "Perez",
    celularEntrega: "123456789",
    emailUsuario: "juan@example.com",
    descripcionTipoVia: "Calle",
    aplicativo: "MiApp"
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });

  expect(response.status).toBe(200);
}