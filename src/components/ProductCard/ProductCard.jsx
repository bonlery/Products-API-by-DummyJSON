import './product-card.css';

function ProductCard({product:{title,price,rating,thumbnail}}){
    return(<>
        <div className="product-card">
            <img src={thumbnail} alt="" />
            <h3>{title}</h3>
            <p>${price}</p>
            <p>{rating} Stars</p>
        </div>
    </>)
}

export default ProductCard;