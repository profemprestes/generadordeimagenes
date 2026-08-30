export const enviosLowCostContext = {
  id: "envios-lowcost",
  nombre: "Envíos LowCost",
  nombre_gbp: "Envíos Lowcost / Cadetería Programada",
  sla: "Entrega garantizada antes de las 19:00 hs",
  corte_pedido: "13:00 hs",
  ruteo: "Ruteo agrupado Z1-Z5",
  anticipacion_minima: "2 horas para organización de hoja de ruta",
  tarifas_2026: {
    z1_hasta_3km: 3000,
    z2_3_a_5km: 4000,
    z3_5_a_7km: 5300,
    z4_7_a_10km: 7000,
    z5_mas_10km: "700 por km adicional (Math.ceil)"
  },
  condiciones_adicionales: {
    segunda_visita: "100% del valor (nuevo envío)",
    ahorro: "Hasta 30% agrupando entregas por planilla",
    cobranza_destino: "Sin costo adicional (contrareembolso gratuito)"
  },
  prompt_anchor_visual: "Inside a compact distribution hub, dozens of kraft parcels sorted into labelled crates on steel shelving, courier in navy polo scanning a box near a roll-up door with daylight."
};
