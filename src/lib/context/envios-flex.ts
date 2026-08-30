export const enviosFlexContext = {
  id: "envios-flex",
  nombre: "Envíos Flex",
  nombre_gbp: "Envío Flex / Reparto E-Commerce",
  sla: "Same-Day antes de las 20:00 hs (Ventas hasta las 15:00 hs)",
  niveles_flex: {
    nivel_1_inicial: {
      volumen: "1 a 4 envíos/día",
      tarifas: "Z1 $3.000 | Z2 $4.000 | Z3 $5.300 | Z4 $7.000 | Z5 $700/km",
      segunda_visita: "50% en todas las zonas"
    },
    nivel_2_frecuente: {
      volumen: "+5 envíos/día",
      tarifas: "Z1 $3.000 | Z2 $4.000 | Z3 $5.300 | Z4 y Z5 tope fijo $6.500",
      segunda_visita: "Zona 1 Sin Cargo (Z2 a Z5 al 50%)"
    },
    nivel_3_cuentas: {
      volumen: "+10 envíos/día",
      tarifas: "Tarifa Plana $4.500 a todo Mar del Plata",
      segunda_visita: "100% Bonificada / Sin Cargo en todas las zonas"
    }
  },
  recargo_lluvia: "Reducido exclusivo para Flex al 30%",
  prompt_anchor_visual: "A smiling courier in navy polo and yellow cap handing a kraft parcel with marketplace shipping label to a customer at a residential front door in Mar del Plata."
};
