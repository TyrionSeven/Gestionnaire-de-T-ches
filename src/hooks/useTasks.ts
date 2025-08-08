import { useState, useEffect, useCallback } from 'react';
import { Task, TaskFormData, TaskStats } from '../types/index.ts';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'tasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Charger les tâches depuis le localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
        }));
        setTasks(parsedTasks);
      } catch (error) {
        console.error('Erreur lors du chargement des tâches:', error);
      }
    }
    setLoading(false);
  }, []);

  // Sauvegarder les tâches dans le localStorage
  const saveTasks = useCallback((newTasks: Task[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
  }, []);

  // Ajouter une nouvelle tâche
  const addTask = useCallback((taskData: TaskFormData) => {
    const newTask: Task = {
      id: uuidv4(),
      title: taskData.title,
      description: taskData.description,
      status: 'todo',
      priority: taskData.priority,
      dueDate: taskData.dueDate,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: taskData.tags,
      project: taskData.project || undefined,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    return newTask;
  }, [tasks, saveTasks]);

  // Modifier une tâche existante
  const updateTask = useCallback((taskId: string, taskData: TaskFormData) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId 
        ? {
            ...task,
            title: taskData.title,
            description: taskData.description,
            priority: taskData.priority,
            dueDate: taskData.dueDate,
            tags: taskData.tags,
            project: taskData.project || undefined,
            updatedAt: new Date(),
          }
        : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  }, [tasks, saveTasks]);

  // Supprimer une tâche
  const deleteTask = useCallback((taskId: string) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  }, [tasks, saveTasks]);

  // Changer le statut d'une tâche
  const changeTaskStatus = useCallback((taskId: string, status: Task['status']) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId 
        ? { ...task, status, updatedAt: new Date() }
        : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  }, [tasks, saveTasks]);

  // Calculer les statistiques
  const getStats = useCallback((): TaskStats => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.status === 'done').length;
    const inProgress = tasks.filter(task => task.status === 'in-progress').length;
    const overdue = tasks.filter(task => 
      task.dueDate && new Date() > task.dueDate && task.status !== 'done'
    ).length;
    
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      inProgress,
      overdue,
      completionRate,
    };
  }, [tasks]);

  // Filtrer les tâches par statut
  const getTasksByStatus = useCallback((status: Task['status']) => {
    return tasks.filter(task => task.status === status);
  }, [tasks]);

  // Filtrer les tâches par priorité
  const getTasksByPriority = useCallback((priority: Task['priority']) => {
    return tasks.filter(task => task.priority === priority);
  }, [tasks]);

  // Rechercher des tâches
  const searchTasks = useCallback((query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return tasks.filter(task => 
      task.title.toLowerCase().includes(lowercaseQuery) ||
      task.description?.toLowerCase().includes(lowercaseQuery) ||
      task.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      task.project?.toLowerCase().includes(lowercaseQuery)
    );
  }, [tasks]);

  // Obtenir les tâches en retard
  const getOverdueTasks = useCallback(() => {
    return tasks.filter(task => 
      task.dueDate && new Date() > task.dueDate && task.status !== 'done'
    );
  }, [tasks]);

  // Obtenir les tâches pour aujourd'hui
  const getTodayTasks = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return tasks.filter(task => 
      task.dueDate && 
      task.dueDate >= today && 
      task.dueDate < tomorrow
    );
  }, [tasks]);

  // Obtenir les tâches pour cette semaine
  const getThisWeekTasks = useCallback(() => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    return tasks.filter(task => 
      task.dueDate && 
      task.dueDate >= startOfWeek && 
      task.dueDate < endOfWeek
    );
  }, [tasks]);

  return {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
    changeTaskStatus,
    getStats,
    getTasksByStatus,
    getTasksByPriority,
    searchTasks,
    getOverdueTasks,
    getTodayTasks,
    getThisWeekTasks,
  };
}; 