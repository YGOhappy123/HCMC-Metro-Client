import { Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import { EditProfilePage, ChangeAvatarPage, ChangePasswordPage, ManageOrdersPage } from '@/pages/ProfilePage'
import ProfileLayout from '@/layouts/ProfileLayout'
import ErrorPage from '@/pages/ErrorPage'
import AuthProtector from '@/components/container/AuthProtector'

const ProfileRoutes = [
    {
        path: '/profile',
        element: (
            <Suspense>
                <AuthProtector children={<ProfileLayout />} redirect="/auth" allowedRoles={['customer', 'staff', 'admin']} />
            </Suspense>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <Navigate to="/profile/edit" replace />
            },
            {
                path: 'edit',
                element: <EditProfilePage />
            },
            {
                path: 'change-avatar',
                element: <ChangeAvatarPage />
            },
            {
                path: 'change-password',
                element: <ChangePasswordPage />
            },
            {
                path: 'my-orders',
                element: <AuthProtector children={<ManageOrdersPage />} redirect="/auth" allowedRoles={['customer']} />
            }
        ]
    }
]

export default ProfileRoutes
