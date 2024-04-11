import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Product } from 'types';
import { ProductListComp } from '../components/product/ProductListComp';
import styles from './CategoryProduct.module.css';
import { useLocation, useParams } from 'react-router-dom';

interface CategoryProductProp {
	path: string;
}

export const CategoryProduct: React.FC<CategoryProductProp> = ({ path }) => {
	const category = useLocation().state.category;


	const [visibleCount, setVisibleCount] = useState<number>(16);
	const [products, setProducts] = useState<Product[]>([])

	let pageTitle;

	switch (path) {
		case './bestProducts':
			pageTitle = '인기 상품';
			break;
		case './newProducts':
			pageTitle = '최신 상품';
			break;
		case './recommendedProducts':
			pageTitle = '추천 상품';
			break;
		case './allProducts':
			pageTitle = '모든 상품';
			break;
		case './categoryProducts/category':
			pageTitle = category.name;
			break;
		case './categoryProducts/category/sub':
			pageTitle = category.name;
			break;
		case './search':
			pageTitle = '\'' + category + '\'의 검색 결과 입니다.';
			break;
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				let url = '';
				switch (path) {
					case './bestProducts':
						url = 'http://localhost:8080/product/new';
						break;
					case './newProducts':
						url = 'http://localhost:8080/product/new';
						break;
					case './allProducts':
						url = 'http://localhost:8080/product/all';
						break;
					case './categoryProducts/category':
						url = `http://localhost:8080/product/category/${category.id}`;
						break;
					case './categoryProducts/category/sub':
						url = `http://localhost:8080/product/category/sub/${category.id}`;
						break;
					case './search':
						url = `http://localhost:8080/product/search?query=${category}`;
						break;
				}

				const response = await axios.get<Product[]>(url);
				setProducts(response.data);
				

				console.log(response.data)
			} catch (error) {
				console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
			}
		};

		fetchData();
	}, [path, category]);

	// 현재 페이지에 보여줄 상품 데이터 계산
	const getCurrentPageData = () => {
		return products.slice(0, visibleCount);
	};

	const handleMoreClick = () => {
		setVisibleCount(prevCount => Math.min(prevCount + 16, products.length));
	}
	return (
		<div className={styles.homeContainer}>
			<div className={styles.productListContainer}>
				<div className={styles.productListHeader}>
					<div className={styles.productListTitle}>{pageTitle}</div>
				</div>
				<div>
					<ul className={styles.productList}>
						{getCurrentPageData().map((product: Product, index: number) => (
							<li key={product.productId} className={index >= visibleCount - 4 && visibleCount < products.length ? `${styles.blurEffect}` : ''}>
								<ProductListComp product={product} size='255px' fontSize='7px' />
							</li>
						))}
					</ul>
				</div>
			</div>
			{visibleCount < products.length && (
				<button className={styles.moreButtonContainer} onClick={handleMoreClick}>더 보 기</button>
			)}
		</div>
	)
}
