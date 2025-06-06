import { useMutation } from '@tanstack/react-query'
import { onError } from '@/utils/errorsHandler'
import useAxiosIns from '@/hooks/useAxiosIns'

const fileService = () => {
    const axios = useAxiosIns()
    const uploadMutation = useMutation({
        mutationFn: ({ file, folder }: { file: string | Blob; folder: string }) => {
            const form = new FormData()
            form.append('file', file)
            return axios.postForm(`/files/upload-image?folder=${folder}`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        },
        onError: onError
    })

    const deleteMutation = useMutation({
        mutationFn: (imageUrl: string) => axios.post('/files/delete-image', { imageUrl }),
        onError: onError
    })

    return { uploadMutation, deleteMutation }
}

export default fileService
