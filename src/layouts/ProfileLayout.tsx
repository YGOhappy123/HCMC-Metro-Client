import { Outlet } from 'react-router-dom'
import Appbar from '@/components/layout/Appbar'
import Footer from '@/components/layout/Footer'
import ProfileSidebar from '@/components/layout/ProfileSidebar'

const ProfileLayout = () => {
    return (
        <div className="bg-ivory flex min-h-screen flex-col">
            <Appbar />
            <main className="bg-ivory flex flex-col items-center px-5 py-[100px]">
                <div className="max-w-container flex w-full flex-col items-start gap-12 lg:flex-row">
                    <ProfileSidebar />
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default ProfileLayout
