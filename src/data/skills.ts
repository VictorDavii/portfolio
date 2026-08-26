export type SkillCategory = "Frontend" | "Backend" | "UI/UX" | "Markup" | "Tools";

export interface Skill {
  name: string;
  category: SkillCategory;
  color: string; // hex glow
}

export const skills: Skill[] = [
  { name: "Java",          category: "Backend",   color: "#f89820" },
  { name: "MySQL",         category: "Backend",   color: "#00758f" },
  { name: "JavaScript",    category: "Frontend",  color: "#f7df1e" },
  { name: "Git",           category: "Tools",     color: "#f05033" },
  { name: "React",         category: "Frontend",  color: "#61dafb" },
  { name: "CSS",           category: "UI/UX",     color: "#38bdf8" },
  { name: "HTML",          category: "Markup",    color: "#bb6bff" },
];

export const categories: SkillCategory[] = ["Frontend", "Backend", "UI/UX", "Markup", "Tools"];
