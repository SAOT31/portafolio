import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { CustomCursor } from '../components/CustomCursor';
import { ParticlesBackground } from '../components/ParticlesBackground';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch {
      setError('Correo o contraseña incorrectos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest flex items-center justify-center px-4 transition-colors duration-300 relative overflow-hidden">
      <CustomCursor />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticlesBackground />
      </div>

      {/* Theme toggle */}
      <button onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 text-on-surface-variant hover:text-primary transition-colors p-2"
        aria-label="Toggle dark mode">
        <span className="material-symbols-outlined">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
      </button>

      {/* Ambient orbs */}
      <div className="absolute w-[500px] h-[500px] rounded-full opacity-[var(--ambient-opacity,0.15)] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--color-primary), transparent)', top: '-10%', left: '-10%' }}></div>
      <div className="absolute w-[400px] h-[400px] rounded-full opacity-[var(--ambient-opacity,0.15)] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--color-secondary), transparent)', bottom: '-10%', right: '-10%' }}></div>

      <div className="relative w-full max-w-md z-10">
        <div className="glass-panel rounded-2xl p-10 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
              <span className="material-symbols-outlined text-on-primary text-3xl">lock</span>
            </div>
          </div>

          <h1 className="font-headline-lg text-2xl font-bold text-center text-on-background mb-1">Panel de Control</h1>
          <p className="text-center text-on-surface-variant font-body-md text-sm mb-8">Acceso privado — Solo Sergio</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant">Correo</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tucorreo@ejemplo.com"
                className="bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-on-background outline-none focus:border-primary transition-all font-body-md placeholder-on-surface-variant/50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant">Contraseña</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-on-background outline-none focus:border-primary transition-all font-body-md placeholder-on-surface-variant/50"
              />
            </div>

            {error && (
              <div className="bg-error/10 border border-error/30 rounded-xl px-4 py-3 text-error text-sm flex items-center gap-2 font-body-md">
                <span className="material-symbols-outlined text-sm">error</span>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 py-3 rounded-xl font-semibold text-on-primary transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 font-label-caps text-label-caps"
              style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}
            >
              {loading ? 'Verificando...' : 'Entrar al Panel'}
            </button>
          </form>

          <p className="text-center text-on-surface-variant font-label-caps text-label-caps mt-8">
            <Link to="/" className="hover:text-primary transition-colors">← Volver al portafolio</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
