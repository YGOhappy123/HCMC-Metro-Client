const POSTER_IMAGES = [
    'https://images.unsplash.com/photo-1549294413-26f195200c16?q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1600011689032-8b628b8a8747?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
]

const AuthCarousel = () => {
    return (
        <div className="carousel h-full w-full">
            {POSTER_IMAGES.map((poster, index) => {
                const posterId = `slide${index}`
                const prevPosterHref = `#slide${index > 0 ? index - 1 : POSTER_IMAGES.length - 1}`
                const nextPosterHref = `#slide${index < POSTER_IMAGES.length - 1 ? index + 1 : 0}`

                return (
                    <div key={index} id={posterId} className="carousel-item relative w-full overflow-hidden rounded-lg">
                        <img src={poster} className="h-full w-full object-cover" />
                        <div className="absolute top-1/2 right-5 left-5 flex -translate-y-1/2 transform justify-between">
                            <a href={prevPosterHref} className="btn btn-circle bg-white/50 hover:scale-108">
                                ❮
                            </a>
                            <a href={nextPosterHref} className="btn btn-circle bg-white/50 hover:scale-108">
                                ❯
                            </a>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default AuthCarousel
