import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Play, Pause, RotateCcw, CheckCircle2, Clock, 
  ListFilter, LayoutGrid, Orbit, Plus, Flame, ShieldAlert, 
  Trash2, Edit3, Copy, X, User, Tag, Zap, AlertTriangle, 
  Activity, Radio, Compass, Layers, ShieldCheck, Cpu
} from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

const DEFAULT_DEMO_TASKS = [
  {
    id: 1,
    title: 'Architect Distributed Caching Layer',
    description: 'Implement Redis master-replica cache invalidation & TTL heuristics',
    status: 'done',
    priority: 'high',
    cognitive_weight: 4,
    assignee: 'Thulasi Srinivas',
    tags: 'Backend,Redis,SystemDesign',
    subtasks: [
      { id: 101, title: 'Define cache invalidation schema', is_completed: true },
      { id: 102, title: 'Benchmark throughput with 10k concurrent req/s', is_completed: true }
    ]
  },
  {
    id: 2,
    title: 'Interactive Constellation Galaxy Engine',
    description: 'Render orbital physics, neon laser rays, and canvas particle dust',
    status: 'in_progress',
    priority: 'urgent',
    cognitive_weight: 5,
    assignee: 'Priya Sharma',
    tags: 'Frontend,Canvas,Physics',
    subtasks: [
      { id: 201, title: 'Initialize canvas context & DPI scaling', is_completed: true },
      { id: 202, title: 'Compute orbital angular momentum paths', is_completed: true },
      { id: 203, title: 'Inject neon bloom shaders & stardust trails', is_completed: false }
    ]
  },
  {
    id: 3,
    title: 'Cognitive Burnout Prevention Calculator',
    description: 'Algorithmic friction scoring tracking deep-work cognitive saturation',
    status: 'review',
    priority: 'medium',
    cognitive_weight: 3,
    assignee: 'Alex Chen',
    tags: 'Algorithm,Metrics',
    subtasks: [
      { id: 301, title: 'Derive cognitive friction formula', is_completed: true },
      { id: 302, title: 'Wire reactive UI saturation warning gauge', is_completed: true }
    ]
  },
  {
    id: 4,
    title: 'AI Micro-Task Decomposition Engine',
    description: 'Decompose complex tickets into structured engineering sub-deliverables',
    status: 'backlog',
    priority: 'high',
    cognitive_weight: 2,
    assignee: 'Thulasi Srinivas',
    tags: 'AI,Automation',
    subtasks: [
      { id: 401, title: 'Draft schema generation prompts', is_completed: false },
      { id: 402, title: 'Wire dynamic creation modal pipeline', is_completed: false }
    ]
  }
];

export default function App() {
  const [tasks, setTasks] = useState(DEFAULT_DEMO_TASKS);
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban', 'table', 'constellation'
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterAssignee, setFilterAssignee] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pomodoro Focus Tracker
  const [activePomodoroTask, setActivePomodoroTask] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState('work');

  // Task Modal (Handles both Create and Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formPriority, setFormPriority] = useState('medium');
  const [formWeight, setFormWeight] = useState(2);
  const [formAssignee, setFormAssignee] = useState('');
  const [formStatus, setFormStatus] = useState('backlog');
  const [formTags, setFormTags] = useState('');
  const [customSubtaskInput, setCustomSubtaskInput] = useState('');
  const [formSubtasks, setFormSubtasks] = useState([]);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  // Supernova Animation Burst State
  const [burstCoords, setBurstCoords] = useState(null);

  const canvasRef = useRef(null);
  const bgCanvasRef = useRef(null);

  // Fetch from backend
  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_BASE}/tasks`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) setTasks(data);
      }
    } catch {
      // Local state preserved
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // HYPER-ANIMATED COSMIC AURORA & INTERACTIVE PARTICLE CANVAS
  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Mouse coordinates tracker for gravity physics
    const mouse = { x: -1000, y: -1000, radius: 140 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Starfield particles with mass and inertia
    const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 10000);
    const particles = Array.from({ length: Math.min(130, Math.max(70, particleCount)) }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      baseX: 0,
      baseY: 0,
      radius: Math.random() * 2.2 + 0.8,
      vx: (Math.random() - 0.5) * 0.65,
      vy: (Math.random() - 0.5) * 0.65,
      color: ['#38bdf8', '#818cf8', '#c084fc', '#34d399', '#f472b6'][Math.floor(Math.random() * 5)],
      alpha: Math.random() * 0.6 + 0.3,
      pulseSpeed: Math.random() * 0.03 + 0.01
    }));

    // Shooting meteors pool
    const meteors = [];
    const spawnMeteor = () => {
      if (meteors.length < 3 && Math.random() < 0.02) {
        meteors.push({
          x: Math.random() * canvas.width * 0.8,
          y: Math.random() * canvas.height * 0.4,
          length: Math.random() * 80 + 50,
          speed: Math.random() * 8 + 6,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
          opacity: 1
        });
      }
    };

    let t = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Triple-Phase Radiant Nebula Aurora Waves
      const cx1 = canvas.width * 0.25 + Math.sin(t * 0.0012) * 180;
      const cy1 = canvas.height * 0.35 + Math.cos(t * 0.0015) * 140;
      const grad1 = ctx.createRadialGradient(cx1, cy1, 40, cx1, cy1, 650);
      grad1.addColorStop(0, 'rgba(14, 165, 233, 0.16)');
      grad1.addColorStop(0.5, 'rgba(99, 102, 241, 0.08)');
      grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx2 = canvas.width * 0.75 + Math.cos(t * 0.001) * 200;
      const cy2 = canvas.height * 0.65 + Math.sin(t * 0.0013) * 160;
      const grad2 = ctx.createRadialGradient(cx2, cy2, 50, cx2, cy2, 700);
      grad2.addColorStop(0, 'rgba(168, 85, 247, 0.16)');
      grad2.addColorStop(0.5, 'rgba(236, 72, 153, 0.07)');
      grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx3 = canvas.width * 0.5 + Math.sin(t * 0.0008) * 150;
      const cy3 = canvas.height * 0.85 + Math.cos(t * 0.0011) * 110;
      const grad3 = ctx.createRadialGradient(cx3, cy3, 30, cx3, cy3, 500);
      grad3.addColorStop(0, 'rgba(16, 185, 129, 0.12)');
      grad3.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad3;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Render & Update Meteors
      spawnMeteor();
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        const tailX = m.x - Math.cos(m.angle) * m.length;
        const tailY = m.y - Math.sin(m.angle) * m.length;

        const meteorGrad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        meteorGrad.addColorStop(0, `rgba(255, 255, 255, ${m.opacity})`);
        meteorGrad.addColorStop(0.3, `rgba(56, 189, 248, ${m.opacity * 0.8})`);
        meteorGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = meteorGrad;
        ctx.lineWidth = 2;
        ctx.stroke();

        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.opacity -= 0.015;

        if (m.opacity <= 0 || m.x > canvas.width || m.y > canvas.height) {
          meteors.splice(i, 1);
        }
      }

      // 3. Update & Draw Particles with Proximity Interlinks
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Cursor interactive repulsion
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = (dx / distance) * force * 5;
          const directionY = (dy / distance) * force * 5;
          p.x -= directionX;
          p.y -= directionY;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw star particle
        const currentAlpha = p.alpha + Math.sin(t * p.pulseSpeed) * 0.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, currentAlpha));
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;

        // Connect nearby stars with luminous filaments
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 110) * 0.22;
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }
        }
      }

      t += 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Web Audio Synth
  const playSoundEffect = (type = 'chime') => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === 'supernova') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.45);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.7);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.8);
      }
    } catch {}
  };

  // Pomodoro Countdown
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds(prev => prev - 1), 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
      playSoundEffect('chime');
      alert(`Pomodoro cycle complete for: ${activePomodoroTask ? activePomodoroTask.title : 'Focus Session'}!`);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, activePomodoroTask]);

  const setFocusDuration = (minutes, mode) => {
    setTimerMode(mode);
    setTimerSeconds(minutes * 60);
    setIsTimerRunning(false);
  };

  // High-Brightness Constellation Canvas
  useEffect(() => {
    if (viewMode !== 'constellation' || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const stars = Array.from({ length: 120 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2.2 + 0.5,
      alpha: Math.random() * 0.85 + 0.15,
      velocity: Math.random() * 0.35 + 0.1,
      color: ['#38bdf8', '#818cf8', '#c084fc', '#ffffff'][Math.floor(Math.random() * 4)]
    }));

    let angle = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      stars.forEach(st => {
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.radius, 0, Math.PI * 2);
        ctx.fillStyle = st.color;
        ctx.globalAlpha = st.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = st.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;

        st.y += st.velocity;
        if (st.y > canvas.height) st.y = 0;
      });

      [110, 190, 275].forEach((radius, i) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.2 + i * 0.08})`;
        ctx.lineWidth = 1.6;
        ctx.setLineDash([8, 10]);
        ctx.shadowBlur = 14;
        ctx.shadowColor = '#38bdf8';
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.setLineDash([]);
      });

      const pulseSize = 42 + Math.sin(angle * 0.05) * 4;
      const coreHalo = ctx.createRadialGradient(centerX, centerY, 6, centerX, centerY, pulseSize);
      coreHalo.addColorStop(0, '#ffffff');
      coreHalo.addColorStop(0.2, '#38bdf8');
      coreHalo.addColorStop(0.6, 'rgba(14, 165, 233, 0.45)');
      coreHalo.addColorStop(1, 'rgba(2, 132, 199, 0)');

      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2);
      ctx.fillStyle = coreHalo;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 18, 0, Math.PI * 2);
      ctx.fillStyle = '#0284c7';
      ctx.shadowBlur = 24;
      ctx.shadowColor = '#38bdf8';
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('CORE', centerX, centerY + 3.5);

      tasks.forEach((task, idx) => {
        const orbitRadius = 110 + (idx % 3) * 82;
        const speed = 0.0028 * ((idx % 3) + 1.2);
        const nodeAngle = angle * speed + (idx * (Math.PI * 2 / (tasks.length || 1)));

        const x = centerX + Math.cos(nodeAngle) * orbitRadius;
        const y = centerY + Math.sin(nodeAngle) * orbitRadius;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = task.status === 'done' 
          ? 'rgba(74, 222, 128, 0.45)' 
          : task.status === 'in_progress' 
          ? 'rgba(245, 158, 11, 0.4)' 
          : 'rgba(148, 163, 184, 0.18)';
        ctx.lineWidth = task.status === 'done' ? 2 : 1.2;
        ctx.stroke();

        const radius = 11 + (task.cognitive_weight || 1) * 2.8;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);

        let glowColor = '#64748b';
        let fillColor = '#475569';
        if (task.status === 'done') {
          glowColor = '#4ade80';
          fillColor = '#22c55e';
        } else if (task.status === 'in_progress') {
          glowColor = '#fbbf24';
          fillColor = '#f59e0b';
        } else if (task.status === 'review') {
          glowColor = '#c084fc';
          fillColor = '#a855f7';
        }

        ctx.fillStyle = fillColor;
        ctx.shadowBlur = 22;
        ctx.shadowColor = glowColor;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(x, y, radius + 3, 0, Math.PI * 2);
        ctx.strokeStyle = glowColor;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(task.title.substring(0, 18) + (task.title.length > 18 ? '..' : ''), x, y - radius - 8);

        ctx.fillStyle = glowColor;
        ctx.font = '9px monospace';
        ctx.fillText(`• ${task.assignee || 'Team'} •`, x, y + radius + 14);
      });

      angle += 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [viewMode, tasks]);

  // AI Task Breakdown
  const handleAIBreakdown = () => {
    if (!formTitle.trim()) return;
    setIsGeneratingAI(true);
    setTimeout(() => {
      setFormDesc(`Architectural deliverables, schema specifications, and acceptance testing for: ${formTitle}`);
      setFormSubtasks([
        `Establish domain models & relational schema for ${formTitle}`,
        `Implement reactive controller logic & handle edge cases`,
        `Stress test database throughput & run integration specs`
      ]);
      setFormWeight(3);
      if (!formTags) setFormTags('Feature,AI-Generated');
      setIsGeneratingAI(false);
      playSoundEffect('chime');
    }, 400);
  };

  const handleOpenCreateModal = () => {
    setEditingTaskId(null);
    setFormTitle('');
    setFormDesc('');
    setFormPriority('medium');
    setFormWeight(2);
    setFormAssignee('');
    setFormStatus('backlog');
    setFormTags('');
    setFormSubtasks([]);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTaskId(task.id);
    setFormTitle(task.title);
    setFormDesc(task.description || '');
    setFormPriority(task.priority);
    setFormWeight(task.cognitive_weight || 2);
    setFormAssignee(task.assignee || '');
    setFormStatus(task.status);
    setFormTags(task.tags || '');
    setFormSubtasks(task.subtasks ? task.subtasks.map(s => typeof s === 'string' ? s : s.title) : []);
    setIsModalOpen(true);
  };

  const handleForkTask = async (task) => {
    const forkedTask = {
      title: `${task.title} (Fork)`,
      description: task.description,
      priority: task.priority,
      cognitive_weight: task.cognitive_weight,
      assignee: task.assignee,
      tags: task.tags ? `${task.tags},Fork` : 'Fork',
      status: 'backlog',
      subtasks: task.subtasks ? task.subtasks.map(s => typeof s === 'string' ? s : s.title) : []
    };

    try {
      const res = await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(forkedTask)
      });
      if (res.ok) fetchTasks();
    } catch {
      setTasks([{ ...forkedTask, id: Date.now() }, ...tasks]);
    }
    playSoundEffect('chime');
  };

  const handleAddCustomSubtask = (e) => {
    e.preventDefault();
    if (!customSubtaskInput.trim()) return;
    setFormSubtasks([...formSubtasks, customSubtaskInput.trim()]);
    setCustomSubtaskInput('');
  };

  const handleRemoveSubtask = (idx) => {
    setFormSubtasks(formSubtasks.filter((_, i) => i !== idx));
  };

  const handleSaveTask = async (e) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const payload = {
      title: formTitle.trim(),
      description: formDesc.trim(),
      priority: formPriority,
      cognitive_weight: Number(formWeight),
      assignee: formAssignee.trim() || 'General Team',
      status: formStatus,
      tags: formTags.trim(),
      subtasks: formSubtasks
    };

    if (editingTaskId) {
      setTasks(prev => prev.map(t => t.id === editingTaskId ? { 
        ...t, 
        ...payload, 
        subtasks: formSubtasks.map((st, i) => ({ id: Date.now() + i, title: st, is_completed: false })) 
      } : t));

      try {
        await fetch(`${API_BASE}/tasks/${editingTaskId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        fetchTasks();
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const res = await fetch(`${API_BASE}/tasks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) fetchTasks();
      } catch {
        setTasks([{ id: Date.now(), ...payload, subtasks: [] }, ...tasks]);
      }
    }

    setIsModalOpen(false);
  };

  const handleStatusChange = async (taskId, newStatus, event = null) => {
    if (newStatus === 'done') {
      playSoundEffect('supernova');
      if (event) {
        const rect = event.target.getBoundingClientRect();
        setBurstCoords({ x: rect.left, y: rect.top });
        setTimeout(() => setBurstCoords(null), 1000);
      }
    }

    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    try {
      await fetch(`${API_BASE}/tasks/${taskId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleSubtask = async (taskId, subtaskId) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t;
      return {
        ...t,
        subtasks: (t.subtasks || []).map(s => s.id === subtaskId ? { ...s, is_completed: !s.is_completed } : s)
      };
    }));
    try {
      await fetch(`${API_BASE}/subtasks/${subtaskId}/toggle`, { method: 'PATCH' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Delete this task?')) return;
    setTasks(prev => prev.filter(t => t.id !== taskId));
    if (activePomodoroTask?.id === taskId) {
      setActivePomodoroTask(null);
      setIsTimerRunning(false);
    }
    try {
      await fetch(`${API_BASE}/tasks/${taskId}`, { method: 'DELETE' });
    } catch (err) {
      console.error(err);
    }
  };

  // Metrics
  const activeUnfinishedTasks = tasks.filter(t => t.status !== 'done');
  const totalCognitiveScore = activeUnfinishedTasks.reduce((acc, t) => acc + (t.cognitive_weight || 1), 0);
  const completedCount = tasks.filter(t => t.status === 'done').length;
  const completionPercentage = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;
  const knownAssignees = Array.from(new Set(tasks.map(t => t.assignee).filter(Boolean)));

  const filteredTasks = tasks.filter(t => {
    const matchesPriority = filterPriority === 'all' || t.priority === filterPriority;
    const matchesAssignee = filterAssignee === 'all' || t.assignee === filterAssignee;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (t.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (t.tags || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (t.assignee || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPriority && matchesAssignee && matchesSearch;
  });

  const getAvatarBadge = (name = 'Team') => {
    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    const colors = ['bg-sky-500', 'bg-indigo-500', 'bg-purple-500', 'bg-emerald-500', 'bg-amber-500'];
    const color = colors[name.charCodeAt(0) % colors.length];
    return { initials, color };
  };

  return (
    <div className="min-h-screen bg-[#070A0F] text-slate-200 flex flex-col font-sans relative selection:bg-sky-500 selection:text-white overflow-x-hidden">
      {/* 1. Moving Aurora & Cosmos Background Canvas */}
      <canvas 
        ref={bgCanvasRef} 
        className="fixed inset-0 pointer-events-none z-0" 
      />

      {/* Supernova Particle Burst */}
      {burstCoords && (
        <div 
          className="fixed pointer-events-none z-50 animate-ping rounded-full border-4 border-emerald-400 bg-emerald-500/30 shadow-2xl shadow-emerald-400"
          style={{ left: burstCoords.x - 30, top: burstCoords.y - 30, width: 80, height: 80 }}
        />
      )}

      {/* 2. Top-Level Futuristic Navigation Bar */}
      <nav className="relative z-30 border-b border-sky-500/20 bg-[#0B0F17]/85 backdrop-blur-2xl px-6 py-3 shadow-2xl flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Holographic Gyroscope Logo */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500/25 via-indigo-600/30 to-purple-600/25 border border-sky-400/40 shadow-lg shadow-sky-500/20 group-hover:scale-105 transition duration-300">
              <Orbit className="w-5 h-5 text-sky-400 animate-spin" style={{ animationDuration: '9s' }} />
              <div className="absolute w-2 h-2 rounded-full bg-sky-300 shadow-md shadow-sky-400 animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-wider text-white bg-gradient-to-r from-sky-400 via-indigo-200 to-purple-400 bg-clip-text text-transparent">
                  TASKFLOW
                </span>
                <span className="text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full border border-sky-400/30">
                  PULSE
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Bar Shortcuts */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
            <button 
              onClick={() => setViewMode('kanban')} 
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${viewMode === 'kanban' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' : 'text-slate-400 hover:text-white'}`}>
              <LayoutGrid className="w-3.5 h-3.5" /> Workspace
            </button>
            <button 
              onClick={() => setViewMode('constellation')} 
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${viewMode === 'constellation' ? 'bg-gradient-to-r from-sky-500/20 to-purple-500/20 text-purple-300 border border-purple-500/40' : 'text-slate-400 hover:text-white'}`}>
              <Orbit className="w-3.5 h-3.5" /> Constellation View
            </button>
            <button 
              onClick={() => setViewMode('table')} 
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${viewMode === 'table' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' : 'text-slate-400 hover:text-white'}`}>
              <ListFilter className="w-3.5 h-3.5" /> Data Grid
            </button>
          </div>
        </div>

        {/* Real-time Status Beacon & Action */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-medium">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Database Synchronized</span>
          </div>

          <button 
            onClick={handleOpenCreateModal}
            className="flex items-center gap-2 bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:to-purple-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-lg shadow-sky-500/25 active:scale-95 border border-sky-400/30">
            <Plus className="w-4 h-4" /> New Sprint Task
          </button>
        </div>
      </nav>

      {/* 3. Real-Time Metrics & Cognitive Health Strip */}
      <section className="relative z-10 px-6 py-4 grid grid-cols-1 md:grid-cols-4 gap-4 border-b border-slate-800/60 bg-[#090D14]/70 backdrop-blur-md">
        <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl flex items-center justify-between hover:border-slate-700 transition">
          <div>
            <p className="text-xs text-slate-400 font-medium">Sprint Completion Rate</p>
            <h4 className="text-2xl font-bold text-white mt-1">{completionPercentage}%</h4>
            <span className="text-[11px] text-slate-500">{completedCount} of {tasks.length} resolved</span>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl shadow-inner">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl flex items-center justify-between hover:border-slate-700 transition">
          <div>
            <p className="text-xs text-slate-400 font-medium">Active Pipeline</p>
            <h4 className="text-2xl font-bold text-white mt-1">
              {tasks.filter(t => t.status === 'in_progress').length} <span className="text-xs text-slate-500 font-normal">active</span>
            </h4>
            <span className="text-[11px] text-slate-500">{tasks.filter(t => t.status === 'review').length} awaiting review</span>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl shadow-inner">
            <Flame className="w-5 h-5" />
          </div>
        </div>

        {/* Cognitive Friction Score & Overload Preventer */}
        <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl col-span-2 flex flex-col justify-between hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className={`w-4 h-4 ${totalCognitiveScore > 12 ? 'text-rose-400 animate-bounce' : 'text-sky-400'}`} />
              <p className="text-xs text-slate-200 font-semibold">Cognitive Friction Budget</p>
            </div>
            <span className="text-xs font-mono font-medium text-slate-400">
              {totalCognitiveScore} / 16 Points Capacity
            </span>
          </div>
          <div className="w-full bg-slate-800/90 h-2.5 rounded-full overflow-hidden mt-3">
            <div 
              className={`h-full transition-all duration-700 ${
                totalCognitiveScore > 12 
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500' 
                  : totalCognitiveScore > 8 
                  ? 'bg-gradient-to-r from-sky-500 to-amber-500' 
                  : 'bg-gradient-to-r from-sky-500 to-indigo-500'
              }`}
              style={{ width: `${Math.min(100, (totalCognitiveScore / 16) * 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5">
            {totalCognitiveScore > 12 ? (
              <span className="text-rose-400 font-medium flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> High friction: defer new tickets to maintain code quality.
              </span>
            ) : (
              <span className="text-slate-400">
                ✨ Balanced workload: capacity available for deep architectural focus.
              </span>
            )}
          </p>
        </div>
      </section>

      {/* 4. Main Interactive Workspace */}
      <main className="relative z-10 flex-1 p-6 overflow-hidden flex flex-col">
        {/* Workspace Toolbar & Pomodoro Chamber */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <input 
              type="text" 
              placeholder="Search by title, tag, assignee..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 w-64 transition backdrop-blur-md"
            />
            <select 
              value={filterPriority} 
              onChange={(e) => setFilterPriority(e.target.value)}
              className="bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-sky-500">
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select 
              value={filterAssignee} 
              onChange={(e) => setFilterAssignee(e.target.value)}
              className="bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-sky-500">
              <option value="all">All Assignees</option>
              {knownAssignees.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          {/* Docked Focus Pomodoro Bar */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-slate-900/95 via-indigo-950/90 to-purple-950/80 border border-indigo-500/40 px-4 py-2 rounded-2xl shadow-xl shadow-indigo-950/30 backdrop-blur-lg">
            <div className="flex items-center gap-1.5 border-r border-slate-800 pr-3">
              <button 
                onClick={() => setFocusDuration(25, 'work')} 
                className={`text-[10px] px-2.5 py-1 rounded-lg font-medium transition ${timerMode === 'work' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}>
                Focus 25m
              </button>
              <button 
                onClick={() => setFocusDuration(5, 'shortBreak')} 
                className={`text-[10px] px-2.5 py-1 rounded-lg font-medium transition ${timerMode === 'shortBreak' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}>
                Break 5m
              </button>
            </div>

            <Clock className={`w-4 h-4 ${isTimerRunning ? 'text-indigo-400 animate-pulse' : 'text-slate-500'}`} />
            
            <div className="text-xs">
              <span className="text-slate-300 font-semibold max-w-[130px] truncate inline-block align-bottom">
                {activePomodoroTask ? activePomodoroTask.title : 'Focus Session'}
              </span>
              <span className="font-mono text-indigo-400 ml-2 font-bold text-sm">
                {Math.floor(timerSeconds / 60)}:{('0' + (timerSeconds % 60)).slice(-2)}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button 
                onClick={() => setIsTimerRunning(!isTimerRunning)} 
                className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-sm">
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button 
                onClick={() => { setIsTimerRunning(false); setTimerSeconds(timerMode === 'shortBreak' ? 5 * 60 : 25 * 60); }} 
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition">
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Perspective 1: Kanban Board */}
        {viewMode === 'kanban' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 flex-1 overflow-y-auto pr-1">
            {['backlog', 'in_progress', 'review', 'done'].map((columnKey) => {
              const colTasks = filteredTasks.filter(t => t.status === columnKey);
              return (
                <div key={columnKey} className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-4 flex flex-col backdrop-blur-md">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        columnKey === 'done' ? 'bg-emerald-400 shadow-sm shadow-emerald-400' :
                        columnKey === 'in_progress' ? 'bg-amber-400 shadow-sm shadow-amber-400' :
                        columnKey === 'review' ? 'bg-purple-400 shadow-sm shadow-purple-400' : 'bg-slate-500'
                      }`} />
                      {columnKey.replace('_', ' ')}
                    </h3>
                    <span className="text-xs font-mono bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
                      {colTasks.length}
                    </span>
                  </div>

                  <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                    {colTasks.map(task => {
                      const completedSubtasks = (task.subtasks || []).filter(s => s.is_completed).length;
                      const progressPct = task.subtasks?.length ? Math.round((completedSubtasks / task.subtasks.length) * 100) : 0;
                      const badge = getAvatarBadge(task.assignee);

                      return (
                        <div 
                          key={task.id} 
                          className="bg-slate-900/85 border border-slate-800/90 hover:border-sky-500/50 p-4 rounded-2xl shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/10 group backdrop-blur-sm">
                          {/* Card Header & Actions */}
                          <div className="flex items-start justify-between gap-2">
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                              task.priority === 'urgent' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                              task.priority === 'high' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                              'bg-slate-800 text-slate-400'
                            }`}>
                              {task.priority}
                            </span>
                            <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition">
                              <button 
                                title="Edit Task"
                                onClick={() => handleOpenEditModal(task)}
                                className="text-slate-400 hover:text-sky-400 p-1 transition">
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                title="Duplicate / Fork"
                                onClick={() => handleForkTask(task)}
                                className="text-slate-400 hover:text-indigo-400 p-1 transition">
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                title="Dock into Pomodoro Timer"
                                onClick={() => {
                                  setActivePomodoroTask(task);
                                  setTimerSeconds(25 * 60);
                                  setIsTimerRunning(true);
                                }} 
                                className="text-slate-400 hover:text-emerald-400 p-1 transition">
                                <Clock className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                title="Delete Task"
                                onClick={() => handleDeleteTask(task.id)}
                                className="text-slate-400 hover:text-rose-400 p-1 transition">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <h4 className="text-sm font-semibold text-slate-100 mt-2">{task.title}</h4>
                          {task.description && (
                            <p className="text-xs text-slate-400 mt-1 line-clamp-2">{task.description}</p>
                          )}

                          {/* Tags */}
                          {task.tags && (
                            <div className="flex items-center gap-1 mt-2.5 flex-wrap">
                              {task.tags.split(',').map((t, idx) => (
                                <span key={idx} className="text-[10px] bg-slate-800/80 text-sky-400/90 px-1.5 py-0.5 rounded border border-slate-700/60 font-mono">
                                  #{t.trim()}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Interactive Subtasks Checklist */}
                          {task.subtasks && task.subtasks.length > 0 && (
                            <div className="mt-3">
                              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                                <span>Checklist</span>
                                <span className="font-mono">{completedSubtasks}/{task.subtasks.length} ({progressPct}%)</span>
                              </div>
                              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full transition-all" style={{ width: `${progressPct}%` }} />
                              </div>
                              <div className="mt-2 space-y-1 max-h-24 overflow-y-auto">
                                {task.subtasks.map(st => (
                                  <label key={st.id} className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 cursor-pointer">
                                    <input 
                                      type="checkbox" 
                                      checked={Boolean(st.is_completed)} 
                                      onChange={() => handleToggleSubtask(task.id, st.id)}
                                      className="rounded bg-slate-800 border-slate-700 text-sky-500 focus:ring-0"
                                    />
                                    <span className={st.is_completed ? 'line-through text-slate-500' : ''}>{st.title}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Card Footer with Custom Dynamic Avatar Badge */}
                          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className={`w-5 h-5 rounded-full ${badge.color} text-[10px] font-bold text-white flex items-center justify-center shadow-sm`}>
                                {badge.initials}
                              </span>
                              <span className="text-[11px] text-slate-400 font-medium">
                                {task.assignee || 'General Team'}
                              </span>
                            </div>
                            <select 
                              value={task.status} 
                              onChange={(e) => handleStatusChange(task.id, e.target.value, e)}
                              className="text-[10px] bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-slate-300 focus:outline-none focus:border-sky-500">
                              <option value="backlog">Backlog</option>
                              <option value="in_progress">In Progress</option>
                              <option value="review">Review</option>
                              <option value="done">Done</option>
                            </select>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Perspective 2: High-Density Table View */}
        {viewMode === 'table' && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl backdrop-blur-md">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800/60 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Title</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Priority</th>
                  <th className="p-3.5">Cognitive Friction</th>
                  <th className="p-3.5">Assignee</th>
                  <th className="p-3.5">Tags</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredTasks.map(t => (
                  <tr key={t.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-3.5 font-medium text-slate-200">{t.title}</td>
                    <td className="p-3.5">
                      <span className="font-mono uppercase text-[10px] px-2 py-0.5 bg-slate-800 rounded text-slate-300">
                        {t.status}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className={`text-[10px] uppercase font-bold ${t.priority === 'urgent' ? 'text-rose-400' : 'text-slate-400'}`}>
                        {t.priority}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono">{t.cognitive_weight} / 5</td>
                    <td className="p-3.5 text-slate-300">{t.assignee}</td>
                    <td className="p-3.5 text-slate-400 font-mono text-[10px]">{t.tags || '-'}</td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <select 
                          value={t.status} 
                          onChange={(e) => handleStatusChange(t.id, e.target.value, e)}
                          className="bg-slate-800 border border-slate-700 rounded-lg text-xs px-2 py-1 text-slate-300">
                          <option value="backlog">Backlog</option>
                          <option value="in_progress">In Progress</option>
                          <option value="review">Review</option>
                          <option value="done">Done</option>
                        </select>
                        <button onClick={() => handleOpenEditModal(t)} className="text-slate-400 hover:text-sky-400 p-1">
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDeleteTask(t.id)} className="text-slate-400 hover:text-rose-400 p-1">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Perspective 3: High-Brightness Constellation Galaxy View */}
        {viewMode === 'constellation' && (
          <div className="flex-1 bg-gradient-to-b from-[#05070D] via-[#080D1A] to-[#0A1224] border border-sky-500/25 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden shadow-2xl backdrop-blur-md">
            <div className="absolute top-4 left-4 z-10 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-sky-500/30 text-xs text-slate-300 shadow-xl">
              <p className="font-bold text-white flex items-center gap-2">
                <Orbit className="w-4 h-4 text-sky-400 animate-spin" style={{ animationDuration: '10s' }} /> High-Luminance Constellation Engine
              </p>
              <div className="flex items-center gap-3.5 mt-2.5 text-[11px]">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-md shadow-emerald-400" /> Done</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-md shadow-amber-400" /> In Progress</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-md shadow-purple-400" /> Review</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-500" /> Backlog</span>
              </div>
            </div>
            <canvas ref={canvasRef} width={920} height={550} className="w-full h-full cursor-grab active:cursor-grabbing" />
          </div>
        )}
      </main>

      {/* Unified Create & Edit Task Modal with AI Breakdown */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0D131F] border border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                {editingTaskId ? <Edit3 className="w-4 h-4 text-sky-400" /> : <Sparkles className="w-4 h-4 text-sky-400" />}
                {editingTaskId ? 'Edit Sprint Task' : 'Create Custom Sprint Task'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveTask} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Task Title *</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g., Implement Distributed Cache Invalidation"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
                  />
                  <button 
                    type="button" 
                    onClick={handleAIBreakdown}
                    disabled={isGeneratingAI}
                    className="bg-sky-500/10 border border-sky-500/30 hover:bg-sky-500/20 text-sky-400 text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 transition">
                    <Sparkles className={`w-3.5 h-3.5 ${isGeneratingAI ? 'animate-spin' : ''}`} />
                    {isGeneratingAI ? 'Generating...' : 'AI Breakdown'}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Description / Deliverables</label>
                <textarea 
                  rows="2"
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Key context, architectural specs, or acceptance criteria..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Assignee Name (Type Any Name or Role)
                </label>
                <input 
                  type="text" 
                  placeholder="e.g., Thulasi Srinivas, Tech Lead, Data Eng..."
                  value={formAssignee}
                  onChange={(e) => setFormAssignee(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
                />
                {knownAssignees.length > 0 && (
                  <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                    <span className="text-[10px] text-slate-500">Quick Select:</span>
                    {knownAssignees.map(name => (
                      <button 
                        key={name}
                        type="button" 
                        onClick={() => setFormAssignee(name)}
                        className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
                        {name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Priority</label>
                  <select 
                    value={formPriority} 
                    onChange={(e) => setFormPriority(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Friction Weight (1-5)</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="5"
                    value={formWeight}
                    onChange={(e) => setFormWeight(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Status</label>
                  <select 
                    value={formStatus} 
                    onChange={(e) => setFormStatus(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300">
                    <option value="backlog">Backlog</option>
                    <option value="in_progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Tags (Comma-separated)</label>
                <input 
                  type="text" 
                  placeholder="Backend, Security, API"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Subtasks Checklist */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Checklist Deliverables</label>
                <div className="flex gap-2 mb-2">
                  <input 
                    type="text" 
                    placeholder="Add micro-step..."
                    value={customSubtaskInput}
                    onChange={(e) => setCustomSubtaskInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleAddCustomSubtask(e); }}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
                  />
                  <button 
                    type="button" 
                    onClick={handleAddCustomSubtask}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-1.5 rounded-xl border border-slate-700">
                    Add
                  </button>
                </div>

                {formSubtasks.length > 0 && (
                  <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
                    {formSubtasks.map((st, i) => (
                      <div key={i} className="text-xs text-slate-300 bg-slate-900/80 p-2 rounded-xl border border-slate-800 flex items-center justify-between">
                        <span>• {st}</span>
                        <button type="button" onClick={() => handleRemoveSubtask(i)} className="text-slate-500 hover:text-rose-400 p-0.5">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white">
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-white rounded-xl transition shadow-lg shadow-sky-500/20">
                  {editingTaskId ? 'Save Changes' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
