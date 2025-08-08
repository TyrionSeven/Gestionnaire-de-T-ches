import React from 'react';
import { Task } from '../types/index.ts';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { 
  Calendar, 
  Tag, 
  Edit, 
  Trash2, 
  CheckCircle, 
  Clock, 
  AlertCircle 
} from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: Task['status']) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onEdit, 
  onDelete, 
  onStatusChange 
}) => {
  const isOverdue = task.dueDate && new Date() > task.dueDate && task.status !== 'done';
  
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-danger-100 text-danger-700 border-danger-200';
      case 'medium':
        return 'bg-warning-100 text-warning-700 border-warning-200';
      case 'low':
        return 'bg-success-100 text-success-700 border-success-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-4 h-4" />;
      case 'medium':
        return <Clock className="w-4 h-4" />;
      case 'low':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className={`card hover:shadow-md transition-shadow duration-200 ${
      isOverdue ? 'border-danger-300 bg-danger-50' : ''
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
            {task.title}
          </h3>
          {task.description && (
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {task.description}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-2 ml-2">
          <button
            onClick={() => onEdit(task)}
            className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
            title="Modifier"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1 text-gray-400 hover:text-danger-600 transition-colors"
            title="Supprimer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {/* Priorité */}
        <div className="flex items-center space-x-2">
          {getPriorityIcon(task.priority)}
          <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(task.priority)}`}>
            {task.priority === 'high' ? 'Élevée' : 
             task.priority === 'medium' ? 'Moyenne' : 'Faible'}
          </span>
        </div>

        {/* Date d'échéance */}
        {task.dueDate && (
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className={`${isOverdue ? 'text-danger-600 font-medium' : 'text-gray-600'}`}>
              {isOverdue ? 'En retard' : 'Échéance'} : {format(task.dueDate, 'dd MMM yyyy', { locale: fr })}
            </span>
          </div>
        )}

        {/* Tags */}
        {task.tags.length > 0 && (
          <div className="flex items-center space-x-2">
            <Tag className="w-4 h-4 text-gray-400" />
            <div className="flex flex-wrap gap-1">
              {task.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
              {task.tags.length > 3 && (
                <span className="text-xs text-gray-400">
                  +{task.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Projet */}
        {task.project && (
          <div className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: task.project }}
            />
            <span className="text-sm text-gray-600">{task.project}</span>
          </div>
        )}
      </div>

      {/* Actions de statut */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <div className="flex space-x-1">
          <button
            onClick={() => onStatusChange(task.id, 'todo')}
            className={`px-2 py-1 text-xs rounded ${
              task.status === 'todo' 
                ? 'bg-primary-100 text-primary-700' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            À faire
          </button>
          <button
            onClick={() => onStatusChange(task.id, 'in-progress')}
            className={`px-2 py-1 text-xs rounded ${
              task.status === 'in-progress' 
                ? 'bg-warning-100 text-warning-700' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            En cours
          </button>
          <button
            onClick={() => onStatusChange(task.id, 'done')}
            className={`px-2 py-1 text-xs rounded ${
              task.status === 'done' 
                ? 'bg-success-100 text-success-700' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            Terminé
          </button>
        </div>
        
        <span className="text-xs text-gray-400">
          {format(task.createdAt, 'dd/MM/yyyy', { locale: fr })}
        </span>
      </div>
    </div>
  );
};

export default TaskCard; 