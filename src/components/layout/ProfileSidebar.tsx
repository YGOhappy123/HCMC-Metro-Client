import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { signOut } from '@/slices/authSlice'

const ProfileSidebar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.auth.user)

    return (
        <div className="relative w-full rounded-xl bg-black p-[55px] pt-[70px] pb-[45px] text-white lg:w-[440px]">
            <div className="bg-primary before:bg-primary after:bg-primary absolute top-0 left-[91px] h-[35px] w-[14px] before:absolute before:top-0 before:-left-[22px] before:h-full before:w-full after:absolute after:top-0 after:-right-[22px] after:h-full after:w-full"></div>
            <button className="h-[80px] cursor-pointer rounded-lg bg-white px-5 py-3" onClick={() => navigate('/')}>
                <img src="/images/logo-hcmc-metro.png" alt="app-logo" className="h-full object-contain" />
            </button>
            <h2 className="font-oswald mt-8 text-4xl font-semibold uppercase">Xin chào !</h2>
            <h3 className="font-oswald mt-4 text-2xl font-semibold uppercase">{user.fullName}</h3>
            <span className="mt-6 inline-block cursor-pointer capitalize underline hover:text-white/90" onClick={() => dispatch(signOut())}>
                Đăng xuất
            </span>
            <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-1">
                <NavLink to="/profile/edit" className={({ isActive }) => `text-lg ${isActive ? 'text-primary' : 'text-white/50 hover:text-white'}`}>
                    Chỉnh sửa tài khoản
                </NavLink>
                {user.role === 'customer' && (
                    <NavLink
                        to="/profile/my-orders"
                        className={({ isActive }) => `text-lg ${isActive ? 'text-primary' : 'text-white/50 hover:text-white'}`}
                    >
                        Quản lý đơn hàng đã mua
                    </NavLink>
                )}
                <NavLink
                    to="/profile/change-password"
                    className={({ isActive }) => `text-lg ${isActive ? 'text-primary' : 'text-white/50 hover:text-white'}`}
                >
                    Đổi mật khẩu
                </NavLink>
                <NavLink
                    to="/profile/change-avatar"
                    className={({ isActive }) => `text-lg ${isActive ? 'text-primary' : 'text-white/50 hover:text-white'}`}
                >
                    Đổi ảnh đại diện
                </NavLink>
            </div>
        </div>
    )
}

export default ProfileSidebar
