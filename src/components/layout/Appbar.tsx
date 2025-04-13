import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { RootState } from '@/store'
import { signOut } from '@/slices/authSlice'
import { NAVIGATION_TABS } from '@/configs/constants'
import toastConfig from '@/configs/toast'

const Appbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, isLogged } = useSelector((state: RootState) => state.auth)

    return (
        <header className="bg-primary sticky top-0 z-[1000] flex flex-col items-center px-5">
            <div className="h-navbar max-w-container flex w-full items-center justify-between">
                <div
                    className="flex cursor-pointer items-center justify-center gap-2.5 py-3 font-medium"
                    style={{
                        height: 'var(--sidebar-logo-height)'
                    }}
                    onClick={() => navigate('/')}
                >
                    <img src="/images/logo-hurc.png" width={45} alt="" className="rounded-lg outline-hidden" />
                    <span className="text-[22px] font-bold tracking-widest whitespace-pre text-white">HCMC METRO</span>
                </div>

                <div className="flex items-center gap-9">
                    {NAVIGATION_TABS.filter(tab => !tab.roles || tab.roles?.includes(user?.role)).map(tab => (
                        <NavLink key={tab.href} to={tab.href} className={({ isActive }) => (isActive ? 'text-secondary' : 'text-white')}>
                            <span className="hover:text-secondary font-semibold tracking-wide uppercase">{tab.label}</span>
                        </NavLink>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    {user?.avatar && (
                        <div className="tooltip tooltip-bottom tooltip-neutral rounded-sm text-white" data-tip={`Ấn vào đây để vào "Trang cá nhân"`}>
                            <button
                                className="border-primary bg-ivory flex aspect-square h-[54px] cursor-pointer items-center justify-center overflow-hidden rounded-full border-2"
                                onClick={() => navigate('/profile')}
                            >
                                <img src={user.avatar} alt="user avatar" className="h-full w-full object-cover" />
                            </button>
                        </div>
                    )}
                    <button
                        className="border-primary bg-ivory text-primary flex h-[54px] w-[180px] cursor-pointer items-center justify-center rounded-full border-2 font-semibold tracking-widest uppercase hover:bg-[#DBD6CA]"
                        onClick={() => {
                            if (isLogged) {
                                dispatch(signOut())
                                navigate('/')
                                toast('Đăng xuất thành công', toastConfig('success'))
                            } else {
                                navigate('/auth')
                            }
                        }}
                    >
                        {isLogged ? 'đăng xuất' : 'đăng nhập'}
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Appbar
