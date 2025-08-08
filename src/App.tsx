import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, Search, Filter, Calendar, Target, CheckCircle, Clock, Settings, Bell, Download, Upload } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { Task, TaskFormData, Notification } from './types/index.ts';
import { useTasks } from './hooks/useTasks.ts';
import { useSettings } from './hooks/useSettings.ts';
import TaskCard from './components/TaskCard.tsx';
import TaskForm from './components/TaskForm.tsx';
import TaskStats from './components/TaskStats.tsx';
import SettingsModal from './components/SettingsModal.tsx';
import NotificationCenter from './components/NotificationCenter.tsx';
import AdvancedFilters, { FilterState } from './components/AdvancedFilters.tsx';

const App: React.FC = () => {
  const {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
    changeTaskStatus,
    getStats,
    getTasksByStatus,
    searchTasks,
  } = useTasks();

  const {
    settings,
    toggleTheme,
    updateDisplaySettings,
    exportSettings,
    importSettings,
    resetSettings,
  } = useSettings();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<Task['status'] | 'all'>('all');
  const [viewMode, setViewMode] = useState<'kanban' | 'list' | 'calendar'>(
    settings.display.defaultView === 'calendar' ? 'kanban' : settings.display.defaultView
  );
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    priority: 'all',
    category: 'all',
    project: 'all',
    assignee: 'all',
    dateRange: 'all',
    tags: [],
    searchQuery: '',
    showCompleted: true,
    sortBy: 'dueDate',
    sortOrder: 'asc',
  });

  const stats = getStats();
  const filteredTasks = searchQuery 
    ? searchTasks(searchQuery)
    : filterStatus === 'all' 
      ? tasks 
      : getTasksByStatus(filterStatus);

  const todoTasks = getTasksByStatus('todo');
  const inProgressTasks = getTasksByStatus('in-progress');
  const doneTasks = getTasksByStatus('done');

  const handleAddTask = (taskData: TaskFormData) => {
    addTask(taskData);
    setIsFormOpen(false);
    toast.success('Tâche créée avec succès !');
  };

  const handleUpdateTask = (taskData: TaskFormData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
      setEditingTask(undefined);
      toast.success('Tâche modifiée avec succès !');
    }
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
    toast.success('Tâche supprimée !');
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  // Gestion des notifications
  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const clearAllNotifications = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Gestion des filtres avancés
  const applyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    setIsAdvancedFiltersOpen(false);
  };

  const clearFilters = () => {
    setFilters({
      status: 'all',
      priority: 'all',
      category: 'all',
      project: 'all',
      assignee: 'all',
      dateRange: 'all',
      tags: [],
      searchQuery: '',
      showCompleted: true,
      sortBy: 'dueDate',
      sortOrder: 'asc',
    });
  };

  // Raccourcis clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'n':
            e.preventDefault();
            setIsFormOpen(true);
            break;
          case 'f':
            e.preventDefault();
            // Focus sur la recherche
            break;
          case 's':
            e.preventDefault();
            // Sauvegarder
            break;
        }
      }
      if (e.key === 'Escape') {
        setIsFormOpen(false);
        setIsSettingsOpen(false);
        setIsAdvancedFiltersOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    
    if (source.droppableId === destination.droppableId) {
      // Même colonne - réorganisation
      return;
    }

    // Changement de statut
    const newStatus = destination.droppableId as Task['status'];
    changeTaskStatus(draggableId, newStatus);
    toast.success(`Tâche déplacée vers ${newStatus === 'todo' ? 'À faire' : newStatus === 'in-progress' ? 'En cours' : 'Terminé'} !`);
  };

  const getStatusTitle = (status: Task['status']) => {
    switch (status) {
      case 'todo': return 'À faire';
      case 'in-progress': return 'En cours';
      case 'done': return 'Terminé';
      default: return status;
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'todo': return <Target className="w-5 h-5" />;
      case 'in-progress': return <Clock className="w-5 h-5" />;
      case 'done': return <CheckCircle className="w-5 h-5" />;
      default: return null;
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'todo': return 'bg-primary-100 text-primary-700 border-primary-200';
      case 'in-progress': return 'bg-warning-100 text-warning-700 border-warning-200';
      case 'done': return 'bg-success-100 text-success-700 border-success-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Gestionnaire de Tâches
              </h1>
            </div>
            
                         <div className="flex items-center space-x-4">
               {/* Recherche */}
               <div className="relative">
                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                 <input
                   type="text"
                   placeholder="Rechercher des tâches..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                 />
               </div>

               {/* Filtres avancés */}
               <button
                 onClick={() => setIsAdvancedFiltersOpen(true)}
                 className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
               >
                 <Filter className="w-4 h-4" />
                 <span>Filtres</span>
               </button>

               {/* Mode d'affichage */}
               <div className="flex border border-gray-300 rounded-lg">
                 <button
                   onClick={() => setViewMode('kanban')}
                   className={`px-3 py-2 text-sm font-medium ${
                     viewMode === 'kanban'
                       ? 'bg-primary-600 text-white'
                       : 'bg-white text-gray-700 hover:bg-gray-50'
                   } rounded-l-lg`}
                 >
                   Kanban
                 </button>
                 <button
                   onClick={() => setViewMode('list')}
                   className={`px-3 py-2 text-sm font-medium ${
                     viewMode === 'list'
                       ? 'bg-primary-600 text-white'
                       : 'bg-white text-gray-700 hover:bg-gray-50'
                   } rounded-r-lg`}
                 >
                   Liste
                 </button>
               </div>

               {/* Notifications */}
               <NotificationCenter
                 notifications={notifications}
                 onMarkAsRead={markNotificationAsRead}
                 onClearAll={clearAllNotifications}
                 onDeleteNotification={deleteNotification}
               />

               {/* Paramètres */}
               <button
                 onClick={() => setIsSettingsOpen(true)}
                 className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
               >
                 <Settings className="w-5 h-5" />
               </button>

               {/* Bouton ajouter */}
               <button
                 onClick={() => setIsFormOpen(true)}
                 className="btn-primary flex items-center space-x-2"
               >
                 <Plus className="w-4 h-4" />
                 <span>Nouvelle tâche</span>
               </button>
             </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques */}
        <TaskStats stats={stats} />

        {/* Affichage des tâches */}
        {viewMode === 'kanban' ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Colonne À faire */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  {getStatusIcon('todo')}
                  <h2 className="text-lg font-semibold text-gray-900">
                    À faire ({todoTasks.length})
                  </h2>
                </div>
                <Droppable droppableId="todo">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-4 min-h-[200px]"
                    >
                      {todoTasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard
                                task={task}
                                onEdit={handleEditTask}
                                onDelete={handleDeleteTask}
                                onStatusChange={changeTaskStatus}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>

              {/* Colonne En cours */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  {getStatusIcon('in-progress')}
                  <h2 className="text-lg font-semibold text-gray-900">
                    En cours ({inProgressTasks.length})
                  </h2>
                </div>
                <Droppable droppableId="in-progress">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-4 min-h-[200px]"
                    >
                      {inProgressTasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard
                                task={task}
                                onEdit={handleEditTask}
                                onDelete={handleDeleteTask}
                                onStatusChange={changeTaskStatus}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>

              {/* Colonne Terminé */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  {getStatusIcon('done')}
                  <h2 className="text-lg font-semibold text-gray-900">
                    Terminé ({doneTasks.length})
                  </h2>
                </div>
                <Droppable droppableId="done">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-4 min-h-[200px]"
                    >
                      {doneTasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard
                                task={task}
                                onEdit={handleEditTask}
                                onDelete={handleDeleteTask}
                                onStatusChange={changeTaskStatus}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          </DragDropContext>
        ) : (
          /* Vue liste */
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Toutes les tâches ({filteredTasks.length})
            </h2>
            {filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  {searchQuery 
                    ? 'Aucune tâche trouvée pour cette recherche.'
                    : 'Aucune tâche pour le moment. Créez votre première tâche !'
                  }
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                    onStatusChange={changeTaskStatus}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

             {/* Formulaire de tâche */}
       <TaskForm
         task={editingTask}
         onSubmit={editingTask ? handleUpdateTask : handleAddTask}
         onCancel={() => {
           setIsFormOpen(false);
           setEditingTask(undefined);
         }}
         isOpen={isFormOpen}
       />

       {/* Modal des paramètres */}
       <SettingsModal
         isOpen={isSettingsOpen}
         onClose={() => setIsSettingsOpen(false)}
         settings={settings}
         onUpdateSettings={(newSettings) => {
           updateDisplaySettings(newSettings.display);
         }}
         onToggleTheme={toggleTheme}
         onExportSettings={exportSettings}
         onImportSettings={importSettings}
         onResetSettings={resetSettings}
       />

       {/* Modal des filtres avancés */}
       <AdvancedFilters
         isOpen={isAdvancedFiltersOpen}
         onClose={() => setIsAdvancedFiltersOpen(false)}
         filters={filters}
         onApplyFilters={applyFilters}
         onClearFilters={clearFilters}
       />
     </div>
   );
 };

export default App; 