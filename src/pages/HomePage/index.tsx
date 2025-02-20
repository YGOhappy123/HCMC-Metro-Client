import { useTheme } from '@/hooks/useTheme'

const HomePage = () => {
    const { theme, toggleTheme } = useTheme()

    return (
        <div>
            <div className="text-2xl font-semibold text-yellow-600 dark:text-red-600">HomePage</div>
            <button onClick={toggleTheme} className="rounded bg-gray-200 px-4 py-2 dark:bg-gray-800 dark:text-white">
                Toggle Dark Mode (Current: {theme})
            </button>
        </div>
    )
}

export default HomePage
