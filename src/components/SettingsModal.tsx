import React, { useState } from 'react';
import { X, Moon, Sun, Bell, Monitor, Download, Upload, RotateCcw } from 'lucide-react';
import { UserSettings } from '../types/index.ts';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: UserSettings;
  onUpdateSettings: (settings: UserSettings) => void;
  onToggleTheme: () => void;
  onExportSettings: () => void;
  onImportSettings: (file: File) => void;
  onResetSettings: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onToggleTheme,
  onExportSettings,
  onImportSettings,
  onResetSettings,
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'display' | 'shortcuts'>('general');
  const [localSettings, setLocalSettings] = useState<UserSettings>(settings);

  const handleSave = () => {
    onUpdateSettings(localSettings);
    onClose();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportSettings(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="card w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Paramètres</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Onglets */}
        <div className="flex space-x-1 mb-6 border-b border-gray-200">
          {[
            { id: 'general', label: 'Général', icon: Monitor },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'display', label: 'Affichage', icon: Sun },
            { id: 'shortcuts', label: 'Raccourcis', icon: Download },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === id
                  ? 'bg-primary-100 text-primary-700 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Contenu des onglets */}
        <div className="space-y-6">
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Apparence</h3>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Mode sombre</p>
                    <p className="text-sm text-gray-600">Basculer entre le thème clair et sombre</p>
                  </div>
                  <button
                    onClick={onToggleTheme}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    {settings.theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                    <span>{settings.theme === 'dark' ? 'Sombre' : 'Clair'}</span>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Données</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={onExportSettings}
                    className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    <span>Exporter les paramètres</span>
                  </button>
                  <label className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <Upload className="w-5 h-5" />
                    <span>Importer les paramètres</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImport}
                      className="hidden"
                    />
                  </label>
                </div>
                <button
                  onClick={onResetSettings}
                  className="flex items-center space-x-2 px-4 py-2 text-danger-600 hover:bg-danger-50 rounded-lg transition-colors mt-4"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Réinitialiser les paramètres</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Activer les notifications</p>
                      <p className="text-sm text-gray-600">Recevoir des rappels pour les tâches</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={localSettings.notifications.enabled}
                        onChange={(e) => setLocalSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, enabled: e.target.checked }
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rappel avant échéance (minutes)
                    </label>
                    <input
                      type="number"
                      min="5"
                      max="1440"
                      value={localSettings.notifications.reminderTime}
                      onChange={(e) => setLocalSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, reminderTime: parseInt(e.target.value) }
                      }))}
                      className="input w-32"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Son de notification</p>
                      <p className="text-sm text-gray-600">Jouer un son pour les notifications</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={localSettings.notifications.sound}
                        onChange={(e) => setLocalSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, sound: e.target.checked }
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'display' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Affichage</h3>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vue par défaut
                    </label>
                    <select
                      value={localSettings.display.defaultView}
                      onChange={(e) => setLocalSettings(prev => ({
                        ...prev,
                        display: { ...prev.display, defaultView: e.target.value as any }
                      }))}
                      className="input"
                    >
                      <option value="kanban">Kanban</option>
                      <option value="list">Liste</option>
                      <option value="calendar">Calendrier</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Afficher les tâches terminées</p>
                      <p className="text-sm text-gray-600">Inclure les tâches terminées dans l'affichage</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={localSettings.display.showCompleted}
                        onChange={(e) => setLocalSettings(prev => ({
                          ...prev,
                          display: { ...prev.display, showCompleted: e.target.checked }
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Grouper par
                    </label>
                    <select
                      value={localSettings.display.groupBy}
                      onChange={(e) => setLocalSettings(prev => ({
                        ...prev,
                        display: { ...prev.display, groupBy: e.target.value as any }
                      }))}
                      className="input"
                    >
                      <option value="status">Statut</option>
                      <option value="priority">Priorité</option>
                      <option value="category">Catégorie</option>
                      <option value="none">Aucun</option>
                    </select>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Trier par
                    </label>
                    <select
                      value={localSettings.display.sortBy}
                      onChange={(e) => setLocalSettings(prev => ({
                        ...prev,
                        display: { ...prev.display, sortBy: e.target.value as any }
                      }))}
                      className="input"
                    >
                      <option value="dueDate">Date d'échéance</option>
                      <option value="priority">Priorité</option>
                      <option value="createdAt">Date de création</option>
                      <option value="title">Titre</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shortcuts' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Raccourcis clavier</h3>
                <div className="space-y-2">
                  {Object.entries(localSettings.shortcuts).map(([key, action]) => (
                    <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{action}</p>
                        <p className="text-sm text-gray-600">{key}</p>
                      </div>
                      <button className="text-primary-600 hover:text-primary-700 text-sm">
                        Modifier
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="btn-secondary flex-1"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            className="btn-primary flex-1"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal; 