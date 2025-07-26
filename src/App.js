import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './App.css';

// Importar todas as imagens
import foto1 from './midias/1.JPG';
import foto2 from './midias/2.JPG';
import foto3 from './midias/3.JPG';
import foto4 from './midias/4.JPG';
import foto5 from './midias/5.jpg';
import foto6 from './midias/6.jpg';
import foto7 from './midias/7.jpg';
import foto8 from './midias/8.jpg';
import foto9 from './midias/9.jpg';
import foto10 from './midias/10.jpg';
import foto11 from './midias/11.jpg';
import foto12 from './midias/12.jpg';
import foto14 from './midias/14.jpg';
import foto15 from './midias/15.jpg';
import foto16 from './midias/16.jpg';
import foto17 from './midias/17.jpg';
import foto18 from './midias/18.jpg';
import foto19 from './midias/19.jpg';
import foto20 from './midias/20.jpg';
import foto21 from './midias/21.jpg';

const fotos = [
  { src: foto1, alt: "Retrato 1", categoria: "retrato" },
  { src: foto2, alt: "Retrato 2", categoria: "retrato" },
  { src: foto3, alt: "Fotografia 3", categoria: "arte" },
  { src: foto4, alt: "Fotografia 4", categoria: "arte" },
  { src: foto5, alt: "Retrato 5", categoria: "retrato" },
  { src: foto6, alt: "Retrato 6", categoria: "retrato" },
  { src: foto7, alt: "Retrato 7", categoria: "retrato" },
  { src: foto8, alt: "Retrato 8", categoria: "retrato" },
  { src: foto9, alt: "Fotografia 9", categoria: "arte" },
  { src: foto10, alt: "Fotografia 10", categoria: "arte" },
  { src: foto11, alt: "Fotografia 11", categoria: "arte" },
  { src: foto12, alt: "Fotografia 12", categoria: "arte" },
  { src: foto14, alt: "Fotografia 14", categoria: "arte" },
  { src: foto15, alt: "Fotografia 15", categoria: "arte" },
  { src: foto16, alt: "Fotografia 16", categoria: "arte" },
  { src: foto17, alt: "Fotografia 17", categoria: "arte" },
  { src: foto18, alt: "Fotografia 18", categoria: "arte" },
  { src: foto19, alt: "Fotografia 19", categoria: "arte" },
  { src: foto20, alt: "Fotografia 20", categoria: "arte" },
  { src: foto21, alt: "Fotografia 21", categoria: "arte" },
];

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('todos');
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const filteredFotos = currentFilter === 'todos' 
    ? fotos 
    : fotos.filter(foto => foto.categoria === currentFilter);

  const openModal = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="App">
      {/* Header */}
      <motion.header 
        className="header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="header-content">
          <motion.h1 
            className="photographer-name"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Luana Furtado
          </motion.h1>
          <motion.p 
            className="photographer-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Fotógrafa Artística
          </motion.p>
        </div>
      </motion.header>

      {/* Navigation */}
      <motion.nav 
        className="navigation"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <div className="nav-filters">
          <button 
            className={`filter-btn ${currentFilter === 'todos' ? 'active' : ''}`}
            onClick={() => setCurrentFilter('todos')}
          >
            Todos
          </button>
          <button 
            className={`filter-btn ${currentFilter === 'retrato' ? 'active' : ''}`}
            onClick={() => setCurrentFilter('retrato')}
          >
            Retratos
          </button>
          <button 
            className={`filter-btn ${currentFilter === 'arte' ? 'active' : ''}`}
            onClick={() => setCurrentFilter('arte')}
          >
            Arte
          </button>
        </div>
      </motion.nav>

      {/* Gallery */}
      <motion.div 
        ref={ref}
        className="gallery-container"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="gallery">
          <AnimatePresence mode="wait">
            {filteredFotos.map((foto, index) => (
              <motion.div
                key={foto.src}
                className="gallery-item"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                onClick={() => openModal(foto)}
              >
                <img 
                  src={foto.src} 
                  alt={foto.alt}
                  loading="lazy"
                />
                <div className="image-overlay">
                  <span className="view-text">Ver</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-btn" onClick={closeModal}>
                ×
              </button>
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt}
                className="modal-image"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.footer 
        className="footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="footer-content">
          <p>&copy; 2024 Luana Furtado. Todos os direitos reservados.</p>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;
