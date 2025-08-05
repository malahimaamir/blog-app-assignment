import { useState } from 'react';
import { AdminView } from './AdminView';
import { BlogView } from './BlogView';

const Index = () => {
  const [currentView, setCurrentView] = useState<'public' | 'admin'>('public');

  return (
    <div className="min-h-screen bg-background">
      {currentView === 'admin' ? (
        <AdminView onViewPublic={() => setCurrentView('public')} />
      ) : (
        <BlogView onBack={() => setCurrentView('admin')} />
      )}
    </div>
  );
};

export default Index;
