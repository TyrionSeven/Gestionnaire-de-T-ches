import React from 'react';
import { TaskStats as TaskStatsType } from '../types/index.ts';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  TrendingUp,
  Calendar,
  Target
} from 'lucide-react';

interface TaskStatsProps {
  stats: TaskStatsType;
}

const TaskStats: React.FC<TaskStatsProps> = ({ stats }) => {
  const getProgressColor = (rate: number) => {
    if (rate >= 80) return 'text-success-600';
    if (rate >= 60) return 'text-warning-600';
    return 'text-danger-600';
  };

  const getProgressBgColor = (rate: number) => {
    if (rate >= 80) return 'bg-success-100';
    if (rate >= 60) return 'bg-warning-100';
    return 'bg-danger-100';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total des tâches */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total des tâches</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="p-3 bg-primary-100 rounded-full">
            <Target className="w-6 h-6 text-primary-600" />
          </div>
        </div>
      </div>

      {/* Tâches terminées */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Terminées</p>
            <p className="text-2xl font-bold text-success-600">{stats.completed}</p>
          </div>
          <div className="p-3 bg-success-100 rounded-full">
            <CheckCircle className="w-6 h-6 text-success-600" />
          </div>
        </div>
      </div>

      {/* Tâches en cours */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">En cours</p>
            <p className="text-2xl font-bold text-warning-600">{stats.inProgress}</p>
          </div>
          <div className="p-3 bg-warning-100 rounded-full">
            <Clock className="w-6 h-6 text-warning-600" />
          </div>
        </div>
      </div>

      {/* Tâches en retard */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">En retard</p>
            <p className="text-2xl font-bold text-danger-600">{stats.overdue}</p>
          </div>
          <div className="p-3 bg-danger-100 rounded-full">
            <AlertTriangle className="w-6 h-6 text-danger-600" />
          </div>
        </div>
      </div>

      {/* Taux de complétion */}
      <div className="card md:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-gray-600">Taux de complétion</p>
            <p className={`text-2xl font-bold ${getProgressColor(stats.completionRate)}`}>
              {stats.completionRate}%
            </p>
          </div>
          <div className={`p-3 rounded-full ${getProgressBgColor(stats.completionRate)}`}>
            <TrendingUp className={`w-6 h-6 ${getProgressColor(stats.completionRate)}`} />
          </div>
        </div>
        
        {/* Barre de progression */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              stats.completionRate >= 80 ? 'bg-success-500' :
              stats.completionRate >= 60 ? 'bg-warning-500' : 'bg-danger-500'
            }`}
            style={{ width: `${Math.min(stats.completionRate, 100)}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Résumé de la semaine */}
      <div className="card md:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Résumé de la semaine</h3>
          <Calendar className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Tâches créées cette semaine</span>
            <span className="text-sm font-medium text-gray-900">
              {Math.floor(stats.total * 0.3)} {/* Simulation */}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Tâches terminées cette semaine</span>
            <span className="text-sm font-medium text-success-600">
              {Math.floor(stats.completed * 0.4)} {/* Simulation */}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Productivité moyenne</span>
            <span className={`text-sm font-medium ${getProgressColor(stats.completionRate)}`}>
              {stats.completionRate >= 80 ? 'Excellente' :
               stats.completionRate >= 60 ? 'Bonne' : 'À améliorer'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStats; 