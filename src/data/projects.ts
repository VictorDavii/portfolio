export interface Project {
  title: string;
  description: string;
  stack: string[];
  image: string;
  link?: string;
  repo?: string;
}

export const projects: Project[] = [
  {
    title: "Orbital Commerce",
    description: "Plataforma de e-commerce de alta performance com checkout em tempo real e arquitetura orientada a eventos.",
    stack: ["React", "Node.js", "PostgreSQL", "Stripe"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    link: "#",
  },
  {
    title: "Nebula Analytics",
    description: "Dashboard cinematográfico para visualização de métricas em tempo real com WebGL e streaming.",
    stack: ["TypeScript", "WebGL", "WebSockets"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    link: "#",
  },
  {
    title: "Stellar API",
    description: "API RESTful em Spring Boot com Clean Architecture, observabilidade e resiliência.",
    stack: ["Java", "Spring Boot", "Docker", "Kafka"],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
    repo: "#",
  },
  {
    title: "Pulse Design System",
    description: "Sistema de design open-source com tokens animados, theming dinâmico e acessibilidade AAA.",
    stack: ["React", "Tailwind", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200&auto=format&fit=crop",
    link: "#",
  },
];
