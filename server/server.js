const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DB_FILE = path.join(__dirname, 'tasks.json');

// Default seed data
const DEFAULT_TASKS = [
  {
    id: 1,
    title: 'Architect System Schemas',
    description: 'Design normalized tables and relationship models',
    status: 'done',
    priority: 'high',
    cognitive_weight: 3,
    assignee: 'Alex Chen',
    tags: 'Backend',
    subtasks: [{ id: 101, title: 'Define primary keys', is_completed: true }]
  },
  {
    id: 2,
    title: 'Constellation Orbital Engine',
    description: 'Render task nodes floating on HTML5 canvas',
    status: 'in_progress',
    priority: 'urgent',
    cognitive_weight: 4,
    assignee: 'Priya Sharma',
    tags: 'Frontend',
    subtasks: [
      { id: 201, title: 'Initialize canvas context', is_completed: true },
      { id: 202, title: 'Set orbital trajectories', is_completed: false }
    ]
  },
  {
    id: 3,
    title: 'Focus Pomodoro Chime Audio',
    description: 'Synthesize Web Audio frequencies for work sessions',
    status: 'review',
    priority: 'medium',
    cognitive_weight: 2,
    assignee: 'Alex Chen',
    tags: 'Audio/UI',
    subtasks: []
  }
];

// Helper functions to read/write JSON
function readTasks() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(DEFAULT_TASKS, null, 2));
    return DEFAULT_TASKS;
  }
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return DEFAULT_TASKS;
  }
}

function saveTasks(tasks) {
  fs.writeFileSync(DB_FILE, JSON.stringify(tasks, null, 2));
}

// 1. GET ALL TASKS
app.get('/api/tasks', (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

// 2. CREATE TASK
app.post('/api/tasks', (req, res) => {
  const tasks = readTasks();
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
  saveTasks(tasks);
  res.status(201).json({ id: newTask.id, message: 'Created successfully' });
});

// 3. EDIT TASK (Full Update)
app.put('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const tasks = readTasks();
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) return res.status(404).json({ error: 'Task not found' });

  const { title, description, priority, cognitive_weight, assignee, status, subtasks } = req.body;

  tasks[index] = {
    ...tasks[index],
    title: title !== undefined ? title : tasks[index].title,
    description: description !== undefined ? description : tasks[index].description,
    priority: priority !== undefined ? priority : tasks[index].priority,
    cognitive_weight: cognitive_weight !== undefined ? Number(cognitive_weight) : tasks[index].cognitive_weight,
    assignee: assignee !== undefined ? assignee : tasks[index].assignee,
    status: status !== undefined ? status : tasks[index].status,
    subtasks: Array.isArray(subtasks)
      ? subtasks.map((st, i) => ({
          id: st.id || Date.now() + i,
          title: typeof st === 'string' ? st : st.title,
          is_completed: typeof st === 'object' ? Boolean(st.is_completed) : false
        }))
      : tasks[index].subtasks
  };

  saveTasks(tasks);
  res.json({ message: 'Updated successfully' });
});

// 4. QUICK STATUS UPDATE
app.patch('/api/tasks/:id/status', (req, res) => {
  const id = Number(req.params.id);
  const tasks = readTasks();
  const task = tasks.find(t => t.id === id);

  if (!task) return res.status(404).json({ error: 'Task not found' });

  task.status = req.body.status;
  saveTasks(tasks);
  res.json({ message: 'Status updated' });
});

// 5. TOGGLE SUBTASK
app.patch('/api/subtasks/:id/toggle', (req, res) => {
  const subtaskId = Number(req.params.id);
  const tasks = readTasks();

  let toggled = false;
  tasks.forEach(t => {
    (t.subtasks || []).forEach(st => {
      if (st.id === subtaskId) {
        st.is_completed = !st.is_completed;
        toggled = true;
      }
    });
  });

  if (toggled) {
    saveTasks(tasks);
    res.json({ message: 'Subtask toggled' });
  } else {
    res.status(404).json({ error: 'Subtask not found' });
  }
});

// 6. DELETE TASK
app.delete('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  let tasks = readTasks();
  tasks = tasks.filter(t => t.id !== id);
  saveTasks(tasks);
  res.json({ message: 'Deleted successfully' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 TaskFlow Backend running on http://localhost:${PORT}`));
