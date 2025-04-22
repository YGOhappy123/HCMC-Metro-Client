import { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBuilding,
    faCashRegister,
    faChartLine,
    faChevronRight,
    faCoins,
    faCreditCard,
    faHome,
    faTicket,
    faUser,
    faUserFriends
} from '@fortawesome/free-solid-svg-icons'

import { RootState } from '@/store'
import { signOut } from '@/slices/authSlice'
import SidebarSubMenu from '@/components/layout/SidebarSubMenu'
import Button from '@/components/common/Button'

const SUB_MENU_LIST = [
    {
        groupName: 'Tra cứu thông tin',
        visibleBy: ['staff', 'admin'],
        items: [
            {
                label: 'Chăm sóc khách hàng',
                icon: faUser,
                items: [
                    {
                        label: 'Danh sách khách hàng',
                        navigation: 'customers'
                    },
                    {
                        label: 'Vé đã phát hành',
                        navigation: 'issued-tickets'
                    }
                ]
            },
            {
                label: 'Vật tư hệ thống',
                icon: faBuilding,
                items: [
                    {
                        label: 'Tuyến tàu',
                        navigation: 'lines'
                    },
                    {
                        label: 'Nhà ga',
                        navigation: 'stations'
                    },
                    {
                        label: 'Tra cứu giá vé',
                        navigation: 'ticket-prices'
                    }
                ]
            }
        ]
    },
    {
        groupName: 'Mua bán vé',
        visibleBy: ['staff'],
        items: [
            {
                label: 'Hỗ trợ mua vé',
                icon: faTicket,
                items: [
                    {
                        label: 'Vé một chặng',
                        navigation: 'issue-single-journey-ticket'
                    },
                    {
                        label: 'Vé thời hạn',
                        navigation: 'issue-subscription-ticket'
                    }
                ]
            }
        ]
    },
    {
        groupName: 'Quản lý hệ thống',
        visibleBy: ['admin'],
        items: [
            {
                label: 'Nhân sự',
                icon: faUserFriends,
                items: [
                    {
                        label: 'Nhân viên',
                        navigation: 'staffs'
                    },
                    {
                        label: 'Admin',
                        navigation: 'bookings'
                    }
                ]
            },
            {
                label: 'Giá vé',
                icon: faCoins,
                items: [
                    {
                        label: 'Cập nhật giá vé',
                        navigation: 'ticket-prices-update'
                    }
                ]
            },
            {
                label: 'Thống kê',
                icon: faCashRegister,
                items: [
                    {
                        label: 'Doanh thu',
                        navigation: 'transactions'
                    }
                ]
            }
        ]
    }
]

export const MOTION_EFFECTS = {
    openSubMenu: { height: 'fit-content' },
    closeSubMenu: { height: 0 },
    wideScreenVariants: {
        open: {
            width: '16.5rem',
            transition: {
                damping: 40
            }
        },
        closed: {
            width: '4rem',
            transition: {
                damping: 40
            }
        }
    }
}

const DashboardSidebar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector((state: RootState) => state.auth.user)
    const [isOpen, setIsOpen] = useState(true)
    const [openedSubMenuIndex, setOpenedSubMenuIndex] = useState<string | null>(null)
    const sidebarRef = useRef(null)

    useEffect(() => {
        setOpenedSubMenuIndex(null)
    }, [isOpen])

    return (
        <div>
            <motion.div
                ref={sidebarRef}
                variants={MOTION_EFFECTS.wideScreenVariants}
                animate={isOpen ? 'open' : 'closed'}
                initial={{ x: 0 }}
                className="sticky top-0 flex h-screen w-64 max-w-[16.5rem] flex-col overflow-hidden bg-white shadow-xl"
            >
                <div
                    className="mx-3 flex cursor-pointer items-center justify-center gap-2.5 border-b border-slate-300 py-3 font-medium"
                    style={{
                        height: 'var(--sidebar-logo-height)'
                    }}
                    onClick={() => navigate('/')}
                >
                    <img src="/images/logo-hurc.png" width={45} alt="" />
                    <span className={`text-primary text-[22px] font-bold tracking-widest whitespace-pre ${!isOpen && 'hidden'}`}>HCMC METRO</span>
                </div>

                <div className="flex flex-col" style={{ height: 'calc(100% - var(--sidebar-logo-height))' }}>
                    <ul className="scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100 flex flex-1 flex-col gap-1 overflow-hidden overflow-y-auto px-2.5 py-5 text-[0.9rem] font-medium whitespace-pre">
                        <li>
                            <NavLink to={'/'} className="link text-primary">
                                <div className="flex w-6 justify-center">
                                    <FontAwesomeIcon icon={faHome} className="min-w-max" size="xl" />
                                </div>
                                Về trang chủ
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to={'/dashboard'} end className="link text-primary">
                                <div className="flex w-6 justify-center">
                                    <FontAwesomeIcon icon={faChartLine} className="min-w-max" size="xl" />
                                </div>
                                Tình hình hoạt động
                            </NavLink>
                        </li>

                        {isOpen && (
                            <div className="border-t border-slate-300">
                                {SUB_MENU_LIST.map(group => {
                                    if (group.visibleBy.includes(user.role)) {
                                        return (
                                            <div key={group.groupName} className="border-b border-slate-300 pt-2.5 pb-1.5">
                                                <small className="mb-2 inline-block pl-3 text-slate-500 select-none">{group.groupName}</small>
                                                {group.items.map(({ label, icon, items }) => (
                                                    <div key={label} className="flex flex-col gap-1">
                                                        <SidebarSubMenu
                                                            label={label}
                                                            Icon={icon}
                                                            items={items}
                                                            isOpened={openedSubMenuIndex === label}
                                                            handleToggle={() => setOpenedSubMenuIndex(openedSubMenuIndex === label ? null : label)}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        )}
                    </ul>

                    <div className="z-50 mt-auto max-h-48 w-full text-sm font-medium whitespace-pre">
                        {isOpen && (
                            <div className="flex items-center justify-between border-y border-slate-300 p-4">
                                <div>
                                    <p>{user.fullName}</p>
                                    <small>
                                        Mã {user.role === 'staff' ? 'nhân viên' : 'admin'}: {user.userId}
                                    </small>
                                </div>
                                <Button
                                    text="Đăng xuất"
                                    variant="gradient"
                                    className="min-w-fit rounded-2xl px-3 py-1.5 text-xs"
                                    onClick={() => dispatch(signOut())}
                                />
                            </div>
                        )}

                        <button className="flex w-full cursor-pointer items-center justify-center p-3" onClick={() => setIsOpen(prev => !prev)}>
                            <FontAwesomeIcon icon={faChevronRight} className={`${!isOpen && 'rotate-180'} duration-200 ease-in-out`} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default DashboardSidebar
