import { useSelector } from 'react-redux';

import CategoryPreview from '../../components/categories-preview/category-preview.component';
import Spinner from '../../components/spinner/spinner.component';

import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/categories.selector';

const CategoriesPreview = () => {
    const categoriesMap  = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading)
    console.log(isLoading)
    return (
        <>
            { isLoading ? (<Spinner/>) : 
            (
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return <CategoryPreview key={title} title={title} products={products} />
                })
            )
            }
            
        </>
        
    );
}

export default CategoriesPreview;