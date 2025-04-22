import { twMerge } from 'tailwind-merge'

type BackgroundPosterProps = {
    imageUrl: string
    size: 'big' | 'small'
    className?: string
}

const BackgroundPoster = ({ imageUrl, size, className = '' }: BackgroundPosterProps) => {
    return (
        <div
            className={twMerge(
                `relative -z-[1] bg-cover bg-center after:pointer-events-none after:absolute after:inset-0 after:bg-linear-[90deg,rgba(38,91,158,0.95)_36%,rgba(0,0,0,0.13)_100%] after:content-[""] ${size === 'big' ? 'pt-[42%]' : 'pt-[32%]'} ${className}`
            )}
            style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
    )
}

export default BackgroundPoster
