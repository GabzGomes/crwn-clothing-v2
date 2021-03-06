import './directory-item.styles.scss';

const DirectoryItem = ({category}) => {
    const { imageUrl, title } = category;
    return (
        <div className="directory-item-container" style={{backgroundImage: `url(${imageUrl})`}}>
            <div className='background-image' />
            <div className="body">
                <h2>{title.charAt(0).toUpperCase() + title.slice(1)}</h2>
                <p>Shop Now</p>
            </div>
        </div>
    )
}

export default DirectoryItem;