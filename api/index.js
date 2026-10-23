const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory persistent demo store for serverless environment
let tasks = [
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

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const { title, description, priority, cognitive_weight, assignee, tags, subtasks } = req.body;
  const newTask = {
    id: Date.now(),
    title: title || 'Untitled Task',
    description: description || '',
    status: 'backlog',
    priority: priority || 'medium',
    cognitive_weight: Number(cognitive_weight) || 2,
    assignee: assignee || 'General Team',
    tags: tags || '',
    created_at: new Date().toISOString(),
    subtasks: Array.isArray(subtasks)
      ? subtasks.map((st, i) => ({
          id: Date.now() + i + 1,
          title: typeof st === 'string' ? st : st.title,
          is_completed: false
        }))
      : []
  };
  tasks.unshift(newTask);
  res.status(201).json({ id: newTask.id, message: 'Created successfully' });
});

app.put('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });

  const { title, description, priority, cognitive_weight, assignee, status, subtasks, tags } = req.body;
  tasks[index] = {
    ...tasks[index],
    title: title !== undefined ? title : tasks[index].title,
    description: description !== undefined ? description : tasks[index].description,
    priority: priority !== undefined ? priority : tasks[index].priority,
    cognitive_weight: cognitive_weight !== undefined ? Number(cognitive_weight) : tasks[index].cognitive_weight,
    assignee: assignee !== undefined ? assignee : tasks[index].assignee,
    status: status !== undefined ? status : tasks[index].status,
    tags: tags !== undefined ? tags : tasks[index].tags,
    subtasks: Array.isArray(subtasks)
      ? subtasks.map((st, i) => ({
          id: st.id || Date.now() + i,
          title: typeof st === 'string' ? st : st.title,
          is_completed: typeof st === 'object' ? Boolean(st.is_completed) : false
        }))
      : tasks[index].subtasks
  };
  res.json({ message: 'Updated successfully' });
});

app.patch('/api/tasks/:id/status', (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  task.status = req.body.status;
  res.json({ message: 'Status updated' });
});

app.patch('/api/subtasks/:id/toggle', (req, res) => {
  const subtaskId = Number(req.params.id);
  let toggled = false;
  tasks.forEach(t => {
    (t.subtasks || []).forEach(st => {
      if (st.id === subtaskId) {
        st.is_completed = !st.is_completed;
        toggled = true;
      }
    });
  });
  if (toggled) res.json({ message: 'Subtask toggled' });
  else res.status(404).json({ error: 'Subtask not found' });
});

app.delete('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.json({ message: 'Deleted successfully' });
});

// Export default app for Vercel Serverless Function
module.exports = app;
