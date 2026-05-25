import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Trash2, LogOut, ImagePlus, CheckCircle, XCircle, Loader } from 'lucide-react';
import { API } from '../config/api';
import { SERVICE_CATEGORIES, getCategoryLabel, normalizeCategory } from '../config/serviceCategories';

const DEFAULT_CATEGORY = 'wedding-photography';

export default function AdminUpload() {
  const [images, setImages] = useState([]);
  const [filterCat, setFilterCat] = useState('all');
  const [form, setForm] = useState({ title: '', caption: '', category: DEFAULT_CATEGORY });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState(null);
  const fileRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) navigate('/admin');
    else loadImages();
  }, []);

  const loadImages = () => {
    fetch(`${API}/images`)
      .then(r => r.json())
      .then(data => Array.isArray(data) && setImages(data));
  };

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleUpload = async (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (uploading) return;
    if (!file) return showToast('Please select an image', 'error');
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      fd.append('title', form.title);
      fd.append('caption', form.caption);
      fd.append('category', form.category);

      const res = await fetch(`${API}/images/upload`, { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      showToast('Image uploaded successfully!');
      setFile(null);
      setPreview(null);
      setForm({ title: '', caption: '', category: DEFAULT_CATEGORY });
      loadImages();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this image?')) return;
    try {
      await fetch(`${API}/images/${id}`, { method: 'DELETE' });
      showToast('Image deleted');
      loadImages();
    } catch {
      showToast('Delete failed', 'error');
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const filtered = filterCat === 'all'
    ? images
    : images.filter(i => normalizeCategory(i.category) === filterCat);

  return (
    <div className="min-h-screen bg-matte-black text-soft-white">

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-sm font-medium ${
              toast.type === 'error'
                ? 'bg-red-500/15 border border-red-500/30 text-red-400'
                : 'bg-green-500/15 border border-green-500/30 text-green-400'
            }`}
          >
            {toast.type === 'error' ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <header className="sticky top-0 z-40 glassmorphism border-b border-white/5 px-8 py-4 flex items-center justify-between">
        <div>
          <p className="text-[9px] tracking-[0.4em] text-silver/40 uppercase">Yarlagadda Photography</p>
          <h1 className="text-lg font-serif text-soft-white tracking-wide">Admin Dashboard</h1>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-xs text-silver/50 hover:text-gold transition-colors tracking-widest uppercase"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 grid grid-cols-1 lg:grid-cols-5 gap-10">

        {/* ── UPLOAD FORM ── */}
        <div className="lg:col-span-2">
          <div className="glassmorphism-gold rounded-2xl p-7 sticky top-24">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                <ImagePlus className="w-4 h-4 text-gold" />
              </div>
              <div>
                <h2 className="text-base font-serif text-soft-white">Upload Image</h2>
                <p className="text-[10px] text-silver/40 tracking-widest uppercase">Add to gallery</p>
              </div>
            </div>

            <form onSubmit={handleUpload} className="space-y-4" noValidate>

              {/* Drop Zone */}
              <div
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}
                onClick={() => fileRef.current.click()}
                className="relative border-2 border-dashed border-white/10 rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer hover:border-gold/30 hover:bg-white/2 transition-all duration-300 overflow-hidden group"
              >
                {preview ? (
                  <img src={preview} alt="preview" className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-70 group-hover:opacity-90 transition-opacity" />
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-silver/20 mb-2 group-hover:text-gold/40 transition-colors" />
                    <p className="text-xs text-silver/30 group-hover:text-silver/50 transition-colors">Drop image or click to browse</p>
                    <p className="text-[10px] text-silver/20 mt-1">JPG, PNG, WEBP</p>
                  </>
                )}
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
              </div>

              {/* Category */}
              <div>
                <label className="text-[10px] tracking-widest uppercase text-silver/40 block mb-2">Category</label>
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-sm text-soft-white focus:outline-none focus:border-gold/40 transition-all"
                >
                  {SERVICE_CATEGORIES.map(c => <option key={c.id} value={c.id} className="bg-charcoal">{c.label}</option>)}
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="text-[10px] tracking-widest uppercase text-silver/40 block mb-2">Title</label>
                <input
                  type="text"
                  placeholder="e.g. Golden Hour Symphony"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-sm text-soft-white placeholder-silver/20 focus:outline-none focus:border-gold/40 transition-all"
                />
              </div>

              {/* Caption */}
              <div>
                <label className="text-[10px] tracking-widest uppercase text-silver/40 block mb-2">Caption</label>
                <textarea
                  placeholder="Short description..."
                  rows={2}
                  value={form.caption}
                  onChange={e => setForm({ ...form, caption: e.target.value })}
                  className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-sm text-soft-white placeholder-silver/20 focus:outline-none focus:border-gold/40 transition-all resize-none"
                />
              </div>

              <motion.button
                type="button"
                onClick={handleUpload}
                disabled={uploading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl bg-gold text-matte-black font-semibold text-sm tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-gold-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {uploading ? <><Loader className="w-4 h-4 animate-spin" /> Uploading...</> : <><Upload className="w-4 h-4" /> Upload Image</>}
              </motion.button>
            </form>
          </div>
        </div>

        {/* ── IMAGE GRID ── */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-serif text-soft-white">Gallery Images</h2>
              <p className="text-xs text-silver/40 mt-0.5">{filtered.length} image{filtered.length !== 1 ? 's' : ''}</p>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-7">
            {[{ id: 'all', label: 'All' }, ...SERVICE_CATEGORIES].map(c => (
              <button
                key={c.id}
                onClick={() => setFilterCat(c.id)}
                className={`px-4 py-1.5 rounded-full text-[10px] tracking-widest uppercase transition-all duration-300 relative overflow-hidden ${
                  filterCat === c.id
                    ? 'text-matte-black font-semibold'
                    : 'text-silver/50 border border-white/8 hover:text-soft-white'
                }`}
              >
                <span className="relative z-10">{c.label}</span>
                {filterCat === c.id && (
                  <motion.span layoutId="adminFilter" className="absolute inset-0 bg-gold rounded-full" transition={{ type: 'spring', stiffness: 350, damping: 28 }} />
                )}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-silver/20">
              <ImagePlus className="w-12 h-12 mb-3" />
              <p className="text-sm">No images yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <AnimatePresence>
                {filtered.map(img => (
                  <motion.div
                    key={img.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative group rounded-xl overflow-hidden border border-white/5 aspect-square"
                  >
                    <img src={img.url} alt={img.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Info */}
                    <div className="absolute inset-x-0 bottom-0 p-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-[9px] tracking-widest text-gold uppercase">{getCategoryLabel(img.category)}</span>
                      <p className="text-xs text-soft-white font-light truncate">{img.title || 'Untitled'}</p>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(img.id)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
