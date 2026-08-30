export const enviosExpressContext = {
  id: "envios-express",
  nombre: "Envíos Express",
  nombre_gbp: "Envíos Express / Mensajería Urgente",
  sla: "Entrega en franja de 3 hs o < 90 min",
  corte_pedido: "15:00 hs",
  anticipacion_minima: "2 horas",
  tarifas_2026: {
    base_hasta_3km: 3700,
    rango_3_a_5km: 4600,
    rango_5_a_7km: 6100,
    rango_7_a_10km: 8200,
    excedente_mas_10km: "1000 por km adicional (Math.ceil)"
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
