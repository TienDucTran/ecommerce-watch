import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import { useEffect, useState, useRef } from 'react';

// import { CloseIcon, LoadingIcon, SearchIcon } from '~/components/Icons';
import { IoIosClose, IoIosSearch  } from "react-icons/io";
import { BiLoader } from "react-icons/bi";
import  Wrapper   from './Popper/Wrapper';
import styles from './Search.module.scss';
import { useDebounce } from '../../../../hooks';
import * as searchServices from '../../../../services/searchService'
import ProductItem from './ProductItem'

const cx = classNames.bind(styles)
function Search() {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showResult, setShowResult] = useState(true)
    const [loading, setLoading] = useState(false)

    const inputRef = useRef()
    const debounced = useDebounce(searchValue, 600)


    const handleChange = (e) => {
        const searchValue = e.target.value
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue)
        }
    }

    const handleClear = () => {
        setSearchValue('')
        setSearchResult([])
        inputRef.current.focus()
    }

    const handleHideResult = () => {
        setShowResult(false)

    }
    const handleFinish = () => {
        setSearchValue('')
        setSearchResult([])
    }

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([])
            return
        }
        const fetchApi = async () => {
            setLoading(true)
            const result = await searchServices.getSearch(debounced)
            setSearchResult(result)
            setLoading(false)


        }
        fetchApi()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounced])
    return (
        //! Warning tippy -> using <div> tag to prevent report warning
        <div>
            <HeadlessTippy
                interactive
                visible={searchResult.length && showResult}
                render={attrs => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <Wrapper className={cx('search-popper')}>
                            <h4 className={cx('search-title')}>
                                Products
                            </h4>
                            {searchResult.map(result => (
                                <ProductItem key={result._id} data={result} onclick={handleFinish} />
                            ))}
                        </Wrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder='Search your product!'
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!setSearchValue && !loading && (
                        <button
                            className={cx('close-icon')}
                            onClick={handleClear}>
                            <IoIosClose />
                        </button>
                    )}

                    {loading && <BiLoader className={cx('loading-icon')} />}

                    <button className={cx('search-btn')} 
                    onMouseDown={e => e.preventDefault()}>
                        <IoIosSearch />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;