export const planEmprendedoresContext = {
  id: "plan-emprendedores",
  nombre: "Plan Emprendedores & E-Commerce",
  nombre_gbp: "Plan Emprendedores / Reparto E-Commerce",
  modalidades: {
    ecommerce_24hs: {
      descripcion: "Retiro hoy y entrega mañana en toda la ciudad (franja 9 a 20 hs)",
      escalas_tarifa_plana: [
        { nivel: "Inicial (1-199 envíos/mes)", valor: 3800 },
        { nivel: "Pro (200-1.199 envíos/mes)", valor: 3500 },
        { nivel: "Elite (1.200-1.999 envíos/mes)", valor: 3200 },
        { nivel: "Partner (+2.000 envíos/mes)", valor: 3000 }
      ],
      retiro_diario: "Gratis superando 10 paquetes. Si es menor: $4.000",
      opcion_dropoff: "20% de descuento directo despachando en depósito Friuli 1972"
    },
    cuenta_corriente_flexible: {
      descripcion: "Para PyMEs sin volumen fijo. Tarifa LowCost con beneficios de franja Express",
      liquidacion: "Diaria, Semanal, Quincenal o Mensual con Factura C"
    }
  },
  prompt_anchor_visual: "Young entrepreneur setting kraft parcels on the reception counter at Friuli 1972 logistics hub, staff member in navy polo entering intake on a tablet."
};
