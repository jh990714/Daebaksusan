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


	
	const [products, setProducts] = useState<Product[]>([]);
	const [colums, setColums] = useState<number>(4);
	const [rows, setRows] = useState<number>(4);
	const [visibleCount, setVisibleCount] = useState<number>(colums*rows);

	let pageTitle;

	switch (path) {
		case 'best':
			pageTitle = '인기 상품';
			break;
		case 'new':
			pageTitle = '최신 상품';
			break;
		case 'recommendedProducts':
			pageTitle = '추천 상품';
			break;
		case 'all':
			pageTitle = '모든 상품';
			break;
		case 'categoryProducts/category':
			pageTitle = category.name;
			break;
		case 'categoryProducts/category/sub':
			pageTitle = category.name;
			break;
		case 'search':
			pageTitle = '\'' + category + '\'의 검색 결과 입니다.';
			break;
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				let url = '';
				switch (path) {
					case 'categoryProducts/category':
						url = `${process.env.REACT_APP_API_URL}/product/category/${category.id}`;
						break;
					case 'categoryProducts/category/sub':
						url = `${process.env.REACT_APP_API_URL}/product/category/sub/${category.id}`;
						break;
					case 'search':
						url = `${process.env.REACT_APP_API_URL}/product/search?query=${category}`;
						break;
					default:
						url = `${process.env.REACT_APP_API_URL}/product/${path}`;
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

	useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 480) {

				setVisibleCount(2*rows)
                setColums(2);
				
            } else if (window.innerWidth < 768) {
				setVisibleCount(3*rows)
				setColums(3);
				
			} else if (window.innerWidth < 1024) {
				setVisibleCount(3*rows)
                setColums(3);
            }
			else {
				setColums(4);
			}
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


	// 현재 페이지에 보여줄 상품 데이터 계산
	const getCurrentPageData = () => {
		return products.slice(0, visibleCount);
	};

	const handleMoreClick = () => {
		setVisibleCount(prevCount => Math.min(prevCount + (rows*colums), products.length));
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
							<li key={product.productId} className={index >= visibleCount - colums && visibleCount < products.length ? `${styles.blurEffect}` : ''}>
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
