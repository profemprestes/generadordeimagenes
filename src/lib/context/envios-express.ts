export const enviosExpressContext = {
  id: "envios-express",
  nombre: "Envíos Express",
  nombre_gbp: "Envíos Express / Mensajería Urgente",
  sla: "Entrega en franja de 3 hs o < 90 min",
  corte_pedido: "15:00 hs",
  anticipacion_minima: "2 horas",
  tarifas_2026: {
    base_hasta_3km: 3700,
    excedente_km: 1000,
    formula: "Math.ceil(distancia_km - 3) * 1000 + 3700",
    zonas: {
      z1_hasta_3km: 3700,
      z2_3_a_5km: 5700,
      z3_5_a_7km: 7700,
      z4_7_a_10km: 10700,
      z5_mas_10km: "Base $3.700 hasta 3km + $1.000/km excedente (Math.ceil)"
    }
  },
  condiciones_adicionales: {
    bulto_excedente: "Mayor a 5kg o 40x40x30cm: adicional desde $1.800",
    retorno_vuelta: "50% del valor original",
    segunda_visita: "100% (se computa como nuevo viaje)",
    lluvia_calle_mojada: "+50%",
    demora_espera: "10 min tolerancia sin cargo. $2.200 cada 10 min adicionales"
  },
  prompt_anchor_visual: "A courier in navy polo (#0636A5) and yellow cap (#FFEC01) on a light-blue delivery scooter waiting at a busy downtown Mar del Plata avenue traffic light, checking delivery route on a handlebar-mounted phone."
};
