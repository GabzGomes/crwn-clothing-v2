import { Link } from 'react-router-dom';
import './directory-item.styles.scss';

const DirectoryItem = ({category}) => {
    const { imageUrl, title, linkUrl } = category;
    return (
        <Link className="directory-item-container" style={{backgroundImage: `url(${imageUrl})`}} to={`${linkUrl}`}>
            <div className='background-image' />
            <div className="body">
                <h2>{title.charAt(0).toUpperCase() + title.slice(1)}</h2>
                <p>Shop Now</p>
            </div>
        </Link>
    )
}

export default DirectoryItem;