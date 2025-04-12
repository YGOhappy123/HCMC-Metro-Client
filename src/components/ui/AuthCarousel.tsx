const POSTER_IMAGES = [
    'https://img.idesign.vn/2021/08/cd9c2b113750929-602e54e1756b1.gif',
    'https://img.idesign.vn/2021/08/0d2e3e113750929-602e54e22649f.gif',
    'https://img.idesign.vn/2021/08/70e1a4113750929-602e4dc676aa2.gif',
    'https://img.idesign.vn/2021/08/2f446a113750929-602e4eeee33c1.gif',
    'https://img.idesign.vn/2021/08/4f4a7e113750929-602e54e1e38e2.gif'
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
