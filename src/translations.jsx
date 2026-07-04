export const translations = {
  es: {
    nav: {
      skills: "Habilidades",
      experience: "Experiencia",
      projects: "Proyectos",
      contact: "Contacto",
      resume: "Descargar CV",
    },
    hero: {
      greeting: "Hola, soy",
      name: "Sergio Alejandro Ospina Tabares.",
      availability: "Disponible para nuevas oportunidades",
      roles: [
        "Software Developer.", 1000,
        "Entusiasta de la tecnología.", 1000,
        "Desarrollador C#, .NET, Python, JS, PHP y React.", 1000,
        "Creador de soluciones tecnológicas.", 1000
      ],
      description: "Desarrollador de software que disfruta colaborar en equipo para transformar ideas en soluciones reales. Me esfuerzo por construir sistemas eficientes que faciliten el trabajo de los usuarios y generen un impacto positivo en cada proyecto.",
      downloadCV: "Descargar CV",
      contactMe: "Contáctame",
    },
    skills: {
      title: "Habilidades",
      hardSkills: "Habilidades Técnicas",
      softSkills: "Habilidades Blandas",
      techCategories: [
        {
          name: "Arquitectura & Patrones",
          icon: "account_tree",
          skills: ["Clean Architecture", "Microservicios", "Multi-tenant", "Monolito", "Arquitectura en Capas", "MVC", "API RESTful"]
        },
        {
          name: "Backend",
          icon: "terminal",
          skills: ["C# .NET Core", "ASP.NET", "Python", "FastAPI", "PHP (Laravel)", "Node.js"]
        },
        {
          name: "Frontend",
          icon: "web",
          skills: ["JavaScript", "React", "Blazor", "Razor", "HTML5 & CSS3", "SCSS"]
        },
        {
          name: "Bases de Datos & ORM",
          icon: "database",
          skills: ["PostgreSQL", "MySQL", "MongoDB", "NoSQL", "Entity Framework"]
        },
        {
          name: "Infraestructura & Herramientas",
          icon: "cloud",
          skills: ["Git / GitHub", "Docker", "VPS", "Vercel", "Azure DevOps", "Scrum", "Jira", "Docusaurus"]
        }
      ],
      soft1: <>Me considero una persona <strong className="text-primary">proactiva y orientada a resultados</strong>, con un alto sentido de responsabilidad y seriedad. Soy analítico por naturaleza; adquiero y comparto conocimientos con facilidad, buscando siempre aportar soluciones innovadoras.</>,
      soft2: <>Me adapto fácilmente a entornos de trabajo en equipo, contribuyendo a la <strong className="text-primary">optimización de procesos</strong>. Tengo la capacidad de planificar y priorizar tareas, manteniendo una <strong className="text-primary">actitud positiva</strong> y disposición para aprender.</>
    },
    experience: {
      title: "Experiencia",
      subtitle: "Mi camino en el mundo del desarrollo de software.",
      items: [
        {
          period: "oct. 2025 - Presente",
          role: "Software Developer",
          company: "Riwi.io",
          location: "Medellín, Antioquia, Colombia · Presencial",
          description: "Desarrollo de soluciones de software multi-tenant, implementando patrones y diseños escalables como Clean Architecture, Hexagonal, MVC, Microservicios y monolítica. Construcción de APIs RESTful y lógica de negocio en backend con C#, .NET Core y Python, gestionando la persistencia de datos con PostgreSQL, SQL y MongoDB. Desarrollo de interfaces frontend utilizando React, Blazor, Razor, JavaScript y Tailwind CSS, junto con la creación de aplicaciones mediante Flutter y Dart. Gestión de infraestructura, pipelines de CI/CD y despliegues empleando Docker, VPS, Render y Vercel, garantizando el monitoreo operativo con Sentry. Integración de APIs externas y automatización de procesos (n8n.io, Make, WhatsApp, Trello, EmailJS), ejecutando el ciclo de desarrollo bajo la metodología Scrum, respaldado por Jira y Azure para la gestión de tareas y proyectos, y GitHub para el control de versiones."
        }
      ]
    },
    projects: {
      title: "Implementaciones Destacadas",
      subtitle: "Proyectos seleccionados que demuestran planificación y ejecución arquitectónica.",
      viewCode: "Ver Código",
      viewLive: "Ver Demo",
      categories: {
        "All": "Todos",
        "C# & ASP.NET": "C# & ASP.NET",
        "Python": "Python",
        "JavaScript": "JavaScript",
        "HTML & CSS": "HTML & CSS",
        "Databases": "Bases de Datos"
      }
    },
    contact: {
      title: "Hablemos",
      subtitle: "Estoy abierto a nuevas oportunidades. Si quieres hablar sobre tecnología, tienes algún proyecto en mente o buscas sumar talento a tu equipo, contáctame.",
      email: "Correo Electrónico",
      copied: "¡Copiado!",
      whatsapp: "WhatsApp",
      location: "Medellín, Antioquia, Colombia",
      form: {
        name: "Identidad del Sistema (Nombre)",
        namePlaceholder: "Juan Pérez",
        email: "Protocolo de Retorno (Email)",
        emailPlaceholder: "juan@ejemplo.com",
        message: "Carga Útil (Mensaje)",
        messagePlaceholder: "Iniciando transmisión...",
        submit: "Transmitir Datos"
      }
    },
    footer: {
      rights: "Todos los derechos reservados."
    }
  },
  en: {
    nav: {
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      contact: "Contact",
      resume: "Download CV",
    },
    hero: {
      greeting: "Hi, I am",
      name: "Sergio Alejandro Ospina Tabares.",
      availability: "Available for new opportunities",
      roles: [
        "Software Developer.", 1000,
        "Tech enthusiast.", 1000,
        "C#, .NET, Python, JS, PHP and React Developer.", 1000,
        "Creator of technological solutions.", 1000
      ],
      description: "Software Developer who enjoys collaborating in teams to transform ideas into real solutions. I strive to build efficient systems that make life easier for users and generate a positive impact on every project.",
      downloadCV: "Download CV",
      contactMe: "Contact Me",
    },
    skills: {
      title: "Skills",
      hardSkills: "Hard Skills",
      softSkills: "Soft Skills",
      techCategories: [
        {
          name: "Architecture & Patterns",
          icon: "account_tree",
          skills: ["Clean Architecture", "Microservices", "Multi-tenant", "Monolith", "Layered Architecture", "MVC", "RESTful API"]
        },
        {
          name: "Backend",
          icon: "terminal",
          skills: ["C# .NET Core", "ASP.NET", "Python", "FastAPI", "PHP (Laravel)", "Node.js"]
        },
        {
          name: "Frontend",
          icon: "web",
          skills: ["JavaScript", "React", "Blazor", "Razor", "HTML5 & CSS3", "SCSS"]
        },
        {
          name: "Databases & ORM",
          icon: "database",
          skills: ["PostgreSQL", "MySQL", "MongoDB", "NoSQL", "Entity Framework"]
        },
        {
          name: "Infrastructure & Tools",
          icon: "cloud",
          skills: ["Git / GitHub", "Docker", "VPS", "Vercel", "Azure DevOps", "Scrum", "Jira", "Docusaurus"]
        }
      ],
      soft1: <>I consider myself a <strong className="text-primary">proactive and goal-oriented person</strong>, with a high sense of responsibility and seriousness. I am analytical by nature; I acquire and share knowledge easily, always looking to provide innovative solutions.</>,
      soft2: <>I adapt easily to teamwork environments, contributing to the <strong className="text-primary">optimization of processes</strong>. I have the ability to plan and prioritize tasks, maintaining a <strong className="text-primary">positive attitude</strong> and willingness to learn.</>
    },
    experience: {
      title: "Experience",
      subtitle: "My path in the software development world.",
      items: [
        {
          period: "Oct. 2025 - Present",
          role: "Software Developer",
          company: "Riwi.io",
          location: "Medellín, Antioquia, Colombia · On-site",
          description: "Development of multi-tenant software solutions, implementing scalable patterns and designs such as Clean Architecture, Hexagonal, MVC, Microservices, and monolithic. Construction of RESTful APIs and backend business logic with C#, .NET Core, and Python, managing data persistence with PostgreSQL, SQL, and MongoDB. Development of frontend interfaces using React, Blazor, Razor, JavaScript, and Tailwind CSS, along with the creation of applications using Flutter and Dart. Infrastructure management, CI/CD pipelines, and deployments using Docker, VPS, Render, and Vercel, ensuring operational monitoring with Sentry. Integration of external APIs and process automation (n8n.io, Make, WhatsApp, Trello, EmailJS), executing the development cycle under the Scrum methodology, supported by Jira and Azure for task and project management, and GitHub for version control."
        }
      ]
    },
    projects: {
      title: "Featured Implementations",
      subtitle: "Selected projects demonstrating architectural planning and execution.",
      viewCode: "View Code",
      viewLive: "View Demo",
      categories: {
        "All": "All",
        "C# & ASP.NET": "C# & ASP.NET",
        "Python": "Python",
        "JavaScript": "JavaScript",
        "HTML & CSS": "HTML & CSS",
        "Databases": "Databases"
      }
    },
    contact: {
      title: "Let's Talk",
      subtitle: "I'm open to new opportunities. Whether you want to talk about tech, have a project in mind, or are looking to add talent to your team, feel free to reach out.",
      email: "Email",
      copied: "Copied!",
      whatsapp: "WhatsApp",
      location: "Medellin, Antioquia, Colombia",
      form: {
        name: "System Identity (Name)",
        namePlaceholder: "John Doe",
        email: "Return Protocol (Email)",
        emailPlaceholder: "john@example.com",
        message: "Payload (Message)",
        messagePlaceholder: "Initiating transmission...",
        submit: "Transmit Data"
      }
    },
    footer: {
      rights: "All rights reserved."
    }
  }
};
