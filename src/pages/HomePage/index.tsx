import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signOut } from '@/slices/authSlice'
import { useTheme } from '@/hooks/useTheme'
import useTitle from '@/hooks/useTitle'

const HomePage = () => {
    useTitle('HCMC Metro | Trang Chủ')
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { theme, toggleTheme } = useTheme()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div>
            <div className="text-2xl font-semibold text-yellow-600 dark:text-red-600">HomePage</div>
            <button onClick={toggleTheme} className="rounded bg-gray-200 px-4 py-2 dark:bg-gray-800 dark:text-white">
                Toggle Dark Mode (Current: {theme})
            </button>
            <br></br>
            <button onClick={() => dispatch(signOut())} className="mt-5 rounded bg-gray-200 px-4 py-2 dark:bg-gray-800 dark:text-white">
                Sign Out
            </button>
            <br></br>
            <button onClick={() => navigate('/auth')} className="mt-5 rounded bg-gray-200 px-4 py-2 dark:bg-gray-800 dark:text-white">
                Go to auth page
            </button>
        </div>
    )
}

export default HomePage
