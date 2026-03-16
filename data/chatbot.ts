import profileData from "@/data/profile.json";
import aboutData from "@/data/aboutme.json";
import projectsData from "@/data/projects.json";
import skillsData from "@/data/skills.json";
import type { Profile } from "@/types/profile";
import type { AboutMe } from "@/types/aboutme";
import type { Project } from "@/types/project";
import type { SkillCategory } from "@/types/skill";

const profile: Profile = profileData;
const about: AboutMe = aboutData;
const projects: Project[] = projectsData;
const skills: SkillCategory[] = skillsData;

export interface QuickQuestion {
  label: string;
  key: string;
}

export const quickQuestions: QuickQuestion[] = [
  { label: "¿Quién eres?", key: "about" },
  { label: "¿Qué tecnologías usas?", key: "skills" },
  { label: "¿Qué proyectos has desarrollado?", key: "projects" },
  { label: "¿Tienes experiencia en backend?", key: "backend" },
  { label: "¿Qué estás estudiando?", key: "education" },
  { label: "¿Cómo puedo contactarte?", key: "contact" },
  { label: "Muéstrame tu stack principal", key: "stack" },
  { label: "Cuéntame sobre tu CV", key: "cv" },
];

export const WELCOME_MESSAGE =
  "👋 Hola, soy el asistente de este portafolio. Puedo contarte sobre mi perfil, proyectos, tecnologías, experiencia, estudios y formas de contacto. ¡Selecciona una pregunta o escríbeme!";

export const FALLBACK_MESSAGE =
  "Solo puedo ayudarte con información relacionada con mi portafolio, mi CV, mis proyectos y mi perfil profesional. Intenta con otra pregunta o selecciona una de las sugerencias.";

function buildAboutResponse(): string {
  return `${about.paragraphs.join("\n\n")}\n\nRol: ${profile.role} · ${profile.specialization}`;
}

function buildSkillsResponse(): string {
  const list = skills
    .map((cat) => `**${cat.name}:** ${cat.skills.join(", ")}`)
    .join("\n");
  return `Estas son mis habilidades organizadas por categoría:\n\n${list}`;
}

function buildProjectsResponse(): string {
  const list = projects
    .map(
      (p) =>
        `• **${p.name}** — ${p.description}${p.demo_url ? ` → [Ver demo](${p.demo_url})` : ""}`
    )
    .join("\n\n");
  return `He trabajado en estos proyectos:\n\n${list}`;
}

function buildBackendResponse(): string {
  const backendSkills = skills.find((c) => c.name === "Backend");
  const dbSkills = skills.find((c) => c.name === "Base de datos");
  const backendProjects = projects.filter((p) =>
    p.stack.some((s) =>
      ["NestJS", "Node.js", ".NET", "SQL Server", "PostgreSQL", "MongoDB"].includes(s)
    )
  );
  let resp = `Sí, tengo experiencia en backend.`;
  if (backendSkills)
    resp += `\n\n**Tecnologías backend:** ${backendSkills.skills.join(", ")}`;
  if (dbSkills)
    resp += `\n**Bases de datos:** ${dbSkills.skills.join(", ")}`;
  if (backendProjects.length > 0)
    resp += `\n\nProyectos con backend: ${backendProjects.map((p) => p.name).join(", ")}.`;
  return resp;
}

function buildEducationResponse(): string {
  const edu = profile.education
    .map((e) => `• **${e.degree}** — ${e.institution} (${e.year})`)
    .join("\n");
  const lang = profile.languages
    .map((l) => `${l.name}: ${l.level}`)
    .join(", ");
  return `Mi formación académica:\n\n${edu}\n\n**Idiomas:** ${lang}`;
}

function buildContactResponse(): string {
  return `Puedes contactarme a través de:\n\n• **Email:** ${profile.email}\n• **GitHub:** [GitHub](${profile.github_url})\n• **LinkedIn:** [LinkedIn](${profile.linkedin_url})\n\nTambién puedes usar el formulario de contacto en la sección inferior del portafolio.`;
}

function buildStackResponse(): string {
  const frontend = skills.find((c) => c.name === "Frontend");
  const backend = skills.find((c) => c.name === "Backend");
  const db = skills.find((c) => c.name === "Base de datos");
  const cloud = skills.find((c) => c.name === "Cloud");
  let resp = "Mi stack principal:\n";
  if (frontend) resp += `\n**Frontend:** ${frontend.skills.join(", ")}`;
  if (backend) resp += `\n**Backend:** ${backend.skills.join(", ")}`;
  if (db) resp += `\n**Base de datos:** ${db.skills.join(", ")}`;
  if (cloud) resp += `\n**Cloud/Deploy:** ${cloud.skills.join(", ")}`;
  return resp;
}

function buildCVResponse(): string {
  return `Soy ${profile.name}, ${profile.role} especializado en ${profile.specialization}.\n\n${profile.headline}\n${profile.subheadline}\n\nPuedes descargar mi CV completo aquí: [Ver CV](${profile.cv_url})`;
}

const responses: Record<string, () => string> = {
  about: buildAboutResponse,
  skills: buildSkillsResponse,
  projects: buildProjectsResponse,
  backend: buildBackendResponse,
  education: buildEducationResponse,
  contact: buildContactResponse,
  stack: buildStackResponse,
  cv: buildCVResponse,
};

const keywordMap: [RegExp, string][] = [
  [/\b(qui[eé]n eres|sobre (ti|m[ií])|cu[eé]ntame|pres[eé]ntate|perfil)\b/i, "about"],
  [/\b(tecnolog[ií]as?|herramientas?|tools?|lenguajes?|frameworks?)\b/i, "skills"],
  [/\b(habilidad(es)?|skills?|competencias?)\b/i, "skills"],
  [/\b(proyectos?|trabajos?|portfolio|portafolio)\b/i, "projects"],
  [/\b(backend|servidor|api|nest|node|\.net|graphql)\b/i, "backend"],
  [/\b(estudi(o|as|ando)|universidad|formaci[oó]n|carrera|educaci[oó]n|acad[eé]mic)\b/i, "education"],
  [/\b(contacto|contactar|email|correo|linkedin|github|redes)\b/i, "contact"],
  [/\b(stack|principal(es)?|tech)\b/i, "stack"],
  [/\b(cv|curr[ií]culum|resume|hoja de vida)\b/i, "cv"],
  [/\b(frontend|react|next|tailwind|html|css)\b/i, "skills"],
  [/\b(base(s)? de datos|database|postgres|mongo|sql|mysql)\b/i, "backend"],
  [/\b(cloud|deploy|vercel|railway|hostinger|render)\b/i, "stack"],
  [/\b(idiomas?|ingl[eé]s|espa[ñn]ol)\b/i, "education"],
];

export function getResponse(key: string): string {
  const builder = responses[key];
  return builder ? builder() : FALLBACK_MESSAGE;
}

export function matchFreeInput(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return FALLBACK_MESSAGE;

  for (const [regex, key] of keywordMap) {
    if (regex.test(trimmed)) {
      return getResponse(key);
    }
  }

  return FALLBACK_MESSAGE;
}
