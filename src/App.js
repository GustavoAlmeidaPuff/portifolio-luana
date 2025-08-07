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
          <div className="header-profile">
            <motion.div 
              className="profile-image-container"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <img 
                src={foto8} 
                alt="Luana Furtado" 
                className="profile-image"
              />
            </motion.div>
            <div className="header-text">
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
          </div>
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

      {/* Contact Section - COMENTADO TEMPORARIAMENTE */}
      {/*
      <motion.section 
        className="contact-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <div className="contact-container">
          <motion.h2 
            className="contact-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Entre em Contato
          </motion.h2>
          <motion.p 
            className="contact-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            Vamos conversar sobre seu projeto fotográfico
          </motion.p>
          
          <motion.div 
            className="contact-form"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            <div className="form-group">
              <input 
                type="text" 
                placeholder="Seu nome"
                className="form-input"
                id="name"
              />
            </div>
            <motion.button 
              className="whatsapp-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const name = document.getElementById('name').value || 'Cliente';
                
                const whatsappMessage = `Olá Luana! Sou ${name}. Gostaria de conversar sobre um projeto fotográfico.`;
                const encodedMessage = encodeURIComponent(whatsappMessage);
                const whatsappUrl = `https://wa.me/5551999421776?text=${encodedMessage}`;
                
                window.open(whatsappUrl, '_blank');
              }}
            >
              <svg className="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Enviar Mensagem no WhatsApp
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <div className="contact-item">
              <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span>Igrejinha, RS</span>
            </div>
            <div className="contact-item">
              <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <span>(51) 9 9942-1776</span>
            </div>
          </motion.div>
        </div>
      </motion.section>
      */}

      {/* Footer */}
      <motion.footer 
        className="footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.8 }}
      >
        <div className="footer-content">
          <p>&copy; 2024 Luana Furtado. Todos os direitos reservados.</p>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;
