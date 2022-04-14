import { useContext } from 'react';

import CategoryPreview from '../../components/categories-preview/category-preview.component';
import { CategoriesContext } from '../../contexts/categories.context';

const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext);
    return (
        <>
            {Object.keys(categoriesMap).map((title) => {
                const products = categoriesMap[title];
                return <CategoryPreview key={title} title={title} products={products} />
            })}
        </>
        
    );
}

export default CategoriesPreview;