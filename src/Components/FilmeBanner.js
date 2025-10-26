import './FilmeBanner.css'

function FilmeBanner({ filme }) {
    return (
        <div className='Banner'>
            <img src={filme.fotoThumbnail} className="BannerImg" alt={filme?.titulo || 'Banner'} />
        </div>
    )
}

export default FilmeBanner