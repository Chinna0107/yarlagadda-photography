import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, Shield } from 'lucide-react';

const API = 'http://localhost:5000/api';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      localStorage.setItem('adminToken', data.token);
      navigate('/admin/upload');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-matte-black flex items-center justify-center px-4 relative overflow-hidden">

      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-gold/3 blur-[80px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Card */}
        <div className="glassmorphism-gold rounded-2xl p-10 shadow-2xl">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 border border-gold/20 mb-5">
              <Shield className="w-7 h-7 text-gold" />
            </div>
            <p className="text-[10px] tracking-[0.4em] text-silver/50 uppercase mb-2">Restricted Access</p>
            <h1 className="text-3xl font-serif text-soft-white tracking-wide">Admin Portal</h1>
            <p className="text-xs text-silver/40 mt-2 font-light">Yarlagadda Photography</p>
            <div className="w-10 h-px bg-gold/40 mx-auto mt-4" />
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center"
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-silver/30" />
              <input
                type="email"
                placeholder="Admin Email"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full bg-white/3 border border-white/8 rounded-xl pl-11 pr-4 py-3.5 text-sm text-soft-white placeholder-silver/25 focus:outline-none focus:border-gold/40 focus:bg-white/5 transition-all duration-300"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-silver/30" />
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Password"
                required
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full bg-white/3 border border-white/8 rounded-xl pl-11 pr-12 py-3.5 text-sm text-soft-white placeholder-silver/25 focus:outline-none focus:border-gold/40 focus:bg-white/5 transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-silver/30 hover:text-silver/60 transition-colors"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 rounded-xl bg-gold text-matte-black font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-gold-hover disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Authenticating...' : 'Access Dashboard'}
            </motion.button>
          </form>

          <p className="text-center text-[10px] text-silver/20 mt-8 tracking-widest uppercase">
            Authorized Personnel Only
          </p>
        </div>
      </motion.div>
    </div>
  );
}
