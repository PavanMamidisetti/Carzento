import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, User, Lock, Mail } from 'lucide-react';

/**
 * AuthModal — Glassmorphic authentication modal with Sign Up / Log In tabs.
 * Uses Framer Motion for fluid enter/exit transitions.
 */
export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass user data back to parent
    const userName = mode === 'signup' ? formData.name : formData.email;
    if (onLoginSuccess) {
      onLoginSuccess(userName);
    }
    onClose();
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setFormData({ name: '', email: '', password: '' });
    setShowPassword(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ─── Overlay ─────────────────────────────────── */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* ─── Modal Card ──────────────────────────────── */}
            <motion.div
              className="relative z-10 w-full max-w-md mx-4"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div
                className="rounded-2xl p-8 shadow-2xl"
                style={{
                  background: 'rgba(23, 23, 23, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-1.5 rounded-full transition-colors
                             cursor-pointer"
                  style={{ color: 'var(--color-text-secondary)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
                >
                  <X className="h-5 w-5" strokeWidth={2} />
                </button>

                {/* ─── Header + Tab Toggle ────────────────────── */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
                       style={{ background: 'rgba(30, 165, 153, 0.15)' }}>
                    <User className="h-7 w-7 text-[var(--color-teal)]" strokeWidth={1.8} />
                  </div>
                  <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>
                    {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                  </h2>
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    {mode === 'login'
                      ? 'Sign in to your Carzento account'
                      : 'Join Carzento for the best car experience'}
                  </p>
                </div>

                {/* Tab Toggle */}
                <div
                  className="flex rounded-xl p-1 mb-6"
                  style={{ background: 'rgba(0, 0, 0, 0.4)' }}
                >
                  {['login', 'signup'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => switchMode(tab)}
                      className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all
                                 duration-200 cursor-pointer"
                      style={{
                        background: mode === tab ? 'var(--color-teal)' : 'transparent',
                        color: mode === tab ? '#fff' : 'var(--color-text-secondary)',
                      }}
                    >
                      {tab === 'login' ? 'Log In' : 'Sign Up'}
                    </button>
                  ))}
                </div>

                {/* ─── Form ───────────────────────────────────── */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name field (sign up only) */}
                  <AnimatePresence mode="wait">
                    {mode === 'signup' && (
                      <motion.div
                        key="name-field"
                        initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginBottom: 0 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div
                          className="flex items-center gap-3 rounded-lg px-4 py-3
                                     transition-colors"
                          style={{
                            background: 'rgba(0, 0, 0, 0.5)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                          }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-teal)'; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'; }}
                        >
                          <User
                            className="h-4 w-4 shrink-0"
                            style={{ color: 'var(--color-text-secondary)' }}
                            strokeWidth={1.8}
                          />
                          <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full bg-transparent text-sm outline-none
                                       placeholder-neutral-500"
                            style={{ color: 'var(--color-text)' }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Email / Username */}
                  <div
                    className="flex items-center gap-3 rounded-lg px-4 py-3
                               transition-colors"
                    style={{
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-teal)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'; }}
                  >
                    {mode === 'login' ? (
                      <User
                        className="h-4 w-4 shrink-0"
                        style={{ color: 'var(--color-text-secondary)' }}
                        strokeWidth={1.8}
                      />
                    ) : (
                      <Mail
                        className="h-4 w-4 shrink-0"
                        style={{ color: 'var(--color-text-secondary)' }}
                        strokeWidth={1.8}
                      />
                    )}
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent text-sm outline-none
                                 placeholder-neutral-500"
                      style={{ color: 'var(--color-text)' }}
                    />
                  </div>

                  {/* Password */}
                  <div
                    className="flex items-center gap-3 rounded-lg px-4 py-3
                               transition-colors"
                    style={{
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-teal)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'; }}
                  >
                    <Lock
                      className="h-4 w-4 shrink-0"
                      style={{ color: 'var(--color-text-secondary)' }}
                      strokeWidth={1.8}
                    />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent text-sm outline-none
                                 placeholder-neutral-500"
                      style={{ color: 'var(--color-text)' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="shrink-0 cursor-pointer"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {showPassword
                        ? <EyeOff className="h-4 w-4" strokeWidth={1.8} />
                        : <Eye className="h-4 w-4" strokeWidth={1.8} />
                      }
                    </button>
                  </div>

                  {/* Forgot Password (login only) */}
                  {mode === 'login' && (
                    <div className="text-right">
                      <a
                        href="#"
                        className="text-xs transition-colors"
                        style={{ color: 'var(--color-teal)' }}
                      >
                        Forgot password?
                      </a>
                    </div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 rounded-lg text-sm font-bold text-white
                               cursor-pointer transition-all duration-200 mt-2"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-teal) 0%, #0d8a80 100%)',
                      boxShadow: '0 4px 20px rgba(30, 165, 153, 0.3)',
                    }}
                  >
                    {mode === 'login' ? 'Sign In' : 'Create Account'}
                  </motion.button>
                </form>


                {/* ─── Footer Toggle ──────────────────────────── */}
                <p className="text-center text-xs mt-6" style={{ color: 'var(--color-text-secondary)' }}>
                  {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                  <button
                    onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}
                    className="font-semibold cursor-pointer transition-colors"
                    style={{ color: 'var(--color-teal)' }}
                  >
                    {mode === 'login' ? 'Sign Up' : 'Log In'}
                  </button>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
