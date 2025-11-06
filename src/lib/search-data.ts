// src/lib/search-data.ts

export type SearchablePage = {
  title: string;
  href: string;
  keywords: string[];
  icon: string; // Nombre del icono de lucide-react
};

export const searchData: SearchablePage[] = [
  {
    title: "Inicio",
    href: "/",
    keywords: ["home", "principal", "dashboard"],
    icon: "Home",
  },
  // Afiliados
  {
    title: "Portal de Afiliados",
    href: "/afiliados",
    keywords: ["afiliados", "portal", "servicios para afiliados"],
    icon: "Users",
  },
  {
    title: "Régimen Subsidiado - General",
    href: "/afiliados/subsidiado",
    keywords: ["subsidiado", "sisben", "gratis", "salud para todos"],
    icon: "File",
  },
  {
    title: "Régimen Contributivo",
    href: "/afiliados/contributivo",
    keywords: ["contributivo", "empleados", "independientes", "pago"],
    icon: "File",
  },
  // Subsidiado - Información
  {
    title: "Información General (Subsidiado)",
    href: "/afiliados/subsidiado/informacion",
    keywords: ["informacion", "general", "subsidiado"],
    icon: "Book",
  },
  {
    title: "Derechos y Deberes (Subsidiado)",
    href: "/afiliados/subsidiado/informacion/derechos-y-deberes",
    keywords: ["derechos", "deberes", "paciente", "ley"],
    icon: "Book",
  },
  {
    title: "Plan de Beneficios (Subsidiado)",
    href: "/afiliados/subsidiado/informacion/plan-de-beneficios",
    keywords: ["plan de beneficios", "pbs", "upc", "cobertura"],
    icon: "Book",
  },
  {
    title: "Canales de Atención (Subsidiado)",
    href: "/afiliados/subsidiado/informacion/canales-de-atencion",
    keywords: ["canales", "atencion", "contacto", "oficinas", "telefono"],
    icon: "Phone",
  },
  {
    title: "Consulta tu IPS (Subsidiado)",
    href: "/afiliados/subsidiado/informacion/consulta-ips",
    keywords: ["ips", "consulta", "mi ips", "red de servicios", "hospital"],
    icon: "HeartHandshake",
  },
  {
    title: "Oficinas de Atención",
    href: "/afiliados/subsidiado/informacion/oficinas",
    keywords: ["oficinas", "mapa", "directorio", "puntos de atencion"],
    icon: "Map",
  },
  // Subsidiado - Trámites
  {
    title: "Guía de Trámites (Subsidiado)",
    href: "/afiliados/subsidiado/tramites/tramites",
    keywords: ["tramites", "guia", "solicitudes", "procesos"],
    icon: "File",
  },
  {
    title: "Afiliación (Subsidiado)",
    href: "/afiliados/subsidiado/tramites/afiliacion",
    keywords: ["afiliacion", "inscribirse", "nuevo afiliado"],
    icon: "File",
  },
  {
    title: "Certificados (Subsidiado)",
    href: "/afiliados/subsidiado/tramites/certificados",
    keywords: ["certificados", "descargar", "documentos"],
    icon: "File",
  },
  {
    title: "Movilidad y Portabilidad (Subsidiado)",
    href: "/afiliados/subsidiado/tramites/movilidad",
    keywords: ["movilidad", "portabilidad", "traslado", "cambio de regimen"],
    icon: "File",
  },
  // Subsidiado - Cuidado de la salud
  {
    title: "Cuidado de la Salud (Subsidiado)",
    href: "/afiliados/subsidiado/cuidado-de-la-salud",
    keywords: ["cuidado", "salud", "bienestar", "prevencion"],
    icon: "HeartPulse",
  },
  {
    title: "Nutrición y Vida Activa",
    href: "/afiliados/subsidiado/cuidado-de-la-salud/nutricion",
    keywords: ["nutricion", "alimentacion", "ejercicio", "vida activa"],
    icon: "Apple",
  },
  {
    title: "Salud Mental",
    href: "/afiliados/subsidiado/cuidado-de-la-salud/salud-mental",
    keywords: ["salud mental", "psicologia", "bienestar emocional"],
    icon: "BrainCircuit",
  },
  // Otras secciones
  {
    title: "Prestadores",
    href: "/prestadores",
    keywords: ["prestadores", "ips", "contratacion", "servicios medicos"],
    icon: "HeartHandshake",
  },
  {
    title: "Blog y Noticias",
    href: "/blog",
    keywords: ["blog", "noticias", "articulos", "novedades"],
    icon: "Newspaper",
  },
  {
    title: "Colaboradores",
    href: "/colaboradores",
    keywords: ["colaboradores", "equipo", "trabaja con nosotros"],
    icon: "Users",
  },
  {
    title: "Normatividad",
    href: "/normatividad",
    keywords: ["normatividad", "leyes", "decretos", "regulacion"],
    icon: "Book",
  },
];
