import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import logo from '../assets/logo.jpg'
import styles from './NavigationBar.module.css'
import cartIcon from '../assets/Cart.png'
import loginIcon from '../assets/login.png'
import newIcon from '../assets/newIcon.png'
import bestIcon from '../assets/bestIcon.png'
import menuIcon from '../assets/tabBar.png'

import searchIcon from '../assets/search.png'
import { Link, useNavigate } from 'react-router-dom'
import { Category } from 'types';
import useDebounce from 'hook/useDebounce'
import { useAuthContext } from 'hook/AuthProvider'

type SearchResults = Array<any>

export const NavigationBar = () => {
    const { isLoggedIn, setIsLoggedIn } = useAuthContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // 카테고리가 열려있는지 여부를 state로 관리
    const [categories, setCategories] = useState<Category[]>([]);
    const [query, setQuery] = useState<string>(''); // 입력 값의 타입을 string으로 명시합니다.
    const [searchResults, setSearchResults] = useState<SearchResults>([]); // 검색 결과의 타입을 명시합니다.
    const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
    const debouncedQuery = useDebounce<string>(query, 300);
    const navigate = useNavigate();
    
    useEffect(() => {
        // API 호출
        fetch('http://localhost:8080/categories')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);


    useEffect(() => {
        console.log('로그인 상태가 변경되었습니다:', isLoggedIn);
    }, [isLoggedIn]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!debouncedQuery) {
                setSearchResults([]);
                return;
            }
            try {
                const response = await fetch(`http://localhost:8080/product/search?query=${debouncedQuery}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch search results');
                }
                const data = await response.json();
                setSelectedItemIndex(null);
                setSearchResults(data);
            } catch (error) {
                console.error('Error fetching search results:', error);
                setSearchResults([]);
            }
        };
        fetchSearchResults();
        console.log(`API를 호출하여 검색 결과를 업데이트: ${debouncedQuery}`);
    }, [debouncedQuery]);

    const handleSearchItemClick = useCallback((index: number) => {
        setSelectedItemIndex(index);
        setQuery(searchResults[index].name);
        document.getElementById('searchInput')?.focus();
    }, [searchResults]);

    const handleSearch = () => {
        if (debouncedQuery === '') {
            return
        }

        navigate(`/product/search?query=${debouncedQuery}`, {
            state : { 
                category: debouncedQuery 
            }
        });

        setQuery('');
        setSearchResults([]);
    }

    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLUListElement>) => {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setSelectedItemIndex(prevIndex => (prevIndex === null ? 0 : Math.min(prevIndex + 1, searchResults.length - 1)));
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setSelectedItemIndex(prevIndex => (prevIndex === null ? 0 : Math.max(prevIndex - 1, 0)));
        } else if (event.key === 'Enter' && selectedItemIndex !== null) {
            event.preventDefault();
            handleSearchItemClick(selectedItemIndex);
        }
    }, [searchResults, selectedItemIndex, handleSearchItemClick]);

    
    const handleSearchKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            document.getElementById('searchResults')?.focus();
        } else if (event.key === 'Enter') {
            event.preventDefault();
            handleSearch();
        }
    }, [handleSearch]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    }

    const toggleCategory = () => {
        setIsOpen(!isOpen); // isOpen 상태를 토글
    };

    const closeCategory = () => {
        setIsOpen(false); // 카테고리를 닫습니다.
    };



    return (
        <nav className={styles.navContainer} onMouseLeave={closeCategory}>
            <div className={styles.navBar}>
                <div className={styles.navLeft}>
                    <Link to='' className={styles.logo}>
                        <img src={logo} alt="로고" width="180" height="180"></img>
                    </Link>

                    <div className={styles.menuIcon} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <img src={menuIcon} alt="메뉴" style={{ width: 30, height: 30 }} />
                    </div>
                </div>


                <div className={`${styles.navMenu} ${isMenuOpen ? styles.show : ''}`}>
                    <div className={styles.productCategory}>
                        <ul>
                            <li>
                                <Link to='/bestProducts' state={{ category: null }} className={styles.icon}>
                                    <img src={bestIcon} alt='인기 상품' style={{ width: 50, height: 50 }} />
                                    <span className={styles.iconTitle}> 인기 상품 </span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/newProducts' state={{ category: null }} className={styles.icon}>
                                    <img src={newIcon} alt='최신 상품' style={{ width: 50, height: 50 }} />
                                    <span className={styles.iconTitle}> 최신 상품 </span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/allProducts' state={{ category: null }} className={styles.icon}>
                                    <div className={styles.icon} onMouseEnter={toggleCategory}>
                                        <img src={cartIcon} alt='모든 상품' style={{ width: 50, height: 50 }} />
                                        <span className={styles.iconTitle}> 모든 상품 </span>
                                    </div>
                                </Link>

                            </li>
                        </ul>
                    </div>

                    <div className={styles.navRight}>
                        <div className={styles.searchContainer}>
                            <div className={styles.searchInput}>
                                <input
                                    id='searchInput'
                                    type="text"
                                    placeholder="상품을 검색해보세요!"
                                    value={query}
                                    onChange={handleInputChange}
                                    onKeyDown={handleSearchKeyDown}
                                />
                                    <img src={searchIcon} alt='검색' className={styles.icon} style={{ width: 30, height: 30 }} onClick={handleSearch} />
                            
                            </div>
                            {/* 검색 결과 리스트 */}
                            <ul  id="searchResults" className={styles.searchResults} tabIndex={0} onKeyDown={handleKeyDown}>
                                {searchResults && searchResults.map((result, index) =>
                                    result && result.name && (
                                        <li 
                                            className={index === selectedItemIndex ? styles.selectedItem : ''}
                                            key={index} onClick={() => handleSearchItemClick(index)}>
                                            {result.name} 
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div className={styles.userCategory}>
                            <ul>
                                {!isLoggedIn ? (
                                    // 로그인 되지 않았을 때 로그인 버튼 표시
                                    <li>
                                        <Link to='/login' className={styles.icon}>
                                            <img src={loginIcon} alt='로그인' style={{ width: 50, height: 50 }} />
                                            <span className={styles.iconTitle}> 로그인 </span>
                                        </Link>
                                    </li>
                                ) : (
                                    // 로그인 되었을 때 마이페이지 버튼 표시
                                    <li>
                                        {/* 마이페이지 아이콘과 링크를 여기에 구현 */}
                                        <Link to='/myPage' className={styles.icon}>
                                            <img src={loginIcon} alt='마이페이지' style={{ width: 50, height: 50 }} />
                                            <span className={styles.iconTitle}> 마이페이지 </span>
                                        </Link>
                                    </li>
                                )}
                                <li>
                                    <Link to='/cart' className={styles.icon}>
                                        <img src={cartIcon} alt='장바구니' style={{ width: 50, height: 50 }} />
                                        <span className={styles.iconTitle}> 장바구니 </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles.categories} ${isOpen ? styles.open : ''}`} onMouseLeave={closeCategory}>
                {categories.map((category) => (
                    <div key={category.name} className={styles.categoryItem}>
                            <Link to={`/categoryProducts/${category.name}`} state={{ category: category }} className={styles.categoryLink}>
                                <p className={styles.categoryTitle}>{category.name}</p>
                            </Link>

                        <ul className={styles.subcategoryList}>
                            {category.subcategories.map((sub, index) => ( // 여기서 index를 사용하여 고유한 key prop을 생성합니다.
                                <Link key={`${category.name}_${index}`} to={`/categoryProducts/${category.name}/${sub.name}`} state={{ category: sub }} className={styles.subcategoryLink}>
                                    <li className={styles.subcategoryItem}>{sub.name}</li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                ))}

            </div>

        </nav>

    )
}