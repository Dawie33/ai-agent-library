<template>
      <header className="border-b border-gray-800/50 backdrop-blur-xl bg-[#0a0e1a]/80">
          <div className="max-w-[1600px] mx-auto px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex  items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00ff9f] via-[#00d4ff] to-[#ff00ff] bg-clip-text text-transparent tracking-tight">
                    Bibliothèque d'agents IA
                  </h1>
                    <p className="text-sm text-gray-500">Gérez vos agents IA personnalisés en un seul endroit</p>
                </div>
              </div>
              
              <div className="flex  items-center gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher un agent..."
                    className="pl-10 w-72 pr-4 py-2 bg-gray-900/50 border border-gray-800 rounded-lg focus:border-[#00ff9f] focus:outline-none text-sm transition-all"
                  />
                </div>

                <button className="px-4 py-2 bg-gradient-to-r from-[#00ff9f] to-[#00d4ff] text-[#0a0e1a] font-bold rounded-lg hover:shadow-lg hover:shadow-[#00ff9f]/50 transition-all flex items-center gap-2">
                  Nouvel Agent
                </button>
              </div>
            </div>
          </div>
        </header>
</template>

