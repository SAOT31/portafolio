import { useState } from 'react';
import Tilt from 'react-parallax-tilt';

const projectsData = [
  {
    "title": "Python Control Flow Exercises",
    "description": "Basic Exercises.",
    "category": "Python",
    "codeLink": "https://github.com/SAOT31/Ejercicios-de-Control-de-Flujo-en-Python",
    "demoLink": ""
  },
  {
    "title": "Ecoride",
    "description": "Sustainable bike rental simulator.",
    "category": "Python",
    "codeLink": "https://github.com/SAOT31/Ecoride",
    "demoLink": ""
  },
  {
    "title": "CrudActivity - CrudData",
    "description": "Data Structures in Python.",
    "category": "Python",
    "codeLink": "https://github.com/SAOT31/CrudActivity-CrudData_Estructuras_de_Datos_en_Python",
    "demoLink": ""
  },
  {
    "title": "CrudActivity — Crudzaso Games",
    "description": "Console minigames line.",
    "category": "Python",
    "codeLink": "https://github.com/SAOT31/CrudActivity-Crudzaso-Games",
    "demoLink": ""
  },
  {
    "title": "Decisions and Loops in Python",
    "description": "Application of conditional structures.",
    "category": "Python",
    "codeLink": "https://github.com/SAOT31/Actividad-Decisiones-y-Ciclos-en-Python",
    "demoLink": ""
  },
  {
    "title": "User Story M1S1",
    "description": "Fundamentals and basic inventory operations.",
    "category": "Python",
    "codeLink": "https://github.com/SAOT31/Historia-de-usuario-M1S1",
    "demoLink": ""
  },
  {
    "title": "User Story M1S2",
    "description": "Flow control and list management in inventory.",
    "category": "Python",
    "codeLink": "https://github.com/SAOT31/Historia-de-usuario-M1S2",
    "demoLink": ""
  },
  {
    "title": "User Story M1S3",
    "description": "Advanced inventory with collections and file persistence.",
    "category": "Python",
    "codeLink": "https://github.com/SAOT31/Historia-de-usuario-M1S3",
    "demoLink": ""
  },
  {
    "title": "Galactic Library Keeper",
    "description": "Interplanetary File Management System.",
    "category": "Python",
    "codeLink": "https://github.com/SAOT31/Galactic-Library-Keeper-Sistema-de-Gesti-n-de-Archivos-Interplanetarios",
    "demoLink": ""
  },
  {
    "title": "PeopleOps Vacation Console",
    "description": "Vacation Management in Python.",
    "category": "Python",
    "codeLink": "https://github.com/SAOT31/PeopleOps-Vacation-Console-Gesti-n-de-Vacaciones-en-Python",
    "demoLink": ""
  },
  {
    "title": "WorldHub - Crisis in the Atlas",
    "description": "Contribution: Rotating cards of the 13 knights with descriptions.",
    "category": "HTML & CSS",
    "codeLink": "https://github.com/JoseRivera-07/Arthur-s-Kingdom/tree/main",
    "demoLink": ""
  },
  {
    "title": "CRUDScope HTML MediaPanel",
    "description": "Static HTML page simulating a CRUD system panel.",
    "category": "HTML & CSS",
    "codeLink": "https://github.com/SAOT31/CRUDScope-HTML-MediaPanel",
    "demoLink": ""
  },
  {
    "title": "Mini OS",
    "description": "Desktop simulation on a single web page.",
    "category": "HTML & CSS",
    "codeLink": "https://github.com/estiven-piedrahita/team-mocha",
    "demoLink": ""
  },
  {
    "title": "User Story M2S1",
    "description": "Creation of a personal portfolio with a pets page.",
    "category": "HTML & CSS",
    "codeLink": "https://github.com/SAOT31/Historia-de-usuario-M2S1",
    "demoLink": ""
  },
  {
    "title": "User Story M2S2",
    "description": "CSS Flexbox and CSS Grid Layout practice.",
    "category": "HTML & CSS",
    "codeLink": "https://github.com/SAOT31/Historia-de-usuario-M2S2",
    "demoLink": ""
  },
  {
    "title": "User Story M2S3",
    "description": "Media queries, responsive design, and optimization.",
    "category": "HTML & CSS",
    "codeLink": "https://github.com/SAOT31/Historia-de-usuario-M2S3",
    "demoLink": ""
  },
  {
    "title": "CRUDactivity-StoreCrud",
    "description": "https://saot31.github.io/CRUDactivity-StoreCrud/",
    "category": "HTML & CSS",
    "codeLink": "https://github.com/SAOT31/CRUDactivity-StoreCrud",
    "demoLink": ""
  },
  {
    "title": "TaskFlow",
    "description": "Collaborative task manager.",
    "category": "JavaScript",
    "codeLink": "https://github.com/CamiloGuengue/next-task/tree/master",
    "demoLink": "https://camiloguengue.github.io/next-task/"
  },
  {
    "title": "W1-JS.md",
    "description": "JavaScript Syntax and Logic Lab.",
    "category": "JavaScript",
    "codeLink": "https://github.com/SAOT31/W1-JS.md",
    "demoLink": "https://saot31.github.io/W1-JS.md/"
  },
  {
    "title": "Act2-Js.md",
    "description": "CRUDLab – Interactive simulator in JavaScript.",
    "category": "JavaScript",
    "codeLink": "https://github.com/SAOT31/Act2-Js",
    "demoLink": "https://saot31.github.io/Act2-Js/"
  },
  {
    "title": "crudactivity lab 1",
    "description": "Training Lab Check-in.",
    "category": "JavaScript",
    "codeLink": "",
    "demoLink": ""
  },
  {
    "title": "crudactivity lab 2",
    "description": "Training Lab Check-in.",
    "category": "JavaScript",
    "codeLink": "",
    "demoLink": ""
  },
  {
    "title": "M3S1",
    "description": "Interactive messaging system.",
    "category": "JavaScript",
    "codeLink": "https://github.com/SAOT31/M3S1",
    "demoLink": "https://saot31.github.io/M3S1/"
  },
  {
    "title": "M3S2",
    "description": "Data management with objects, Sets, and Maps in JavaScript.",
    "category": "JavaScript",
    "codeLink": "https://github.com/SAOT31/M3S2",
    "demoLink": ""
  },
  {
    "title": "M3S3",
    "description": "Dynamic DOM management with browser persistence.",
    "category": "JavaScript",
    "codeLink": "https://github.com/SAOT31/M3S3",
    "demoLink": "https://saot31.github.io/M3S3/manipulacion_dom.html"
  },
  {
    "title": "M3S4",
    "description": "Development of a comprehensive mini web application with persistence and API                             consumption",
    "category": "JavaScript",
    "codeLink": "https://github.com/SAOT31/M3S4",
    "demoLink": "https://saot31.github.io/M3S4/"
  },
  {
    "title": "Crunchyroll-Replica",
    "description": "Landing, Auth, Profiles and Home.",
    "category": "JavaScript",
    "codeLink": "https://github.com/SAOT31/crunchyroll-replica-js/tree/main",
    "demoLink": ""
  },
  {
    "title": "HabitFlow",
    "description": "Internal habit tracking system.",
    "category": "JavaScript",
    "codeLink": "https://github.com/SAOT31/HabitFlow",
    "demoLink": "https://saot31.github.io/HabitFlow/"
  },
  {
    "title": "Simulacrum",
    "description": "Web-based order management system (restaurant)",
    "category": "JavaScript",
    "codeLink": "https://github.com/SAOT31/Simulacrum",
    "demoLink": "https://saot31.github.io/Simulacrum/"
  },
  {
    "title": "Database schema design",
    "description": "Design a relational database schema in PostgreSQL.",
    "category": "Databases",
    "codeLink": "https://github.com/SAOT31/Database-schema-design",
    "demoLink": ""
  },
  {
    "title": "M4S1",
    "description": "Conceptual and logical design of the database.",
    "category": "Databases",
    "codeLink": "https://github.com/SAOT31/M3S1",
    "demoLink": ""
  },
  {
    "title": "M4S2",
    "description": "Design and consultation of an Academic System in SQL.",
    "category": "Databases",
    "codeLink": "https://github.com/SAOT31/M4S2n",
    "demoLink": ""
  },
  {
    "title": "M4S3",
    "description": "Content and user management in MongoDB.",
    "category": "Databases",
    "codeLink": "https://github.com/SAOT31/M4S3",
    "demoLink": ""
  },
  {
    "title": "Delivery Ops",
    "description": "Internal module called Cruzado Delivery Ops (CDO) to manage marketplace ordersL.",
    "category": "Databases",
    "codeLink": "https://github.com/SAOT31/Delivery-Ops",
    "demoLink": ""
  },
  {
    "title": "M5.3S1",
    "description": "Basic registration of patients and pets",
    "category": "C# & ASP.NET",
    "codeLink": "https://github.com/SAOT31/M5.3S1",
    "demoLink": ""
  },
  {
    "title": "M5.3S2",
    "description": "Collections management and queries with LINQ",
    "category": "C# & ASP.NET",
    "codeLink": "https://github.com/SAOT31/M5.3S2",
    "demoLink": ""
  },
  {
    "title": "M5.3S3",
    "description": "Inheritance and polymorphism in the clinic system",
    "category": "C# & ASP.NET",
    "codeLink": "https://github.com/SAOT31/M5.3S3",
    "demoLink": ""
  },
  {
    "title": "M5.3S4",
    "description": "Use of interfaces, debugging, and exception handling",
    "category": "C# & ASP.NET",
    "codeLink": "https://github.com/SAOT31/M5.3S4",
    "demoLink": ""
  },
  {
    "title": "M5.3S5",
    "description": "Asynchronous programming and coding conventions",
    "category": "C# & ASP.NET",
    "codeLink": "https://github.com/SAOT31/M5.3S5",
    "demoLink": ""
  },
  {
    "title": "Logic &amp; Data Structures Evaluator",
    "description": "Interactive C# console tool for assessing technical skills and OOP fundamentals.",
    "category": "C# & ASP.NET",
    "codeLink": "https://github.com/SAOT31/actividad-1-csharp.git",
    "demoLink": ""
  },
  {
    "title": "Theme Event Management System",
    "description": "Full Stack platform for complete event lifecycle management (CRUD) with a modern UI.",
    "category": "C# & ASP.NET",
    "codeLink": "https://github.com/SAOT31/activity-events.git",
    "demoLink": "https://sergio.andrescortes.dev"
  },
  {
    "title": "Library System",
    "description": "Admin interface for managing users, books, and book loans.",
    "category": "C# & ASP.NET",
    "codeLink": "https://github.com/SAOT31/LibrarySystem",
    "demoLink": "https://bookstore.sergio.andrescortes.dev/"
  },
  {
    "title": "Veterinary System",
    "description": "C# system to organize and optimize veterinary clinical operations.",
    "category": "C# & ASP.NET",
    "codeLink": "https://github.com/SAOT31/VeterinarySystem",
    "demoLink": ""
  },
  {
    "title": "NeoGenesis Park Dinosaur Registry",
    "description": "Management system to register and track dinosaurs using EF Core and LINQ.",
    "category": "C# & ASP.NET",
    "codeLink": "https://github.com/Hubble-C/NeoGenesis",
    "demoLink": ""
  },
  {
    "title": "Space Exploration Management",
    "description": "Complete system using C#, LINQ, and EF Core to manage interplanetary missions.",
    "category": "C# & ASP.NET",
    "codeLink": "https://github.com/SAOT31/Space-Exploration-Management-System",
    "demoLink": ""
  },
  {
    "title": "Transport Operations System",
    "description": "Console system to manage daily transport operations, vehicles, and drivers.",
    "category": "C# & ASP.NET",
    "codeLink": "https://github.com/SAOT31/TransportSystem",
    "demoLink": ""
  },
  {
    "title": "Sports Complex System",
    "description": "Reservation management system avoiding schedule conflicts with EF Core and POO.",
    "category": "C# & ASP.NET",
    "codeLink": "https://github.com/SAOT31/SportsComplexSystem",
    "demoLink": ""
  },
  {
    "title": "NextInLine Turn Management System",
    "description": "Complete system for queue management with waiting room, advisor interface, and sequential flow control.",
    "category": "C# & ASP.NET",
    "codeLink": "https://github.com/Hubble-C/NextInLine",
    "demoLink": ""
  }
];

export const Projects = () => {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', 'Python', 'HTML & CSS', 'JavaScript', 'Databases', 'C# & ASP.NET'];
  
  const reversedProjects = [...projectsData].reverse();
  const filteredProjects = filter === 'All' 
    ? reversedProjects 
    : reversedProjects.filter(p => p.category === filter);

  return (
    <section className="py-section-gap-mobile md:py-section-gap max-w-container-max mx-auto px-gutter relative z-10" id="projects">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 fade-up">
        <div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background mb-4">Featured Implementations</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">Selected projects demonstrating architectural planning and execution.</p>
        </div>
        <div className="mt-6 md:mt-0 flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full glass-panel font-label-caps text-label-caps transition-colors ${filter === cat ? 'text-primary border-primary/30' : 'text-on-surface-variant hover:text-on-background'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((proj, idx) => (
          <Tilt key={idx} tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.02} transitionSpeed={2500} className="h-full">
            <div className="glass-panel glass-panel-hover rounded-2xl overflow-hidden group flex flex-col h-full" style={{ animation: 'fade-in-quick 0.5s ease-out forwards' }}>
              <div className="h-48 w-full overflow-hidden relative bg-surface-container-high flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
              <div className="absolute inset-0 bg-surface-container-lowest/50 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
              {proj.image ? (
                <img className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 relative z-0" src={proj.image} alt={proj.title} />
              ) : proj.category === 'Databases' ? (
                <span className="material-symbols-outlined text-[64px] opacity-50 relative z-0 transform group-hover:scale-110 transition-transform duration-700 drop-shadow-lg">
                  database
                </span>
              ) : (
                <i className={`text-[64px] opacity-50 relative z-0 transform group-hover:scale-110 transition-transform duration-700 drop-shadow-lg ${
                  proj.category === 'Python' ? 'devicon-python-plain' : 
                  proj.category === 'HTML & CSS' ? 'devicon-html5-plain' : 
                  proj.category === 'JavaScript' ? 'devicon-javascript-plain' : 
                  proj.category === 'C# & ASP.NET' ? 'devicon-csharp-plain' : 
                  'devicon-github-original'
                }`}></i>
              )}
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex gap-2 mb-4">
                <span className="font-code-sm text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-white/5 text-primary border border-white/10">{proj.category}</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-background mb-2">{proj.title}</h3>
              <p className="font-body-md text-sm text-on-surface-variant mb-6 flex-grow opacity-80">{proj.description}</p>
              
              <div className="flex gap-4">
                {proj.codeLink && (
                    <a className="font-label-caps text-label-caps text-primary flex items-center gap-1 group-hover:gap-2 transition-all w-fit" href={proj.codeLink} target="_blank" rel="noreferrer">
                    View Code <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </a>
                )}
                {proj.demoLink && (
                  <a className="font-label-caps text-label-caps text-secondary flex items-center gap-1 group-hover:gap-2 transition-all w-fit" href={proj.demoLink} target="_blank" rel="noreferrer">
                    View Demo <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  </a>
                )}
              </div>
              </div>
            </div>
          </Tilt>
        ))}
      </div>
    </section>
  );
};
