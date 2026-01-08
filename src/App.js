import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import exifr from 'exifr';
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
import foto22 from './midias/22.JPG';
import foto23 from './midias/23.JPG';
import foto24 from './midias/24.JPG';
import foto25 from './midias/25.JPG';
import foto26 from './midias/26.JPG';
import foto27 from './midias/27.jpg';
import foto28 from './midias/28.jpg';
import foto29 from './midias/29.jpg';
import foto30 from './midias/30.JPG';
import foto31 from './midias/31.JPG';
import foto32 from './midias/32.JPG';
import foto33 from './midias/33.JPG';
import foto34 from './midias/34.JPG';
import foto35 from './midias/35.jpg';
import foto36 from './midias/36.JPG';
import foto37 from './midias/37.jpg';
import foto38 from './midias/38.jpg';
import foto39 from './midias/39.jpg';
import foto40 from './midias/40.jpg';

const fotosIniciais = [
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
  { src: foto22, alt: "Fotografia 22", categoria: "retrato" },
  { src: foto23, alt: "Fotografia 23", categoria: "retrato" },
  { src: foto24, alt: "Fotografia 24", categoria: "retrato" },
  { src: foto25, alt: "Fotografia 25", categoria: "retrato" },
  { src: foto26, alt: "Fotografia 26", categoria: "retrato" },
  { src: foto27, alt: "Fotografia 27", categoria: "arte" },
  { src: foto28, alt: "Fotografia 28", categoria: "arte" },
  { src: foto29, alt: "Fotografia 29", categoria: "arte" },
  { src: foto30, alt: "Fotografia 30", categoria: "arte" },
  { src: foto31, alt: "Fotografia 31", categoria: "arte" },
  { src: foto32, alt: "Fotografia 32", categoria: "arte" },
  { src: foto33, alt: "Fotografia 33", categoria: "arte" },
  { src: foto34, alt: "Fotografia 34", categoria: "retrato" },
  { src: foto35, alt: "Fotografia 35", categoria: "arte" },
  { src: foto36, alt: "Fotografia 36", categoria: "arte" },
  { src: foto37, alt: "Fotografia 37", categoria: "arte" },
  { src: foto38, alt: "Fotografia 38", categoria: "arte" },
  { src: foto39, alt: "Fotografia 39", categoria: "retrato" },
  { src: foto40, alt: "Fotografia 40", categoria: "retrato" },
];

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('todos');
  const [fotos, setFotos] = useState(fotosIniciais);
  const [isLoading, setIsLoading] = useState(true);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showInfo, setShowInfo] = useState(true);
  const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false);
  
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Carregar metadados EXIF e ordenar por data
  useEffect(() => {
    const carregarMetadados = async () => {
      try {
        const fotosComMetadados = await Promise.all(
          fotosIniciais.map(async (foto) => {
            try {
              const exifData = await exifr.parse(foto.src);
              return {
                ...foto,
                data: exifData?.DateTimeOriginal || exifData?.DateTime || exifData?.CreateDate || null,
                exifData: exifData
              };
            } catch (error) {
              return {
                ...foto,
                data: null,
                exifData: null
              };
            }
          })
        );

        // Ordenar por data (mais recentes primeiro)
        const fotosOrdenadas = fotosComMetadados.sort((a, b) => {
          if (!a.data && !b.data) return 0;
          if (!a.data) return 1;
          if (!b.data) return -1;
          return new Date(b.data) - new Date(a.data);
        });

        setFotos(fotosOrdenadas);
        setIsLoading(false);
        setTimeout(() => setHasInitiallyLoaded(true), 500);
      } catch (error) {
        console.error('Erro ao carregar metadados:', error);
        setFotos(fotosIniciais);
        setIsLoading(false);
        setTimeout(() => setHasInitiallyLoaded(true), 500);
      }
    };

    carregarMetadados();
  }, []);

  const filteredFotos = currentFilter === 'todos' 
    ? fotos 
    : fotos.filter(foto => foto.categoria === currentFilter);

  const openModal = (image) => {
    setSelectedImage(image);
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setShowInfo(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setShowInfo(true);
    document.body.style.overflow = 'unset';
  };

  const handleWheel = (e) => {
    e.preventDefault();
    
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    
    // Posição do mouse no container
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Zoom
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(1, Math.min(scale * delta, 4));
    
    if (newScale !== scale) {
      // Centro do container
      const containerCenterX = rect.width / 2;
      const containerCenterY = rect.height / 2;
      
      // Offset do mouse em relação ao centro do container
      const offsetX = mouseX - containerCenterX;
      const offsetY = mouseY - containerCenterY;
      
      // Ajustar posição para manter o ponto do mouse fixo
      const newX = position.x - (offsetX * (newScale - scale) / scale);
      const newY = position.y - (offsetY * (newScale - scale) / scale);
      
      setScale(newScale);
      
      if (newScale > 1) {
        setPosition({ x: newX, y: newY });
        setShowInfo(false);
      } else {
        setPosition({ x: 0, y: 0 });
        setShowInfo(true);
      }
    }
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      
      setDragStart({ 
        ...dragStart, 
        pinchDistance: distance,
        initialScale: scale,
        initialPosition: { ...position }
      });
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      
      if (dragStart.pinchDistance && dragStart.initialScale) {
        const container = e.currentTarget;
        const rect = container.getBoundingClientRect();
        
        // Centro do pinch
        const centerX = (touch1.clientX + touch2.clientX) / 2 - rect.left;
        const centerY = (touch1.clientY + touch2.clientY) / 2 - rect.top;
        
        // Nova escala
        const scaleChange = distance / dragStart.pinchDistance;
        const newScale = Math.max(1, Math.min(dragStart.initialScale * scaleChange, 4));
        
        // Centro do container
        const containerCenterX = rect.width / 2;
        const containerCenterY = rect.height / 2;
        
        // Offset do centro do pinch em relação ao centro do container
        const offsetX = centerX - containerCenterX;
        const offsetY = centerY - containerCenterY;
        
        // Ajustar posição
        const newX = dragStart.initialPosition.x - (offsetX * (newScale - dragStart.initialScale) / dragStart.initialScale);
        const newY = dragStart.initialPosition.y - (offsetY * (newScale - dragStart.initialScale) / dragStart.initialScale);
        
        setScale(newScale);
        
        if (newScale > 1) {
          setPosition({ x: newX, y: newY });
          setShowInfo(false);
        } else {
          setPosition({ x: 0, y: 0 });
          setShowInfo(true);
        }
      }
    }
  };

  const handleMouseDown = (e) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchDragStart = (e) => {
    if (scale > 1 && e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
    }
  };

  const handleTouchDragMove = (e) => {
    if (isDragging && scale > 1 && e.touches.length === 1) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const formatarData = (data) => {
    if (!data) return null;
    try {
      const date = new Date(data);
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return null;
    }
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
        {isLoading ? (
          <div className="loading">
            <p>Carregando fotografias...</p>
          </div>
        ) : (
          <div className="gallery">
            {filteredFotos.map((foto) => (
              <motion.div
                key={foto.src}
                className="gallery-item"
                layout
                initial={!hasInitiallyLoaded ? { opacity: 0, scale: 0.95 } : false}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  layout: { duration: 0.3, ease: "easeOut" },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 }
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
          </div>
        )}
      </motion.div>

      {/* Modal com Zoom */}
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
              
              {/* Informações da imagem */}
              <AnimatePresence>
                {showInfo && selectedImage.data && (
                  <motion.div 
                    className="image-info"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="image-date">
                      {formatarData(selectedImage.data)}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div 
                className="modal-image-container"
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={(e) => {
                  handleTouchStart(e);
                  handleTouchDragStart(e);
                }}
                onTouchMove={(e) => {
                  handleTouchMove(e);
                  handleTouchDragMove(e);
                }}
                onTouchEnd={handleTouchEnd}
              >
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.alt}
                  className="modal-image"
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                    cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
                    transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                  }}
                  draggable={false}
                />
              </div>

              {/* Instruções de zoom */}
              {scale === 1 && (
                <motion.div 
                  className="zoom-instructions"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p>Use a roda do mouse ou pinça para dar zoom</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
