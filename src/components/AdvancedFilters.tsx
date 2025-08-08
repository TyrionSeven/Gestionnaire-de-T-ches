import React, { useState } from 'react';
import { Filter, X, Calendar, Tag, User, Clock, AlertTriangle } from 'lucide-react';
import { Task } from '../types/index.ts';

interface AdvancedFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onApplyFilters: (filters: FilterState) => void;
  onClearFilters: () => void;
}

export interface FilterState {
  status: Task['status'] | 'all';
  priority: Task['priority'] | 'all';
  category: string | 'all';
  project: string | 'all';
  assignee: string | 'all';
  dateRange: 'all' | 'today' | 'week' | 'month' | 'overdue' | 'due-soon';
  tags: string[];
  searchQuery: string;
  showCompleted: boolean;
  sortBy: 'dueDate' | 'priority' | 'createdAt' | 'title';
  sortOrder: 'asc' | 'desc';
}

const DEFAULT_FILTERS: FilterState = {
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
};

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onClearFilters,
}) => {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);
  const [newTag, setNewTag] = useState('');

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleClear = () => {
    setLocalFilters(DEFAULT_FILTERS);
    onClearFilters();
  };

  const handleAddTag = () => {
    if (newTag.trim() && !localFilters.tags.includes(newTag.trim())) {
      setLocalFilters(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setLocalFilters(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="card w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Filter className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-semibold text-gray-900">Filtres avancés</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Statut */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Statut
            </label>
            <select
              value={localFilters.status}
              onChange={(e) => setLocalFilters(prev => ({
                ...prev,
                status: e.target.value as Task['status'] | 'all'
              }))}
              className="input"
            >
              <option value="all">Tous les statuts</option>
              <option value="todo">À faire</option>
              <option value="in-progress">En cours</option>
              <option value="done">Terminé</option>
            </select>
          </div>

          {/* Priorité */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priorité
            </label>
            <select
              value={localFilters.priority}
              onChange={(e) => setLocalFilters(prev => ({
                ...prev,
                priority: e.target.value as Task['priority'] | 'all'
              }))}
              className="input"
            >
              <option value="all">Toutes les priorités</option>
              <option value="high">Élevée</option>
              <option value="medium">Moyenne</option>
              <option value="low">Faible</option>
            </select>
          </div>

          {/* Plage de dates */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plage de dates
            </label>
            <select
              value={localFilters.dateRange}
              onChange={(e) => setLocalFilters(prev => ({
                ...prev,
                dateRange: e.target.value as FilterState['dateRange']
              }))}
              className="input"
            >
              <option value="all">Toutes les dates</option>
              <option value="today">Aujourd'hui</option>
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="overdue">En retard</option>
              <option value="due-soon">Échéance proche</option>
            </select>
          </div>

          {/* Tri */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trier par
              </label>
              <select
                value={localFilters.sortBy}
                onChange={(e) => setLocalFilters(prev => ({
                  ...prev,
                  sortBy: e.target.value as FilterState['sortBy']
                }))}
                className="input"
              >
                <option value="dueDate">Date d'échéance</option>
                <option value="priority">Priorité</option>
                <option value="createdAt">Date de création</option>
                <option value="title">Titre</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ordre
              </label>
              <select
                value={localFilters.sortOrder}
                onChange={(e) => setLocalFilters(prev => ({
                  ...prev,
                  sortOrder: e.target.value as 'asc' | 'desc'
                }))}
                className="input"
              >
                <option value="asc">Croissant</option>
                <option value="desc">Décroissant</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                className="input flex-1"
                placeholder="Ajouter un tag"
              />
              <button
                onClick={handleAddTag}
                className="btn-primary px-3 py-2"
              >
                Ajouter
              </button>
            </div>
            {localFilters.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {localFilters.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="text-primary-500 hover:text-primary-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Options d'affichage */}
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={localFilters.showCompleted}
                onChange={(e) => setLocalFilters(prev => ({
                  ...prev,
                  showCompleted: e.target.checked
                }))}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Afficher les tâches terminées
              </span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-6 border-t border-gray-200">
          <button
            onClick={handleClear}
            className="btn-secondary flex-1"
          >
            Effacer tous les filtres
          </button>
          <button
            onClick={onClose}
            className="btn-secondary flex-1"
          >
            Annuler
          </button>
          <button
            onClick={handleApply}
            className="btn-primary flex-1"
          >
            Appliquer les filtres
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters; 