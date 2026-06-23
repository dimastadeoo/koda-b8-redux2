import { createSlice } from '@reduxjs/toolkit';

// State awal: array kosong, nanti akan diisi oleh persist
const initialState = [];

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Menambahkan task baru (ke group "To Do")
    addTask: (state, action) => {
      const newTask = action.payload; // { id, title, dueDate, tag, priority }
      // Cari group "To Do" dan tambahkan task di awal
      const todoGroup = state.find(group => group.title === 'To Do');
      if (todoGroup) {
        todoGroup.tasks.unshift(newTask);
      } else {
        // Jika belum ada group "To Do" (misal state kosong), buat
        state.push({
          title: 'To Do',
          tasks: [newTask],
        });
      }
    },

    // Menghapus task berdasarkan id dari group mana pun
    removeTask: (state, action) => {
      const taskId = action.payload;
      for (let group of state) {
        group.tasks = group.tasks.filter(task => task.id !== taskId);
      }
      // Opsional: hapus group yang tasks-nya kosong (agar rapi)
      // return state.filter(group => group.tasks.length > 0);
    },

    // Mengedit task (cari task berdasarkan id, update field yang diberikan)
    editTask: (state, action) => {
      const { id, updates } = action.payload; // updates: object { title, dueDate, tag, priority }
      for (let group of state) {
        const task = group.tasks.find(t => t.id === id);
        if (task) {
          Object.assign(task, updates);
          break;
        }
      }
    },

    // Memindahkan task ke group selanjutnya (To Do → In Progress → Done)
    moveTask: (state, action) => {
      const { taskId, currentGroupTitle } = action.payload;
      let nextGroupTitle = '';
      if (currentGroupTitle === 'To Do') nextGroupTitle = 'In Progress';
      else if (currentGroupTitle === 'In Progress') nextGroupTitle = 'Done';
      else return; // jika sudah Done atau tidak dikenal, tidak melakukan apa-apa

      let movedTask = null;
      // Cari dan hapus task dari group saat ini
      for (let group of state) {
        if (group.title === currentGroupTitle) {
          const index = group.tasks.findIndex(t => t.id === taskId);
          if (index !== -1) {
            movedTask = group.tasks.splice(index, 1)[0];
            break;
          }
        }
      }
      if (!movedTask) return;

      // Tambahkan ke group tujuan
      const targetGroup = state.find(g => g.title === nextGroupTitle);
      if (targetGroup) {
        targetGroup.tasks.push(movedTask);
      } else {
        // Jika group tujuan belum ada (misal belum dibuat), buat
        state.push({
          title: nextGroupTitle,
          tasks: [movedTask],
        });
      }
    },

    // (Opsional) Reset semua data
    resetTodos: () => initialState,
  },
});

// Ekspor actions
export const { addTask, removeTask, editTask, moveTask, resetTodos } = todosSlice.actions;

// Ekspor reducer
export default todosSlice.reducer;