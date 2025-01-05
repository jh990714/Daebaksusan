import { ChangeEvent, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import logo from '../assets/logo_sample.png'
import styles from './NavigationBar.module.css'
import cartIcon from '../assets/cart.png'
import loginIcon from '../assets/login.png'
import newIcon from '../assets/newIcon.png'
import bestIcon from '../assets/bestIcon.png'
import allIcon from '../assets/allIcon.png'
import menuIcon from '../assets/tabBar.png'
import homeICon from '../assets/homeIcon.png'
import categoryIcon from '../assets/categoryIcon.png'

import newBlueIcon from '../assets/newBlueIcon.png'
import bestBlueIcon from '../assets/bestBlueIcon.png'
import allBlueIcon from '../assets/allBlueIcon.png'
import cartBlueIcon from '../assets/cartBlue.png'
import loginBlueIcon from '../assets/loginBlue.png'
import searchButtonIcon from '../assets/searchButton.png'



import searchIcon from '../assets/search.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Category } from 'types';
import useDebounce from 'hook/useDebounce'
import { useAuthContext } from 'hook/AuthProvider'
import IconComp from 'components/NavigationBar/IconComp'
import { useCart } from 'hook/CartProvider'

type SearchResults = Array<any>

export const NavigationBar = () => {
    const { isLoggedIn, setIsLoggedIn } = useAuthContext();
    const inputRef = useRef<HTMLInputElement>(null);
    const searchResultsRef = useRef<HTMLUListElement>(null);
    const inputMobileRef = useRef<HTMLInputElement>(null);
    const searchResultsMobileRef = useRef<HTMLUListElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isDragging, setIsDragging] = useState(false); // 드래그 상태
    const [dragStart, setDragStart] = useState(0); // 드래그 시작 위치

    const [isNavVisible, setIsNavVisible] = useState<boolean>(true);
    const [prevScrollY, setPrevScrollY] = useState<number>(0);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState<boolean>(false);
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [query, setQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<SearchResults>([]);
    const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
    const debouncedQuery = useDebounce<string>(query, 300);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    // const [cartItems, setCartItems] = useState<Cart[]>([]);

    const { cartItems } = useCart();
    

    useEffect(() => {
        setIsCategoriesOpen(false);
        toggleSearch(false);
    }, [location]);


    useEffect(() => {
        // API 호출
        fetch(`${process.env.REACT_APP_API_URL}/categories`)
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);


    useEffect(() => {
        console.log('로그인 상태가 변경되었습니다:', isLoggedIn);
    }, [isLoggedIn]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsNavVisible(currentScrollY <= prevScrollY || currentScrollY === 0);
            setPrevScrollY(currentScrollY);
            setIsCategoriesOpen(false);
            setSearchResults([]);
            setIsSearchOpen(false);

        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollY]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!debouncedQuery) {
                setSearchResults([]);
                return;
            }
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/product/search/sub?query=${debouncedQuery}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch search results');
                }
                const data = await response.json();
                setSelectedItemIndex(null);
                setSearchResults(data.slice(0, 5));
            } catch (error) {
                console.error('Error fetching search results:', error);
                setSearchResults([]);
            }
        };
        fetchSearchResults();
        console.log(`API를 호출하여 검색 결과를 업데이트: ${debouncedQuery}`);
    }, [debouncedQuery]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                closeCategory(); // 외부 클릭 시 카테고리 닫기
            }
        };

        document.addEventListener('mousedown', handleClickOutside); // 외부 클릭 이벤트 리스너
        return () => {
            document.removeEventListener('mousedown', handleClickOutside); // 컴포넌트 언마운트 시 이벤트 제거
        };
    }, []);

    const handleSearchItemClick = useCallback((index: number) => {
        setSelectedItemIndex(index);
        setQuery(searchResults[index].name);
        if (inputRef.current) {
            inputRef.current.focus(); // 포커스 설정
        }
        if (inputMobileRef.current) {
            inputMobileRef.current.focus(); // 포커스 설정
        }

    }, [searchResults]);

    const handleSearch = () => {
        if (debouncedQuery === '') {
            return
        }

        navigate(`/product/search/${debouncedQuery}`);

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
            console.log(event.key);
            event.preventDefault();

            if (searchResultsRef.current) {
                searchResultsRef.current.focus();
            }

            if (searchResultsMobileRef.current) {
                searchResultsMobileRef.current.focus();
            }


        } else if (event.key === 'Enter') {
            event.preventDefault();
            handleSearch();
        }

    }, [handleSearch]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    }

    const openCategory = () => {
        setIsCategoriesOpen(true); // 카테고리 메뉴 토글
    };

    const closeCategory = () => {
        setIsCategoriesOpen(false); // 카테고리 닫기
    };

    const toggleCategory = () => {
        setIsCategoriesOpen((prev) => !prev);
    }

    const toggleSearch = (isOpen: boolean) => {
        setIsSearchOpen(isOpen);
        setSearchResults([]);
    }

    // 드래그 이벤트 처리
    const handleMouseDown = (e: { clientY: SetStateAction<number> }) => {
        setIsDragging(true);
        setDragStart(e.clientY); // 드래그 시작 위치
    };

    const handleMouseMove = (e: { clientY: number }) => {
        if (!isDragging) return;
        const distance = e.clientY - dragStart; // 드래그한 거리
        if (menuRef.current) {
            menuRef.current.style.top = `${distance}px`; // 메뉴를 드래그 위치로 이동
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false); // 드래그 종료
    };

    useEffect(() => {
        // 드래그 이벤트 리스너
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragStart]);

    useEffect(() => {
        console.log(isCategoriesOpen);
    }, [isCategoriesOpen]);


    const cartSize = cartItems.length;
    return (
        <nav className={styles.navContainer} onMouseLeave={closeCategory}>
            <div className={`${styles.navBar} ${isNavVisible ? styles.open : styles.close}`}>
                {/* Left Section */}
                <div className={styles.navLeft}>
                    <Link to="" className={styles.logo}>
                        <img src={logo} alt="로고" width="130" height="auto" />
                    </Link>
                    {/* <div className={styles.menuBar}>
                        <img
                            src={searchIcon}
                            alt="검색"
                            className={styles.icon}
                            style={{ width: 30, height: 30 }}
                            onClick={() => toggleSearch(!isSearchOpen)}
                        />
                        <img
                            src={menuIcon}
                            alt="메뉴"
                            className={styles.icon}
                            style={{ width: 30, height: 30 }}
                            onClick={toggleMenue}
                        />
                    </div> */}
                </div>

                {/* Navigation Menu */}
                <div className={styles.navMenu}>
                    <div className={styles.productCategory}>
                        <ul>
                            {[
                                { icon: bestIcon, hoverIcon: bestBlueIcon, title: '인기 상품', link: '/best' },
                                { icon: newIcon, hoverIcon: newBlueIcon, title: '최신 상품', link: '/new' },
                                { icon: allIcon, hoverIcon: allBlueIcon, title: '모든 상품', link: '/all', hasHover: true },
                            ].map(({ icon, hoverIcon, title, link, hasHover }, index) => (
                                <li
                                    key={index}
                                    onMouseOver={hasHover ? openCategory : undefined}
                                >
                                    <IconComp defaultIcon={icon} hoverIcon={hoverIcon} title={title} link={link} />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.navRight}>
                        <div className={styles.searchContainer}>
                            <div className={styles.searchInput}>
                                <input
                                    id="searchInput"
                                    type="text"
                                    placeholder="상품을 검색해보세요!"
                                    value={query}
                                    onChange={handleInputChange}
                                    onKeyDown={handleSearchKeyDown}
                                    ref={inputRef}
                                />
                                <img
                                    src={searchIcon}
                                    alt="검색"
                                    className={styles.inputSearchicon}
                                    onClick={handleSearch}
                                />
                                <ul
                                    id="searchResults"
                                    className={styles.searchResults}
                                    tabIndex={0}
                                    onKeyDown={handleKeyDown}
                                    ref={searchResultsRef}
                                >
                                    {searchResults?.map((result, index) =>
                                        result?.name && (
                                            <li
                                                key={index}
                                                className={index === selectedItemIndex ? styles.selectedItem : ''}
                                                onClick={() => handleSearchItemClick(index)}
                                            >
                                                {result.name}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>

                        <div className={styles.userCategory}>
                            <ul>
                                {[
                                    { icon: loginIcon, hoverIcon: loginBlueIcon, title: isLoggedIn ? '마이페이지' : '로그인', link: isLoggedIn ? '/myPage' : '/login' },
                                    { icon: cartIcon, hoverIcon: cartBlueIcon, title: '장바구니', link: '/cart', badgeCount: cartSize },
                                ].map(({ icon, hoverIcon, title, link, badgeCount = -1 }, index) => (
                                    <li key={index}>
                                        <IconComp defaultIcon={icon} hoverIcon={hoverIcon} title={title} link={link} badgeCount={badgeCount} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Dropdown */}
            <div
                className={`${styles.categories} ${isCategoriesOpen ? styles.show : ''}`} // 상태에 따라 메뉴 표시 여부 조정
                onMouseDown={handleMouseDown}
            >
                {categories.map((category) => (
                    <div key={category.name} className={styles.categoryItem}>
                        <Link to={`/categoryProducts/${category.name}`} className={styles.categoryLink}>
                            <img
                                src={category.imageUrl || `${process.env.PUBLIC_URL}/category/default.png`}
                                alt={category.name}
                                width="40"
                            />
                            <p className={styles.categoryTitle}>{category.name}</p>
                        </Link>
                        <ul className={styles.subcategoryList}>
                            {category.subcategories.map((sub, index) => (
                                <Link
                                    key={`${category.name}_${index}`}
                                    to={`/categoryProducts/${category.name}/${sub.name}`}
                                    className={styles.subcategoryLink}
                                >
                                    <li className={styles.subcategoryItem}>{sub.name}</li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Mobile Bottom Navigation */}
            <div className={styles.mobileBottomNav}>
                <div className={styles.productUserCategory}>
                    <ul>
                        {[
                            { icon: bestIcon, hoverIcon: bestBlueIcon, title: '인기 상품', link: '/best' },
                            { icon: newIcon, hoverIcon: newBlueIcon, title: '최신 상품', link: '/new' },
                            { icon: logo, hoverIcon: logo, title: '홈', link: '/' },
                            { icon: loginIcon, hoverIcon: loginBlueIcon, title: isLoggedIn ? '마이페이지' : '로그인', link: isLoggedIn ? '/myPage' : '/login' },
                            { icon: cartIcon, hoverIcon: cartBlueIcon, title: '장바구니', link: '/cart', badgeCount: cartSize },
                        ].map(({ icon, hoverIcon, title, link, badgeCount = -1 }, index) => (
                            <li key={index}>
                                <IconComp defaultIcon={icon} hoverIcon={hoverIcon} title={title} link={link} size={35} badgeCount={badgeCount} />
                            </li>
                        ))}
                    </ul>

                    <div className={`${styles.searchInput} ${styles.hidden} ${isSearchOpen ? styles.searchOpen : ''}`}>
                        <input
                            id="searchInput"
                            type="text"
                            placeholder="상품을 검색해보세요!"
                            value={query}
                            onChange={handleInputChange}
                            onKeyDown={handleSearchKeyDown}
                            ref={inputMobileRef}
                        />
                        <img
                            src={searchIcon}
                            alt="검색"
                            className={styles.inputSearchicon}
                            onClick={handleSearch}
                        />
                        <ul
                            id="searchResults"
                            className={styles.searchResults}
                            tabIndex={0}
                            onKeyDown={handleKeyDown}
                            ref={searchResultsMobileRef}
                        >
                            {searchResults?.map((result, index) =>
                                result?.name && (
                                    <li
                                        key={index}
                                        className={index === selectedItemIndex ? styles.selectedItem : ''}
                                        onClick={() => handleSearchItemClick(index)}
                                    >
                                        {result.name}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    <img
                        src={categoryIcon}
                        alt="메뉴"
                        className={styles.categoryIcon}
                        onClick={toggleCategory}
                    />

                    <img
                        src={searchButtonIcon}
                        alt="검색"
                        className={styles.searchIcon}
                        onClick={() => toggleSearch(!isSearchOpen)}
                    />
                </div>
            </div>
        </nav>
    );

}