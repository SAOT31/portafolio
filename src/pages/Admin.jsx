import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { db, storage } from '../services/firebase';
import {
  collection, addDoc, getDocs, updateDoc, deleteDoc, doc, serverTimestamp, query, orderBy, writeBatch
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { CustomCursor } from '../components/CustomCursor';
import { ParticlesBackground } from '../components/ParticlesBackground';

const CATEGORIES = ['Python', 'HTML & CSS', 'JavaScript', 'Databases', 'C# & ASP.NET', 'PHP'];

const emptyForm = {
  title: '', description: '', descriptionEn: '', category: 'JavaScript',
  codeLink: '', demoLink: '', hidden: false, images: [], order: 0
};

// Static projects as migration source & fallback
const STATIC_PROJECTS = [
  { title: "Python Control Flow Exercises", description: "Basic Exercises.", category: "Python", codeLink: "https://github.com/SAOT31/Ejercicios-de-Control-de-Flujo-en-Python", demoLink: "" },
  { title: "Ecoride", description: "Sustainable bike rental simulator.", category: "Python", codeLink: "https://github.com/SAOT31/Ecoride", demoLink: "" },
  { title: "CrudActivity - CrudData", description: "Data Structures in Python.", category: "Python", codeLink: "https://github.com/SAOT31/CrudActivity-CrudData_Estructuras_de_Datos_en_Python", demoLink: "" },
  { title: "CrudActivity — Crudzaso Games", description: "Console minigames line.", category: "Python", codeLink: "https://github.com/SAOT31/CrudActivity-Crudzaso-Games", demoLink: "" },
  { title: "Decisions and Loops in Python", description: "Application of conditional structures.", category: "Python", codeLink: "https://github.com/SAOT31/Actividad-Decisiones-y-Ciclos-en-Python", demoLink: "" },
  { title: "User Story M1S1", description: "Fundamentals and basic inventory operations.", category: "Python", codeLink: "https://github.com/SAOT31/Historia-de-usuario-M1S1", demoLink: "" },
  { title: "User Story M1S2", description: "Flow control and list management in inventory.", category: "Python", codeLink: "https://github.com/SAOT31/Historia-de-usuario-M1S2", demoLink: "" },
  { title: "User Story M1S3", description: "Advanced inventory with collections and file persistence.", category: "Python", codeLink: "https://github.com/SAOT31/Historia-de-usuario-M1S3", demoLink: "" },
  { title: "Galactic Library Keeper", description: "Interplanetary File Management System.", category: "Python", codeLink: "https://github.com/SAOT31/Galactic-Library-Keeper-Sistema-de-Gesti-n-de-Archivos-Interplanetarios", demoLink: "" },
  { title: "PeopleOps Vacation Console", description: "Vacation Management in Python.", category: "Python", codeLink: "https://github.com/SAOT31/PeopleOps-Vacation-Console-Gesti-n-de-Vacaciones-en-Python", demoLink: "" },
  { title: "WorldHub - Crisis in the Atlas", description: "Contribution: Rotating cards of the 13 knights with descriptions.", category: "HTML & CSS", codeLink: "https://github.com/JoseRivera-07/Arthur-s-Kingdom/tree/main", demoLink: "" },
  { title: "CRUDScope HTML MediaPanel", description: "Static HTML page simulating a CRUD system panel.", category: "HTML & CSS", codeLink: "https://github.com/SAOT31/CRUDScope-HTML-MediaPanel", demoLink: "" },
  { title: "Mini OS", description: "Desktop simulation on a single web page.", category: "HTML & CSS", codeLink: "https://github.com/estiven-piedrahita/team-mocha", demoLink: "" },
  { title: "User Story M2S1", description: "Creation of a personal portfolio with a pets page.", category: "HTML & CSS", codeLink: "https://github.com/SAOT31/Historia-de-usuario-M2S1", demoLink: "" },
  { title: "User Story M2S2", description: "CSS Flexbox and CSS Grid Layout practice.", category: "HTML & CSS", codeLink: "https://github.com/SAOT31/Historia-de-usuario-M2S2", demoLink: "" },
  { title: "User Story M2S3", description: "Media queries, responsive design, and optimization.", category: "HTML & CSS", codeLink: "https://github.com/SAOT31/Historia-de-usuario-M2S3", demoLink: "" },
  { title: "CRUDactivity-StoreCrud", description: "https://saot31.github.io/CRUDactivity-StoreCrud/", category: "HTML & CSS", codeLink: "https://github.com/SAOT31/CRUDactivity-StoreCrud", demoLink: "" },
  { title: "TaskFlow", description: "Collaborative task manager.", category: "JavaScript", codeLink: "https://github.com/CamiloGuengue/next-task/tree/master", demoLink: "https://camiloguengue.github.io/next-task/" },
  { title: "W1-JS.md", description: "JavaScript Syntax and Logic Lab.", category: "JavaScript", codeLink: "https://github.com/SAOT31/W1-JS.md", demoLink: "https://saot31.github.io/W1-JS.md/" },
  { title: "Act2-Js.md", description: "CRUDLab – Interactive simulator in JavaScript.", category: "JavaScript", codeLink: "https://github.com/SAOT31/Act2-Js", demoLink: "https://saot31.github.io/Act2-Js/" },
  { title: "crudactivity lab 1", description: "Training Lab Check-in.", category: "JavaScript", codeLink: "https://github.com/SAOT31/crudactivity-lab-1", demoLink: "" },
  { title: "crudactivity lab 2", description: "Training Lab Check-in.", category: "JavaScript", codeLink: "https://github.com/SAOT31/crudactivity-lab-2", demoLink: "" },
  { title: "M3S1", description: "Interactive messaging system.", category: "JavaScript", codeLink: "https://github.com/SAOT31/M3S1", demoLink: "https://saot31.github.io/M3S1/" },
  { title: "M3S2", description: "Data management with objects, Sets, and Maps in JavaScript.", category: "JavaScript", codeLink: "https://github.com/SAOT31/M3S2", demoLink: "" },
  { title: "M3S3", description: "Dynamic DOM management with browser persistence.", category: "JavaScript", codeLink: "https://github.com/SAOT31/M3S3", demoLink: "https://saot31.github.io/M3S3/manipulacion_dom.html" },
  { title: "M3S4", description: "Development of a comprehensive mini web application with persistence and API consumption", category: "JavaScript", codeLink: "https://github.com/SAOT31/M3S4", demoLink: "https://saot31.github.io/M3S4/" },
  { title: "Crunchyroll-Replica", description: "Landing, Auth, Profiles and Home.", category: "JavaScript", codeLink: "https://github.com/SAOT31/crunchyroll-replica-js/tree/main", demoLink: "" },
  { title: "HabitFlow", description: "Internal habit tracking system.", category: "JavaScript", codeLink: "https://github.com/SAOT31/HabitFlow", demoLink: "https://saot31.github.io/HabitFlow/" },
  { title: "Simulacrum", description: "Web-based order management system (restaurant)", category: "JavaScript", codeLink: "https://github.com/SAOT31/Simulacrum", demoLink: "https://saot31.github.io/Simulacrum/" },
  { title: "Database schema design", description: "Design a relational database schema in PostgreSQL.", category: "Databases", codeLink: "https://github.com/SAOT31/Database-schema-design", demoLink: "" },
  { title: "M4S1", description: "Conceptual and logical design of the database.", category: "Databases", codeLink: "https://github.com/SAOT31/M4S1", demoLink: "" },
  { title: "M4S2", description: "Design and consultation of an Academic System in SQL.", category: "Databases", codeLink: "https://github.com/SAOT31/M4S2", demoLink: "" },
  { title: "M4S3", description: "Content and user management in MongoDB.", category: "Databases", codeLink: "https://github.com/SAOT31/M4S3", demoLink: "" },
  { title: "Delivery Ops", description: "Internal module called Cruzado Delivery Ops (CDO) to manage marketplace orders.", category: "Databases", codeLink: "https://github.com/SAOT31/Delivery-Ops", demoLink: "" },
  { title: "M5.3S1", description: "Basic registration of patients and pets", category: "C# & ASP.NET", codeLink: "https://github.com/SAOT31/M5.3S1", demoLink: "" },
  { title: "M5.3S2", description: "Collections management and queries with LINQ", category: "C# & ASP.NET", codeLink: "https://github.com/SAOT31/M5.3S2", demoLink: "" },
  { title: "M5.3S3", description: "Inheritance and polymorphism in the clinic system", category: "C# & ASP.NET", codeLink: "https://github.com/SAOT31/M5.3S3", demoLink: "" },
  { title: "M5.3S4", description: "Use of interfaces, debugging, and exception handling", category: "C# & ASP.NET", codeLink: "https://github.com/SAOT31/M5.3S4", demoLink: "" },
  { title: "M5.3S5", description: "Asynchronous programming and coding conventions", category: "C# & ASP.NET", codeLink: "https://github.com/SAOT31/M5.3S5", demoLink: "" },
  { title: "Logic & Data Structures Evaluator", description: "Interactive C# console tool for assessing technical skills and OOP fundamentals.", category: "C# & ASP.NET", codeLink: "https://github.com/SAOT31/actividad-1-csharp.git", demoLink: "" },
  { title: "Theme Event Management System", description: "Full Stack platform for complete event lifecycle management (CRUD) with a modern UI.", category: "C# & ASP.NET", codeLink: "https://github.com/SAOT31/activity-events.git", demoLink: "https://sergio.andrescortes.dev" },
  { title: "Library System", description: "Admin interface for managing users, books, and book loans.", category: "C# & ASP.NET", codeLink: "https://github.com/SAOT31/LibrarySystem", demoLink: "https://bookstore.sergio.andrescortes.dev/" },
  { title: "Veterinary System", description: "C# system to organize and optimize veterinary clinical operations.", category: "C# & ASP.NET", codeLink: "https://github.com/SAOT31/VeterinarySystem", demoLink: "" },
  { title: "NeoGenesis Park Dinosaur Registry", description: "Management system to register and track dinosaurs using EF Core and LINQ.", category: "C# & ASP.NET", codeLink: "https://github.com/Hubble-C/NeoGenesis", demoLink: "" },
  { title: "Space Exploration Management", description: "Complete system using C#, LINQ, and EF Core to manage interplanetary missions.", category: "C# & ASP.NET", codeLink: "https://github.com/SAOT31/Space-Exploration-Management-System", demoLink: "" },
  { title: "Transport Operations System", description: "Console system to manage daily transport operations, vehicles, and drivers.", category: "C# & ASP.NET", codeLink: "https://github.com/SAOT31/TransportSystem", demoLink: "" },
  { title: "Sports Complex System", description: "Reservation management system avoiding schedule conflicts with EF Core and POO.", category: "C# & ASP.NET", codeLink: "https://github.com/SAOT31/SportsComplexSystem", demoLink: "" },
  { title: "NextInLine Turn Management System", description: "Complete system for queue management with waiting room, advisor interface, and sequential flow control.", category: "C# & ASP.NET", codeLink: "https://github.com/Hubble-C/NextInLine", demoLink: "" },
  { title: "api-tickets-laravel", description: "API RESTful para gestión y soporte de tickets de usuario desarrollada con PHP y Laravel.", descriptionEn: "RESTful API for user ticket management and support developed with PHP and Laravel.", category: "PHP", codeLink: "https://github.com/SAOT31/api-tickets-laravel", demoLink: "" },
  { title: "AstroBlog", description: "Blog dinámico multi-tenant desarrollado con PHP.", descriptionEn: "Dynamic multi-tenant blog developed with PHP.", category: "PHP", codeLink: "https://github.com/SAOT31/AstroBlog", demoLink: "" },
  { title: "Rentify", description: "Aplicación web completa para búsqueda, alquiler y reserva de inmuebles desarrollada en C# y ASP.NET.", descriptionEn: "Complete web application for property search, rental, and booking developed in C# and ASP.NET.", category: "C# & ASP.NET", codeLink: "https://github.com/SAOT31/Rentify", demoLink: "" },
  { title: "Logistics", description: "Sistema de gestión de inventarios, rutas y control logístico desarrollado en C# y .NET.", descriptionEn: "Inventory management, routing, and logistics control system developed in C# and .NET.", category: "C# & ASP.NET", codeLink: "https://github.com/SAOT31/Logistics", demoLink: "" },
  { title: "M6.3S1", description: "Firmeza (Materiales de construcción): Configuración del proyecto web con ASP.NET Core 10 Razor Pages y arquitectura base.", descriptionEn: "Firmeza (Construction Materials): Web project setup with ASP.NET Core 10 Razor Pages and base architecture.", category: "C# & ASP.NET", codeLink: "https://github.com/SAOT31/M6.3S1", demoLink: "" },
  { title: "M6.3S2", description: "Firmeza (Materiales de construcción): Implementación de la base de datos, persistencia y el catálogo de productos.", descriptionEn: "Firmeza (Construction Materials): Database implementation, persistence, and product catalog.", category: "C# & ASP.NET", codeLink: "https://github.com/SAOT31/M6.3S2", demoLink: "" },
  { title: "M6.3S3", description: "Firmeza (Materiales de construcción): Módulo de gestión y administración de clientes de la distribuidora.", descriptionEn: "Firmeza (Construction Materials): Customer management and administration module for the distributor.", category: "C# & ASP.NET", codeLink: "https://github.com/SAOT31/M6.3S3", demoLink: "" },
  { title: "Firmeza M6.3S4", description: "Firmeza (Materiales de construcción): Módulo de gestión de ventas y registro de transacciones comerciales.", descriptionEn: "Firmeza (Construction Materials): Sales management and business transaction registry module.", category: "C# & ASP.NET", codeLink: "https://github.com/SAOT31/M6.3S4", demoLink: "" },
  { title: "Firmeza M6.3S5", description: "Firmeza (Materiales de construcción): Reportes financieros, panel de analítica de negocio y optimizaciones finales.", descriptionEn: "Firmeza (Construction Materials): Financial reports, business analytics dashboard, and final optimizations.", category: "C# & ASP.NET", codeLink: "https://github.com/SAOT31/M6.3S5", demoLink: "" }
];

export const Admin = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [view, setView] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [migrating, setMigrating] = useState(false);
  const [message, setMessage] = useState({ text: '', type: 'success' });
  const [selectedIds, setSelectedIds] = useState(new Set());

  const [isDarkMode, setIsDarkMode] = useState(true);

  // Apply theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
    window.dispatchEvent(new Event('themeChanged'));
  };

  const fetchProjects = async () => {
    try {
      console.log("fetchProjects: Starting query on 'projects' collection...");
      const q = query(collection(db, 'projects'), orderBy('order', 'desc'));
      const snap = await getDocs(q);
      console.log("fetchProjects: Query completed successfully. Documents found:", snap.size);
      if (snap.size > 0) {
        console.log("fetchProjects: Sample first document data:", snap.docs[0].data());
      }
      setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error("fetchProjects: Query failed with error:", err);
      showMessage('Error al cargar proyectos de Firebase.', 'error');
    }
  };

  useEffect(() => {
    console.log("Admin: Component mounted.");
    console.log("Admin: Active Firebase Project ID:", import.meta.env.VITE_FIREBASE_PROJECT_ID);
    fetchProjects();
  }, []);

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: 'success' }), 3500);
  };

  const handleMigrateStatic = async () => {
    if (!confirm(`¿Migrar ${STATIC_PROJECTS.length} proyectos estáticos a Firebase? Solo hazlo una vez.`)) return;
    setMigrating(true);
    try {
      const batch = writeBatch(db);
      const baseTime = Date.now();
      STATIC_PROJECTS.forEach((proj, idx) => {
        const docRef = doc(collection(db, 'projects'));
        const projectTime = new Date(baseTime + idx * 1000);
        batch.set(docRef, { ...proj, order: idx, images: [], hidden: false, createdAt: projectTime });
      });
      await batch.commit();
      showMessage(`✅ ${STATIC_PROJECTS.length} proyectos migrados a Firebase.`);
      fetchProjects();
    } catch (err) {
      console.error("Migration error:", err);
      showMessage(`❌ Error en la migración: ${err.message || err}`, 'error');
    } finally {
      setMigrating(false);
    }
  };

  const handleImageUpload = async (files) => {
    setUploadingImages(true);
    const urls = [];
    for (const file of files) {
      const storageRef = ref(storage, `projects/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      urls.push(url);
    }
    setForm(prev => ({ ...prev, images: [...(prev.images || []), ...urls] }));
    setUploadingImages(false);
  };

  const handleMoveUp = async (index) => {
    if (index === 0) return;
    const currentProj = projects[index];
    const prevProj = projects[index - 1];
    const currentOrder = currentProj.order !== undefined ? currentProj.order : (projects.length - index);
    const prevOrder = prevProj.order !== undefined ? prevProj.order : (projects.length - (index - 1));
    await updateDoc(doc(db, 'projects', currentProj.id), { order: prevOrder });
    await updateDoc(doc(db, 'projects', prevProj.id), { order: currentOrder });
    fetchProjects();
  };

  const handleMoveDown = async (index) => {
    if (index === projects.length - 1) return;
    const currentProj = projects[index];
    const nextProj = projects[index + 1];
    const currentOrder = currentProj.order !== undefined ? currentProj.order : (projects.length - index);
    const nextOrder = nextProj.order !== undefined ? nextProj.order : (projects.length - (index + 1));
    await updateDoc(doc(db, 'projects', currentProj.id), { order: nextOrder });
    await updateDoc(doc(db, 'projects', nextProj.id), { order: currentOrder });
    fetchProjects();
  };

  const handleAutoTranslate = async () => {
    if (!form.description) {
      showMessage('Escribe primero la descripción en español para poder traducirla.', 'error');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(form.description)}&langpair=es|en`);
      const data = await response.json();
      if (data.responseData && data.responseData.translatedText) {
        setForm(prev => ({ ...prev, descriptionEn: data.responseData.translatedText }));
        showMessage('✅ Traducción completada con éxito.');
      } else {
        throw new Error('No se recibió la traducción.');
      }
    } catch (err) {
      console.error("Translation error:", err);
      showMessage('❌ Error en la traducción automática.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleMoveSelectedToTop = async () => {
    if (selectedIds.size === 0) return;
    setLoading(true);
    try {
      const batch = writeBatch(db);
      let maxOrder = projects.length > 0 ? Math.max(...projects.map(p => p.order || 0)) : 0;
      const selectedProjects = projects.filter(p => selectedIds.has(p.id));
      selectedProjects.reverse().forEach((proj) => {
        maxOrder += 1;
        const docRef = doc(db, 'projects', proj.id);
        batch.set(docRef, { order: maxOrder }, { merge: true });
      });
      await batch.commit();
      setSelectedIds(new Set());
      showMessage(`✅ ${selectedProjects.length} proyectos movidos al inicio.`);
      fetchProjects();
    } catch (err) {
      console.error(err);
      showMessage('❌ Error al mover al inicio.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleMoveSelectedToBottom = async () => {
    if (selectedIds.size === 0) return;
    setLoading(true);
    try {
      const batch = writeBatch(db);
      let minOrder = projects.length > 0 ? Math.min(...projects.map(p => p.order || 0)) : 0;
      const selectedProjects = projects.filter(p => selectedIds.has(p.id));
      selectedProjects.forEach((proj) => {
        minOrder -= 1;
        const docRef = doc(db, 'projects', proj.id);
        batch.set(docRef, { order: minOrder }, { merge: true });
      });
      await batch.commit();
      setSelectedIds(new Set());
      showMessage(`✅ ${selectedProjects.length} proyectos movidos al final.`);
      fetchProjects();
    } catch (err) {
      console.error(err);
      showMessage('❌ Error al mover al final.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await updateDoc(doc(db, 'projects', editingId), { ...form, order: Number(form.order || 0), updatedAt: serverTimestamp() });
        showMessage('✅ Proyecto actualizado.');
      } else {
        const nextOrder = projects.length > 0 ? Math.max(...projects.map(p => p.order || 0)) + 1 : 0;
        await addDoc(collection(db, 'projects'), { ...form, order: nextOrder, createdAt: serverTimestamp() });
        showMessage('✅ Proyecto agregado.');
      }
      setForm(emptyForm);
      setEditingId(null);
      setView('list');
      fetchProjects();
    } catch (err) {
      console.error("Submit error:", err);
      showMessage('❌ Error al guardar.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (proj) => { setForm({ ...proj }); setEditingId(proj.id); setView('form'); };
  const handleDelete = async (proj) => {
    if (!confirm(`¿Eliminar "${proj.title}"?`)) return;
    await deleteDoc(doc(db, 'projects', proj.id));
    showMessage('🗑️ Proyecto eliminado.');
    fetchProjects();
  };
  const handleToggleHidden = async (proj) => {
    await updateDoc(doc(db, 'projects', proj.id), { hidden: !proj.hidden });
    fetchProjects();
  };
  const handleLogout = async () => { await logout(); navigate('/'); };

  const stats = CATEGORIES.map(cat => ({ cat, count: projects.filter(p => p.category === cat).length }));
  const visibleCount = projects.filter(p => !p.hidden).length;
  const hiddenCount = projects.filter(p => p.hidden).length;

  const downloadBackup = () => {
    const code = `// RESPALDO — ${new Date().toLocaleDateString()}\nexport const projectsBackup = ${JSON.stringify(projects, null, 2)};`;
    const blob = new Blob([code], { type: 'text/javascript' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'projects_backup.js'; a.click();
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'list', label: 'Proyectos', icon: 'folder' },
    { id: 'form', label: 'Nuevo', icon: 'add_circle' },
  ];

  return (
    <div className="min-h-screen bg-surface-container-lowest text-on-background transition-colors duration-300 relative overflow-hidden">
      <CustomCursor />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticlesBackground />
      </div>

      {/* Header */}
      <header className="glass-panel sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
            <span className="material-symbols-outlined text-white text-lg">admin_panel_settings</span>
          </div>
          <span className="font-display text-lg font-bold text-on-background tracking-tight">Panel Admin</span>
        </div>

        <nav className="hidden md:flex gap-1">
          {navItems.map(({ id, label, icon }) => (
            <button key={id}
              onClick={() => { setView(id); if (id === 'form') { setForm(emptyForm); setEditingId(null); } }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-label-caps text-label-caps transition-all ${view === id ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-on-background hover:bg-surface-container-high'}`}>
              <span className="material-symbols-outlined text-sm">{icon}</span>
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {projects.length === 0 && (
            <button onClick={handleMigrateStatic} disabled={migrating}
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-primary border border-primary/30 hover:bg-primary/10 transition-all font-label-caps text-label-caps">
              <span className="material-symbols-outlined text-sm">upload</span>
              {migrating ? 'Migrando...' : 'Migrar proyectos'}
            </button>
          )}
          <button onClick={downloadBackup}
            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg text-sm glass-panel hover:bg-surface-container-high text-on-surface-variant hover:text-on-background transition-all">
            <span className="material-symbols-outlined text-sm">download</span> Respaldo
          </button>
          <button onClick={toggleTheme}
            className="text-on-surface-variant hover:text-primary transition-colors p-2"
            aria-label="Toggle dark mode">
            <span className="material-symbols-outlined">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
          </button>
          <Link to="/" className="text-sm text-on-surface-variant hover:text-primary transition-colors px-3 py-2">
            ← Portafolio
          </Link>
          <button onClick={handleLogout}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-error/10 hover:bg-error/20 text-error text-sm transition-all">
            <span className="material-symbols-outlined text-sm">logout</span>
          </button>
        </div>
      </header>

      {/* Toast */}
      {message.text && (
        <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 glass-panel px-6 py-3 rounded-xl text-sm shadow-xl border ${message.type === 'error' ? 'border-error/30 text-error' : 'border-primary/20 text-on-background'}`}>
          {message.text}
        </div>
      )}

      <main className="max-w-6xl mx-auto px-6 py-10 relative z-10">

        {/* DASHBOARD */}
        {view === 'dashboard' && (
          <div>
            <div className="mb-10">
              <h1 className="font-headline-lg text-headline-lg text-on-background mb-2">Dashboard</h1>
              <p className="text-on-surface-variant font-body-md">Bienvenido, <span className="text-primary">Sergio</span></p>
            </div>

            {/* Migration banner if empty */}
            {projects.length === 0 && (
              <div className="glass-panel rounded-2xl p-6 mb-8 border border-primary/20 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-on-background mb-1">🚀 Firebase está vacío</p>
                  <p className="text-sm text-on-surface-variant">Importa todos tus proyectos del código a la base de datos con un clic.</p>
                </div>
                <button onClick={handleMigrateStatic} disabled={migrating}
                  className="px-5 py-2.5 rounded-xl text-on-primary font-semibold text-sm transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
                  {migrating ? 'Migrando...' : `Importar ${STATIC_PROJECTS.length} proyectos`}
                </button>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { label: 'Total', value: projects.length, icon: 'folder', color: 'var(--color-primary)' },
                { label: 'Visibles', value: visibleCount, icon: 'visibility', color: '#10b981' },
                { label: 'Ocultos', value: hiddenCount, icon: 'visibility_off', color: 'var(--color-error)' },
                { label: 'Categorías', value: CATEGORIES.length, icon: 'category', color: 'var(--color-tertiary)' },
              ].map(s => (
                <div key={s.label} className="glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color}20` }}>
                    <span className="material-symbols-outlined" style={{ color: s.color }}>{s.icon}</span>
                  </div>
                  <span className="text-3xl font-bold text-on-background">{s.value}</span>
                  <span className="font-label-caps text-label-caps text-on-surface-variant">{s.label}</span>
                </div>
              ))}
            </div>

            <h2 className="font-headline-md text-headline-md text-on-background mb-4">Por Tecnología</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.map(({ cat, count }) => (
                <div key={cat} className="glass-panel glass-panel-hover rounded-2xl p-5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-body-md text-on-background">{cat}</span>
                    <span className="text-2xl font-bold text-primary">{count}</span>
                  </div>
                  <div className="w-full bg-surface-container-high rounded-full h-2">
                    <div className="h-2 rounded-full transition-all" style={{ width: `${projects.length ? (count / projects.length) * 100 : 0}%`, background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LISTA */}
        {view === 'list' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="font-headline-lg text-headline-lg text-on-background">Proyectos ({projects.length})</h1>
              <button onClick={() => { setForm(emptyForm); setEditingId(null); setView('form'); }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-on-primary font-semibold text-sm transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
                <span className="material-symbols-outlined text-sm">add</span> Nuevo
              </button>
            </div>
            {selectedIds.size > 0 && (
              <div className="glass-panel border border-primary/30 rounded-xl p-4 mb-4 flex items-center justify-between animate-fade-in" style={{ animation: 'fade-in-quick 0.3s ease-out' }}>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">{selectedIds.size}</span>
                  <span className="text-sm font-semibold text-on-background">proyectos seleccionados</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={handleMoveSelectedToTop} disabled={loading}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold transition-all cursor-pointer">
                    <span className="material-symbols-outlined text-sm">arrow_upward</span> Mover al Inicio
                  </button>
                  <button onClick={handleMoveSelectedToBottom} disabled={loading}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold transition-all cursor-pointer">
                    <span className="material-symbols-outlined text-sm">arrow_downward</span> Mover al Final
                  </button>
                  <button onClick={() => setSelectedIds(new Set())}
                    className="px-3 py-1.5 rounded-lg glass-panel hover:bg-surface-container-high text-on-surface-variant text-xs font-semibold transition-all cursor-pointer">
                    Desmarcar
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3">
              {projects.map((proj, idx) => (
                <div key={proj.id} className={`glass-panel rounded-xl px-5 py-4 flex items-center gap-4 transition-all ${proj.hidden ? 'opacity-50' : ''} ${selectedIds.has(proj.id) ? 'border-primary/50 bg-primary/5' : ''}`}>
                  <input type="checkbox" checked={selectedIds.has(proj.id)} onChange={() => handleToggleSelect(proj.id)}
                    className="w-4.5 h-4.5 rounded border-outline-variant text-primary focus:ring-primary accent-primary cursor-pointer" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-on-background truncate">{proj.title}</span>
                      {proj.hidden && <span className="text-xs bg-error/10 text-error px-2 py-0.5 rounded-full font-label-caps">Oculto</span>}
                    </div>
                    <span className="font-label-caps text-label-caps text-primary bg-primary/10 px-2 py-0.5 rounded-full">{proj.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleMoveUp(idx)} disabled={idx === 0} title="Subir"
                      className="w-8 h-8 flex items-center justify-center rounded-lg glass-panel hover:bg-surface-container-high text-on-surface-variant transition-all disabled:opacity-30">
                      <span className="material-symbols-outlined text-sm">keyboard_arrow_up</span>
                    </button>
                    <button onClick={() => handleMoveDown(idx)} disabled={idx === projects.length - 1} title="Bajar"
                      className="w-8 h-8 flex items-center justify-center rounded-lg glass-panel hover:bg-surface-container-high text-on-surface-variant transition-all disabled:opacity-30">
                      <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                    </button>
                    <button onClick={() => handleToggleHidden(proj)} title={proj.hidden ? 'Mostrar' : 'Ocultar'}
                      className="w-8 h-8 flex items-center justify-center rounded-lg glass-panel hover:bg-surface-container-high text-on-surface-variant transition-all">
                      <span className="material-symbols-outlined text-sm">{proj.hidden ? 'visibility' : 'visibility_off'}</span>
                    </button>
                    <button onClick={() => handleEdit(proj)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-all">
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <button onClick={() => handleDelete(proj)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-error/10 hover:bg-error/20 text-error transition-all">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
              ))}
              {projects.length === 0 && (
                <p className="text-center text-on-surface-variant py-12 font-body-md">No hay proyectos. ¡Migra los existentes o crea el primero!</p>
              )}
            </div>
          </div>
        )}

        {/* FORMULARIO */}
        {view === 'form' && (
          <div className="max-w-2xl mx-auto">
            <h1 className="font-headline-lg text-headline-lg text-on-background mb-8">
              {editingId ? 'Editar Proyecto' : 'Nuevo Proyecto'}
            </h1>
            <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-8 flex flex-col gap-6">
              {[
                { label: 'Título *', key: 'title', placeholder: 'Nombre del proyecto', required: true },
                { label: 'Link del Código (GitHub)', key: 'codeLink', placeholder: 'https://github.com/...', required: false },
                { label: 'Link del Demo (Live)', key: 'demoLink', placeholder: 'https://...', required: false },
              ].map(({ label, key, placeholder, required }) => (
                <div key={key} className="flex flex-col gap-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant">{label}</label>
                  <input required={required} value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-on-background placeholder-on-surface-variant/50 outline-none focus:border-primary transition-all" />
                </div>
              ))}

              <div className="flex flex-col gap-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant">Categoría *</label>
                <select required value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                  className="bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-on-background outline-none focus:border-primary transition-all">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant">Descripción *</label>
                <textarea required rows={3} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                  placeholder="Describe el proyecto..."
                  className="bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-on-background placeholder-on-surface-variant/50 outline-none focus:border-primary transition-all resize-none" />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="font-label-caps text-label-caps text-on-surface-variant">Descripción (Inglés)</label>
                  <button type="button" onClick={handleAutoTranslate} disabled={loading}
                    className="text-xs text-primary border border-primary/30 rounded-lg px-2.5 py-1 hover:bg-primary/10 transition-all font-semibold flex items-center gap-1 cursor-pointer">
                    <span className="material-symbols-outlined text-[14px]">translate</span> Auto-traducir
                  </button>
                </div>
                <textarea rows={3} value={form.descriptionEn || ''} onChange={e => setForm(p => ({ ...p, descriptionEn: e.target.value }))}
                  placeholder="Describe the project in English..."
                  className="bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-on-background placeholder-on-surface-variant/50 outline-none focus:border-primary transition-all resize-none" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant">Prioridad de Orden (Opcional - Mayor número se muestra primero)</label>
                <input type="number" value={form.order || 0} onChange={e => setForm(p => ({ ...p, order: Number(e.target.value) }))}
                  placeholder="Ej: 10"
                  className="bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-on-background placeholder-on-surface-variant/50 outline-none focus:border-primary transition-all" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant">Imágenes del Proyecto</label>
                <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-outline-variant rounded-xl p-6 cursor-pointer hover:border-primary/50 transition-all">
                  <span className="material-symbols-outlined text-3xl text-on-surface-variant">{uploadingImages ? 'hourglass_top' : 'cloud_upload'}</span>
                  <span className="text-sm text-on-surface-variant font-body-md">{uploadingImages ? 'Subiendo imágenes...' : 'Haz clic para subir imágenes'}</span>
                  <input type="file" multiple accept="image/*" className="hidden"
                    onChange={e => handleImageUpload(Array.from(e.target.files))} disabled={uploadingImages} />
                </label>
                {form.images && form.images.length > 0 && (
                  <div className="flex gap-2 flex-wrap mt-2">
                    {form.images.map((url, i) => (
                      <div key={i} className="relative group">
                        <img src={url} alt="" className="w-20 h-20 object-cover rounded-lg" />
                        <button type="button" onClick={() => setForm(p => ({ ...p, images: p.images.filter((_, j) => j !== i) }))}
                          className="absolute top-1 right-1 w-5 h-5 bg-error rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="material-symbols-outlined text-on-error text-xs">close</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="hidden" checked={form.hidden} onChange={e => setForm(p => ({ ...p, hidden: e.target.checked }))} className="w-4 h-4 accent-primary" />
                <label htmlFor="hidden" className="text-sm text-on-surface-variant font-body-md cursor-pointer">Ocultar este proyecto en el portafolio</label>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => { setView('list'); setForm(emptyForm); setEditingId(null); }}
                  className="flex-1 py-3 rounded-xl glass-panel text-on-surface-variant hover:text-on-background transition-all font-label-caps text-label-caps">
                  Cancelar
                </button>
                <button type="submit" disabled={loading || uploadingImages}
                  className="flex-1 py-3 rounded-xl text-on-primary font-semibold transition-all hover:opacity-90 disabled:opacity-50 font-label-caps"
                  style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
                  {loading ? 'Guardando...' : editingId ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};
