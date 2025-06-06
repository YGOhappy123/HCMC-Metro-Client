import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { setUser } from '@/slices/authSlice'
import customerService from '@/services/customerService'
import staffService from '@/services/staffService'
import adminService from '@/services/adminService'
import fileService from '@/services/fileService'
import useTitle from '@/hooks/useTitle'
import Button from '@/components/common/Button'

const ChangeAvatarPage = () => {
    useTitle('HCMC Metro | Ảnh Đại Diện')
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.auth.user)
    const { uploadMutation, deleteMutation } = fileService()
    const { updateCustomerMutation } = customerService({ enableFetching: false })
    const { updateStaffMutation } = staffService({ enableFetching: false })
    const { updateAdminMutation } = adminService({ enableFetching: false })

    const [avatar, setAvatar] = useState(user?.avatar)

    const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        if (uploadMutation.isPending) return
        const file = e.target.files?.[0]
        if (file) {
            await uploadMutation.mutateAsync({ file, folder: 'avatar' }).then(res => {
                setAvatar(res.data.data?.imageUrl)
            })
        }
    }

    const updateAvatar = () => {
        if (user.role === 'customer') {
            updateCustomerMutation.mutateAsync({ data: { avatar } }).then(() => dispatch(setUser({ ...user, avatar })))
        } else if (user.role === 'staff') {
            updateStaffMutation.mutateAsync({ staffId: user.userId, data: { avatar } }).then(() => dispatch(setUser({ ...user, avatar })))
        } else {
            updateAdminMutation.mutateAsync({ data: { avatar } }).then(() => dispatch(setUser({ ...user, avatar })))
        }
    }

    const cancelAvatarChange = () => {
        deleteMutation.mutate(avatar)
        setAvatar(user?.avatar)
    }

    return (
        <div className="flex w-full flex-1 flex-col gap-10 lg:w-auto lg:flex-1">
            <h3 className="font-oswald text-primary -mb-4 text-4xl leading-[50px] uppercase">Cập nhật ảnh đại diện</h3>
            <div className="flex justify-center">
                <div className="border-primary bg-ivory relative flex aspect-square h-[200px] items-center justify-center rounded-full border-4 p-1">
                    <img src={avatar} alt="user avatar" className="h-full w-full rounded-full object-cover" />

                    <label
                        htmlFor="image"
                        className="bg-primary hover:bg-primary/90 absolute right-2 bottom-2 flex aspect-square w-10 cursor-pointer items-center justify-center rounded-full"
                    >
                        <FontAwesomeIcon icon={faEdit} className="text-white" />
                    </label>

                    <input type="file" name="image" id="image" accept="image/*" className="hidden" onChange={handleUpload} />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
                <Button
                    text="Cập nhật"
                    disabled={!avatar || avatar === user?.avatar}
                    onClick={updateAvatar}
                    variant="gradient"
                    className="w-full rounded-full text-lg font-semibold capitalize"
                />
                <Button
                    text="Hủy bỏ"
                    disabled={!avatar || avatar === user?.avatar}
                    onClick={cancelAvatarChange}
                    className="w-full rounded-full text-lg font-semibold capitalize"
                />
            </div>
        </div>
    )
}

export default ChangeAvatarPage
