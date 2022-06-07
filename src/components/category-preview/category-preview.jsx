import { CategoryPreviewContainer, CategoryTitle, Preview } from './category-preview.styles';
import ProductCard from '../product-card/product-card';

const CategoryPreview = ({ title, products }) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <CategoryTitle to={title}>{title.toUpperCase()}</CategoryTitle>
            </h2>
            <Preview>
                {
                    products.filter((_, ind) => ind < 4).map((product) => <ProductCard key={product.id} product={product} />)
                }
            </Preview>
        </CategoryPreviewContainer>
    );
};

export default CategoryPreview;