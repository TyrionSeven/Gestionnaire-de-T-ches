import { useState, useEffect, useCallback } from 'react';
import { UserSettings } from '../types/index.ts';

const DEFAULT_SETTINGS: UserSettings = {
  theme: 'light',
  language: 'fr',
  notifications: {
    enabled: true,
    reminderTime: 30, // 30 minutes avant échéance
    sound: true,
    desktop: true,
  },
  display: {
    defaultView: 'kanban',
    showCompleted: true,
    groupBy: 'status',
    sortBy: 'dueDate',
  },
  shortcuts: {
    'Ctrl+N': 'new-task',
    'Ctrl+F': 'search',
    'Ctrl+S': 'save',
    'Ctrl+Z': 'undo',
    'Ctrl+Y': 'redo',
    'Escape': 'close-modal',
  },
};

const SETTINGS_KEY = 'task-manager-settings';

export const useSettings = () => {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  // Charger les paramètres depuis le localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem(SETTINGS_KEY);
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings({ ...DEFAULT_SETTINGS, ...parsedSettings });
      } catch (error) {
        console.error('Erreur lors du chargement des paramètres:', error);
      }
    }
    setLoading(false);
  }, []);

  // Sauvegarder les paramètres
  const saveSettings = useCallback((newSettings: UserSettings) => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
    setSettings(newSettings);
  }, []);

  // Changer le thème
  const toggleTheme = useCallback(() => {
    const newTheme = settings.theme === 'light' ? 'dark' : 'light';
    const newSettings = { ...settings, theme: newTheme };
    saveSettings(newSettings);
    
    // Appliquer le thème au document
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  }, [settings, saveSettings]);

  // Mettre à jour les paramètres de notification
  const updateNotificationSettings = useCallback((notificationSettings: UserSettings['notifications']) => {
    const newSettings = { ...settings, notifications: notificationSettings };
    saveSettings(newSettings);
  }, [settings, saveSettings]);

  // Mettre à jour les paramètres d'affichage
  const updateDisplaySettings = useCallback((displaySettings: UserSettings['display']) => {
    const newSettings = { ...settings, display: displaySettings };
    saveSettings(newSettings);
  }, [settings, saveSettings]);

  // Mettre à jour les raccourcis clavier
  const updateShortcuts = useCallback((shortcuts: UserSettings['shortcuts']) => {
    const newSettings = { ...settings, shortcuts };
    saveSettings(newSettings);
  }, [settings, saveSettings]);

  // Réinitialiser les paramètres
  const resetSettings = useCallback(() => {
    saveSettings(DEFAULT_SETTINGS);
  }, [saveSettings]);

  // Exporter les paramètres
  const exportSettings = useCallback(() => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'task-manager-settings.json';
    link.click();
    URL.revokeObjectURL(url);
  }, [settings]);

  // Importer les paramètres
  const importSettings = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedSettings = JSON.parse(e.target?.result as string);
        saveSettings({ ...DEFAULT_SETTINGS, ...importedSettings });
      } catch (error) {
        console.error('Erreur lors de l\'import des paramètres:', error);
      }
    };
    reader.readAsText(file);
  }, [saveSettings]);

  return {
    settings,
    loading,
    saveSettings,
    toggleTheme,
    updateNotificationSettings,
    updateDisplaySettings,
    updateShortcuts,
    resetSettings,
    exportSettings,
    importSettings,
  };
}; 