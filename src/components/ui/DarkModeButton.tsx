export default function DarkModeButton({darkMode, toggleTheme} : {darkMode: boolean, toggleTheme: () => void}) {
    return(
        <div className="flex justify-between w-full max-w-md mb-4 px-6">
            <button 
                onClick={toggleTheme} 
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-blue-100 text-gray-700'}`}
            >
                {darkMode ? '☀️' : '🌙'}
            </button>
        </div>
    )
}

