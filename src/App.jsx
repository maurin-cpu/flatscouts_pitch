import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

// Icons (Lucide-style SVGs)
const Icons = {
  ArrowRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  ArrowLeft: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
    </svg>
  ),
  FileWarning: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <path d="M12 9v4" /><path d="M12 17h.01" />
    </svg>
  ),
  Scissors: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  ),
  Shuffle: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" />
      <polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" />
      <line x1="4" y1="4" x2="9" y2="9" />
    </svg>
  ),
  CheckCircle: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  MousePointerClick: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="m9 9 5 12 1.8-5.2L21 14Z" />
      <path d="M7.2 2.2 8 5.1" /><path d="m5.1 8-2.9-.8" />
      <path d="M14 4.1 12 6" /><path d="m6 12-1.9 2" />
    </svg>
  ),
  Database: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14a9 3 0 0 0 18 0V5" /><path d="M3 12a9 3 0 0 0 18 0" />
    </svg>
  ),
  Settings: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  UploadCloud: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  ),
  BrainCircuit: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .963L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" /><path d="M22 5h-4" />
    </svg>
  ),
  UserCheck: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </svg>
  ),
  Server: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
  ),
  FileText: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  Clock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Coins: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="9" cy="9" r="7" />
      <path d="M15 15a7 7 0 1 0 0-6" />
    </svg>
  ),
  Zap: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Warning: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  Search: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
  ),
  Target: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Mail: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  Repeat: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="m17 2 4 4-4 4" /><path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" /><path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </svg>
  ),
  Inbox: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  ),
  ScanEye: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <circle cx="12" cy="12" r="4" /><path d="m14 14 1 1" />
    </svg>
  ),
  MessageSquare: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  LogOut: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  FileStack: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 2v5h5" /><path d="M21 6v6.5c0 .8-.7 1.5-1.5 1.5h-7c-.8 0-1.5-.7-1.5-1.5v-9c0-.8.7-1.5 1.5-1.5H17l4 4z" />
      <path d="M7 8v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H15" />
      <path d="M3 12v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H11" />
    </svg>
  ),
  DatabaseBrain: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14a9 3 0 0 0 18 0V5" />
      <path d="M3 12a9 3 0 0 0 18 0" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  ),
  FolderOpen: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
    </svg>
  ),
}

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
}

// === SLIDES ===

// 1. Title Slide
function TitleSlide({ onNext }) {
  return (
    <div className="slide slide-title">
      <div className="title-content">
        <img src="/flatscouts_logo_transparent.png" alt="Flatscouts" className="title-logo" />
        <h1 className="title-claim">Der Turbo für Ihre Mandatsübergabe.</h1>
        <button className="cta-primary" onClick={onNext}>
          <span>Jetzt entdecken</span>
          <Icons.ArrowRight />
        </button>
      </div>
      <div className="glow glow-1"></div>
      <div className="glow glow-2"></div>
    </div>
  )
}

// 2. Transformation Slide – High-Level Problem → Lösung
function TransformationSlide() {
  return (
    <div className="slide slide-transformation">
      <motion.div
        className="slide-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="overline">Das Problem</span>
        <h2>300+ Seiten. Unstrukturiert. Jede Mandatsübergabe.</h2>
      </motion.div>

      <div className="slide-frame">
        <motion.img
          src="/overview2.png"
          alt="Übersicht Mandatsübergabe"
          className="slide-overview-img"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      </div>
    </div>
  )
}

// 3. Flow Slide – Animierter Prozess
function PipelineSlide() {
  const [hoveredNode, setHoveredNode] = useState(null)

  // Node positions as % – Linie, Punkt und Kreise nutzen ALLE diese Werte
  const nodes = [
    { id: 'upload', icon: 'UploadCloud', label: 'Upload', sub: 'Monster-PDF hochladen', pos: 10 },
    { id: 'ai', icon: 'BrainCircuit', label: 'Splitting & Kategorisierung', sub: 'Splitting & Kategorisierung', pos: 36, isAI: true },
    { id: 'hitl', icon: 'UserCheck', label: 'Kontrolle', sub: 'Prüfung bei Unsicherheit', pos: 63 },
    { id: 'store', icon: 'FileStack', label: 'Strukturierte Ablage', sub: 'In Ordner ablegen', pos: 90, isEnd: true },
  ]

  const tooltipData = {
    upload: {
      title: 'Upload',
      description: 'Laden Sie laufend E-Mails, PDFs und Scans hoch – alles wird zentral und sicher verarbeitet.',
      features: [
        'Zentrale Verarbeitung',
        'Sichere Speicherung',
        'Unterstützung für alle Formate',
      ],
    },
    ai: {
      title: 'Splitting & Kategorisierung',
      description: 'Die KI erkennt Inhalte automatisch und schlägt Kategorien/Benennungen vor – mit Konfidenz-Wert für jede Entscheidung.',
      features: [
        'Automatische Erkennung',
        'Konfidenz-Werte pro Entscheidung',
        'Lernfähiges System',
      ],
    },
    hitl: {
      title: 'Kontrolle',
      description: 'Dokumente mit hoher Konfidenz (Ihre definierte Schwelle) werden direkt übertragen – ohne Validierung. Bei niedriger Konfidenz validieren Sie kurz; das Tool lernt dazu.',
      features: [
        'Automatischer Transfer bei hoher Konfidenz',
        'Manuelle Validierung bei Bedarf',
        'Kontinuierliches Lernen',
      ],
    },
    store: {
      title: 'Strukturierte Ablage',
      description: 'Alles landet sicher in ERP, Filesystem und DMS – inklusive Aktualisierungen. Maximale Automatisierung bei voller Kontrolle.',
      features: [
        'Automatische Synchronisation',
        'ERP & DMS Integration',
        'Vollständige Kontrolle',
      ],
    },
  }

  const defaultShadow = '0 6px 20px rgba(0,0,0,0.08)'
  const glowShadow = '0 0 0 12px rgba(227,201,165,0.5), 0 6px 20px rgba(0,0,0,0.08)'

  return (
    <div className="slide slide-flow">
      <motion.div
        className="slide-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="overline">So funktioniert's konkret</span>
        <h2>Von der Datei zur strukturierten Ablage</h2>
      </motion.div>

      <div className="slide-frame">
      {/* Setup Bar – Einmalig, volle Breite oben */}
      <motion.div
        className="flow-setup-bar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="setup-bar-badge">1× EINMALIG</div>
        <div className="setup-bar-icon">
          <Icons.Settings />
        </div>
        <div className="setup-bar-text">
          <strong>Setup</strong>
          <span>Ordnerstruktur & Kategorien einmalig definieren</span>
        </div>
      </motion.div>

      {/* Connector */}
      <motion.div
        className="flow-connector-down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <svg width="2" height="24" viewBox="0 0 2 24">
          <line x1="1" y1="0" x2="1" y2="24" stroke="var(--secondary)" strokeWidth="2" strokeDasharray="4 3" />
        </svg>
      </motion.div>

      {/* Main Flow – Pro Mandat */}
      <motion.div
        className="flow-main"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="flow-main-badge">
          <Icons.Repeat />
          <span>PRO MANDAT</span>
        </div>

        <div className="flow-track">
          {/* SVG Linie mit Pfeilen zwischen den Nodes */}
          <motion.svg
            className="flow-line-svg"
            viewBox="0 0 1000 30"
            preserveAspectRatio="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#c8d8ca" />
                <stop offset="35%" stopColor="#88a38c" />
                <stop offset="70%" stopColor="#123c36" />
                <stop offset="100%" stopColor="#123c36" />
              </linearGradient>
              <linearGradient id="arrowGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a8bfab" />
                <stop offset="100%" stopColor="#88a38c" />
              </linearGradient>
              <linearGradient id="arrowGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#88a38c" />
                <stop offset="100%" stopColor="#1a5148" />
              </linearGradient>
              <linearGradient id="arrowGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1a5148" />
                <stop offset="100%" stopColor="#123c36" />
              </linearGradient>
            </defs>
            {/* Main line */}
            <rect x="100" y="12" width="800" height="6" rx="3" fill="url(#lineGrad)" />
            {/* Subtle glow track behind */}
            <rect x="94" y="6" width="812" height="18" rx="9" fill="rgba(136,163,140,0.06)" />
            {/* Arrow chevrons between nodes */}
            {/* Arrow 1: between Upload (10%) and KI (36%) → midpoint ~23% = 230 */}
            <path d="M 210,4 L 230,15 L 210,26" fill="none" stroke="url(#arrowGrad1)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 240,4 L 260,15 L 240,26" fill="none" stroke="url(#arrowGrad1)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
            {/* Arrow 2: between KI (36%) and Kontrolle (63%) → midpoint ~49.5% = 495 */}
            <path d="M 475,4 L 495,15 L 475,26" fill="none" stroke="url(#arrowGrad2)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 505,4 L 525,15 L 505,26" fill="none" stroke="url(#arrowGrad2)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
            {/* Arrow 3: between Kontrolle (63%) and Ablage (90%) → midpoint ~76.5% = 765 */}
            <path d="M 745,4 L 765,15 L 745,26" fill="none" stroke="url(#arrowGrad3)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 775,4 L 795,15 L 775,26" fill="none" stroke="url(#arrowGrad3)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
          </motion.svg>

          {/* Nodes – absolute positioniert mit left: X% */}
          {nodes.map((node, i) => {
            const NodeIcon = Icons[node.icon]
            const tooltip = tooltipData[node.id]
            const isHovered = hoveredNode === node.id
            return (
              <div
                key={node.id}
                className="flow-node"
                style={{ left: `${node.pos}%` }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <motion.div
                  className={`node-circle node-step-${i}`}
                  animate={{
                    scale: isHovered ? 1.18 : 1,
                    boxShadow: isHovered ? glowShadow : defaultShadow,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <NodeIcon />
                </motion.div>
                <div className="node-label">{node.label}</div>

                <AnimatePresence>
                  {isHovered && tooltip && (
                    <motion.div
                      className={`node-tooltip ${node.pos > 50 ? 'tooltip-left' : 'tooltip-right'}`}
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                      <div className="tooltip-header">
                        <div className={`tooltip-icon-dot tooltip-dot-step-${i}`}>
                          <NodeIcon />
                        </div>
                        <h4 className="tooltip-title">{tooltip.title}</h4>
                      </div>
                      <p className="tooltip-desc">{tooltip.description}</p>
                      <ul className="tooltip-features">
                        {tooltip.features.map((feat, fi) => (
                          <li key={fi}>
                            <Icons.CheckCircle />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </motion.div>
      </div>
    </div>
  )
}

// 4. Business Case - ROI Vergleichstabelle
function BusinessCaseSlide() {
  return (
    <div className="slide slide-roi">
      <motion.div
        className="slide-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="overline">Der Business Case</span>
        <h2>Profitabel ab Minute 23.</h2>
      </motion.div>

      <div className="slide-frame">
      <motion.div
        className="roi-scenario"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="scenario-badge">
          <Icons.FileText />
          <span>Das Szenario: Ein "Monster-PDF" mit <strong>300 Seiten</strong> (typische Mandatsübergabe)</span>
        </div>
      </motion.div>

      <motion.div
        className="roi-comparison"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {/* Header */}
        <div className="roi-row roi-header">
          <div className="roi-cell roi-label"></div>
          <div className="roi-cell roi-old">
            <div className="roi-column-header old">
              <Icons.X />
              <span>Ohne Automatisierung</span>
            </div>
          </div>
          <div className="roi-cell roi-new">
            <div className="roi-column-header new">
              <Icons.Check />
              <span>Mit Flatscouts</span>
            </div>
          </div>
        </div>

        {/* Row: Prozess */}
        <div className="roi-row">
          <div className="roi-cell roi-label">
            <Icons.Settings />
            <span>Der Prozess</span>
          </div>
          <div className="roi-cell roi-old">
            <p>PDF öffnen, Seiten einzeln prüfen, trennen, manuell benennen, im DMS ablegen.</p>
          </div>
          <div className="roi-cell roi-new">
            <p>Upload per Drag & Drop, KI verarbeitet, Download der fertigen Struktur.</p>
          </div>
        </div>

        {/* Row: Zeit */}
        <div className="roi-row">
          <div className="roi-cell roi-label">
            <Icons.Clock />
            <span>Zeitaufwand</span>
          </div>
          <div className="roi-cell roi-old">
            <div className="roi-value bad">3–4 Stunden</div>
            <p className="roi-note">Branchenwert: 100-200 Seiten = 2-4h</p>
          </div>
          <div className="roi-cell roi-new">
            <div className="roi-value good">5 Minuten</div>
            <p className="roi-note">Upload & kurze Wartezeit</p>
          </div>
        </div>

        {/* Row: Kosten */}
        <div className="roi-row">
          <div className="roi-cell roi-label">
            <Icons.Coins />
            <span>Kosten</span>
          </div>
          <div className="roi-cell roi-old">
            <div className="roi-value bad">CHF 240.–</div>
            <p className="roi-note">bei internem Kostensatz CHF 60-80/h</p>
          </div>
          <div className="roi-cell roi-new">
            <div className="roi-value good">CHF 30.–</div>
            <p className="roi-note">300 Seiten × CHF 0.10</p>
          </div>
        </div>

        {/* Row: Ergebnis */}
        <div className="roi-row roi-result-row">
          <div className="roi-cell roi-label">
            <Icons.Zap />
            <span>Ergebnis</span>
          </div>
          <div className="roi-cell roi-old">
            <p className="roi-conclusion bad">Teuer, fehleranfällig & blockiert Fachkraft.</p>
          </div>
          <div className="roi-cell roi-new">
            <motion.div
              className="roi-savings"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
            >
              <span className="savings-number">87%</span>
              <span className="savings-label">Kostenersparnis</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  )
}

// 5. Agenten-Ökosystem & Vision - Hub & Orbit Layout
function AgentEcosystemSlide() {
  const agents = [
    {
      id: 'mandatsubernahme',
      icon: 'FileStack',
      label: 'Mandatsübernahme',
      subtext: 'Splittet Monster-PDFs & SVIT-Mapping',
      status: 'live',
      badge: 'LIVE',
      position: { angle: -50, radius: 42 }, // Top Right
    },
    {
      id: 'posteingang',
      icon: 'Inbox',
      label: 'Posteingangs-Agent',
      subtext: 'Der tägliche "Ablagesklave" für E-Mails & Scans',
      status: 'dev',
      badge: 'IN ENTWICKLUNG',
      position: { angle: -130, radius: 42 }, // Top Left
    },
    {
      id: 'anomalie',
      icon: 'ScanEye',
      label: 'Anomalie-Erkennung',
      subtext: 'Abgleich ERP vs. Dokument (IBAN/Adressen)',
      status: 'vision',
      badge: 'Untersuchung',
      position: { angle: 0, radius: 44 }, // Right
    },
    {
      id: 'chat',
      icon: 'MessageSquare',
      label: 'Chat-Agent',
      subtext: 'Silo-übergreifende Suche (Q&A)',
      status: 'vision',
      badge: 'Untersuchung',
      position: { angle: 150, radius: 42 }, // Bottom Left
    },
    {
      id: 'mandatsabgabe',
      icon: 'LogOut',
      label: 'Mandatsabgabe',
      subtext: 'Sicherer Export & Datenfilterung',
      status: 'vision',
      badge: 'Untersuchung',
      position: { angle: 50, radius: 42 }, // Bottom Right
    },
  ]

  // Calculate position from angle and radius
  const getPosition = (angle, radius) => {
    const rad = (angle * Math.PI) / 180
    return {
      x: 50 + radius * Math.cos(rad),
      y: 50 + radius * Math.sin(rad),
    }
  }

  return (
    <div className="slide slide-ecosystem">
      <motion.div
        className="slide-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="overline">Das Agenten-Ökosystem</span>
        <h2>Vom Mandatsübernahme Assistant zum digitalen Dokumenten-Zwilling</h2>
      </motion.div>

      <div className="slide-frame">
      <div className="ecosystem-container">
        {/* SVG for connection lines – preserveAspectRatio="none" so SVG (x,y) = CSS (x%, y%) */}
        <svg className="ecosystem-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
          {agents.map((agent, i) => {
            const pos = getPosition(agent.position.angle, agent.position.radius)
            return (
              <g key={agent.id}>
                {/* Connection line from hub center to agent center */}
                <motion.line
                  x1="50"
                  y1="50"
                  x2={pos.x}
                  y2={pos.y}
                  stroke={agent.status === 'live' ? '#123c36' : agent.status === 'dev' ? '#88a38c' : '#88a38c'}
                  strokeWidth={agent.status === 'live' ? '0.4' : '0.25'}
                  strokeDasharray={agent.status === 'vision' ? '1 1' : 'none'}
                  opacity={agent.status === 'vision' ? 0.5 : 0.8}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                />
                {/* Data packet animation for live agent */}
                {agent.status === 'live' && (
                  <motion.circle
                    r="0.8"
                    fill="#e3c9a5"
                    initial={{ cx: 50, cy: 50 }}
                    animate={{
                      cx: [50, pos.x, 50],
                      cy: [50, pos.y, 50],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </g>
            )
          })}
        </svg>

        {/* Central Hub - Digitaler Zwilling */}
        <motion.div
          className="ecosystem-hub"
          style={{ x: '-50%' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <motion.div
            className="hub-circle"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icons.DatabaseBrain />
          </motion.div>
          <span className="agent-badge badge-live">LIVE</span>
          <div className="hub-label">Digitaler Dokumenten-Zwilling</div>
          <div className="hub-sub">Single Source of Truth</div>
        </motion.div>

        {/* Satellite Agents */}
        {agents.map((agent, i) => {
          const AgentIcon = Icons[agent.icon]
          const pos = getPosition(agent.position.angle, agent.position.radius)

          return (
            <motion.div
              key={agent.id}
              className={`ecosystem-agent agent-${agent.status}`}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                x: '-50%',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              whileHover={{ scale: 1.1, zIndex: 10 }}
            >
              <motion.div
                className="agent-circle"
                animate={agent.status === 'live' ? {
                  boxShadow: [
                    '0 0 0 0 rgba(227, 201, 165, 0.4)',
                    '0 0 0 10px rgba(227, 201, 165, 0)',
                  ]
                } : {}}
                transition={agent.status === 'live' ? {
                  duration: 2,
                  repeat: Infinity,
                } : {}}
              >
                <AgentIcon />
              </motion.div>
              {agent.badge && (
                <span className={`agent-badge badge-${agent.status}`}>
                  {agent.badge}
                </span>
              )}
              <div className="agent-label">{agent.label}</div>
              <div className="agent-sub">{agent.subtext}</div>
            </motion.div>
          )
        })}
      </div>

      {/* Legend */}
      <motion.div
        className="ecosystem-legend"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <div className="legend-item legend-live">
          <span className="legend-dot"></span>
          <span>Produktiv</span>
        </div>
        <div className="legend-item legend-dev">
          <span className="legend-dot"></span>
          <span>In Entwicklung</span>
        </div>
        <div className="legend-item legend-vision">
          <span className="legend-dot"></span>
          <span>Roadmap</span>
        </div>
      </motion.div>
      </div>
    </div>
  )
}

// 6. CTA Slide
function CTASlide() {
  return (
    <div className="slide slide-cta">
      <div className="slide-frame">
      <motion.div
        className="cta-content"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="cta-icon"
          animate={{
            boxShadow: [
              '0 16px 40px rgba(212, 168, 83, 0.3)',
              '0 16px 60px rgba(212, 168, 83, 0.5)',
              '0 16px 40px rgba(212, 168, 83, 0.3)',
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Icons.Target />
        </motion.div>
        <h2 className="cta-headline">Testen Sie uns mit Ihrem schlimmsten PDF.</h2>
        <p className="cta-subtext">
          Wir bearbeiten eine Test-Liegenschaft für Sie, um die Qualität der Strukturierung zu beweisen.
        </p>
        <motion.button
          className="cta-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Icons.Mail />
          <span>Kontakt aufnehmen</span>
        </motion.button>
      </motion.div>
      </div>
      <div className="glow glow-3"></div>
    </div>
  )
}

// Navigation
function NavDots({ current, total, goTo }) {
  return (
    <div className="nav-dots">
      {Array.from({ length: total }).map((_, i) => (
        <button key={i} className={`dot ${i === current ? 'active' : ''}`} onClick={() => goTo(i)} />
      ))}
    </div>
  )
}

// App
function App() {
  const [slide, setSlide] = useState(0)
  const slides = [TitleSlide, TransformationSlide, PipelineSlide, BusinessCaseSlide, AgentEcosystemSlide, CTASlide]
  const total = slides.length

  const next = () => setSlide(s => Math.min(s + 1, total - 1))
  const prev = () => setSlide(s => Math.max(s - 1, 0))
  const goTo = (i) => setSlide(i)

  const CurrentSlide = slides[slide]

  return (
    <div className="presentation">
      <div className="slides-viewport">
        <CurrentSlide onNext={next} />
      </div>

      {slide > 0 && (
        <nav className="slide-nav">
          <button className="nav-arrow" onClick={prev} disabled={slide === 0}>
            <Icons.ArrowLeft />
          </button>
          <NavDots current={slide} total={total} goTo={goTo} />
          <button className="nav-arrow" onClick={next} disabled={slide === total - 1}>
            <Icons.ArrowRight />
          </button>
        </nav>
      )}

      <footer className="pres-footer">
        <span>Flatscouts 2025</span>
        <span>Schweizer Hosting</span>
      </footer>
    </div>
  )
}

export default App
