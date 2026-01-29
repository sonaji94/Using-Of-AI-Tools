import React, { useState, useMemo, useEffect } from 'react';
import { Department, ResourceType, Resource } from './types';
import { MOCK_RESOURCES } from './constants';
import Sidebar from './components/Sidebar';
import ResourceGrid from './components/ResourceGrid';
import ResourceDetail from './components/ResourceDetail';
import AIChatModal from './components/AIChatModal';

const App: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<Department | 'All'>('All');
  const [selectedType, setSelectedType] = useState<ResourceType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // 🔍 Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // 💾 Load filters from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('libraryFilters');
    if (saved) {
      const { dept, type, query } = JSON.parse(saved);
      setSelectedDept(dept);
      setSelectedType(type);
      setSearchQuery(query);
    }
  }, []);

  // 💾 Save filters to localStorage
  useEffect(() => {
    localStorage.setItem(
      'libraryFilters',
      JSON.stringify({
        dept: selectedDept,
        type: selectedType,
        query: searchQuery,
      })
    );
  }, [selectedDept, selectedType, searchQuery]);

  // ❌ Close chat if resource changes
  useEffect(() => {
    setIsChatOpen(false);
  }, [selectedResource]);

  const filteredResources = useMemo(() => {
    return MOCK_RESOURCES.filter(res => {
      const matchDept = selectedDept === 'All' || res.department === selectedDept;
      const matchType = selectedType === 'All' || res.type === selectedType;
      const matchSearch =
        res.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        res.author.toLowerCase().includes(debouncedQuery.toLowerCase());

      return matchDept && matchType && matchSearch;
    });
  }, [selectedDept, selectedType, debouncedQuery]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="glass-effect sticky top-0 z-30 px-4 py-4 md:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-2xl shadow-lg">S</div>
            <div>
              <h1 className="text-xl font-black text-slate-800 tracking-tight leading-none">SUDL</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                Sharnbasava Digital Library
              </p>
            </div>
          </div>

          <div className="relative flex-1 max-w-xl group">
            <input
              type="text"
              placeholder="Search textbooks, notes, or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border-none rounded-full py-2 px-12 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-slate-700"
            />
            <svg className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <div className="flex -space-x-2">
              <img className="w-8 h-8 rounded-full border-2 border-white" src="https://picsum.photos/seed/user1/64" alt="User" />
              <img className="w-8 h-8 rounded-full border-2 border-white" src="https://picsum.photos/seed/user2/64" alt="User" />
              <img className="w-8 h-8 rounded-full border-2 border-white" src="https://picsum.photos/seed/user3/64" alt="User" />
              <div className="w-8 h-8 rounded-full border-2 border-white bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold">+2k</div>
            </div>
            <p className="text-xs text-slate-500 font-medium">Students active now</p>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8 flex flex-col md:flex-row gap-8">
        <Sidebar
          selectedDept={selectedDept}
          setSelectedDept={setSelectedDept}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />

        <div className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-800">
              {selectedDept === 'All' ? 'All Resources' : `${selectedDept} Resources`}
              <span className="ml-3 text-sm font-normal text-slate-400">({filteredResources.length} items)</span>
            </h2>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSelectedDept('All');
                  setSelectedType('All');
                  setSearchQuery('');
                }}
                className="px-3 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Clear Filters
              </button>
            </div>
          </div>

          <ResourceGrid
            resources={filteredResources}
            onSelect={(res) => setSelectedResource(res)}
          />

          {filteredResources.length === 0 && (
            <div className="text-center py-16 text-slate-500">
              <p className="text-lg font-semibold">No resources found</p>
              <p className="text-sm">Try changing filters or search keyword</p>
            </div>
          )}
        </div>
      </main>

      <ResourceDetail
        resource={selectedResource}
        onClose={() => setSelectedResource(null)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      <AIChatModal
        resource={selectedResource}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white font-black">S</div>
              <h3 className="text-white font-bold text-xl">Sharnbasava Digital Library</h3>
            </div>
            <p className="max-w-md text-sm leading-relaxed">
              Providing whole-university access to academic excellence. Our mission is to digitize Sharnbasava University's intellectual assets and make them available to every student, everywhere.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs">
          &copy; {new Date().getFullYear()} Sharnbasava University. Built for Academic Excellence.
        </div>
      </footer>
    </div>
  );
};

export default App;
