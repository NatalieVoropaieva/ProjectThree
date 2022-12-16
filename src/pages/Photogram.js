import '../App.scss';
import Layout from "./Layout";
import {useEffect, useState} from "react";
import {configure} from "@testing-library/react";
import './Photogram.scss';

const mockedImages = [
    {
        url: 'https://images.unsplash.com/photo-1670918353442-98b2fb11810b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
        category: 'people'
    },
    {
        url: 'https://images.unsplash.com/photo-1670993746371-3a6f009f16ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        category: 'nature'
    },
    {
        url: 'https://images.unsplash.com/photo-1670843622929-8c748ce1b067?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMTN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        category: 'food'
    },
    {
        url: 'https://images.unsplash.com/photo-1671099484139-b4674a9bf986?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        category: 'people'
    },
    {
        url: 'https://images.unsplash.com/photo-1671119904316-3e7b29f954f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyM3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        category: 'nature'
    },
    {
        url: 'https://images.unsplash.com/photo-1671050579276-b1f0dfbefe76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        category: 'nature'
    },
    {
        url: 'https://images.unsplash.com/photo-1671006829632-e134a6811ab5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5M3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        category: 'cars'
    },
    {
        url: 'https://images.unsplash.com/photo-1671027274452-e23c3b78570e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMDB8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        category: 'buildings'
    },


]
const NUMBER_PER_PAGE = 6;

const Photogram = () => {
    const [images, setImages] = useState(mockedImages);
    const [filteredImages, setFilteredImages] = useState(images);
    const [pageAmount, setPageAmount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        const set = new Set();
        images.forEach(image => set.add(image.category));
        setCategories(Array.from(set));
    }, []);

    useEffect(() => {
        setPageAmount(Math.ceil(filteredImages.length / NUMBER_PER_PAGE));
    }, [filteredImages]);

    const setNewPage = (page) => {
        let newPage = page;
        if (page < 1) {
            newPage = 1;
        }
        if (page > pageAmount) {
            newPage = pageAmount;
        }
        setCurrentPage(newPage);
    }

    const paginate = (array, pageNumber) => {
        return array.slice((pageNumber - 1) * NUMBER_PER_PAGE, pageNumber * NUMBER_PER_PAGE);
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const newFilteredImages = images.filter((image) => image.category.includes(search));
        setFilteredImages(newFilteredImages);
        setFilters([]);
    }

    const onSearch = event => {
        setSearch(event.target.value)
        setCurrentPage(1)
    }

    const toggleFilter = (event) => {
        const category = event.target.name;
        const isChecked = event.target.checked;
        let newFilters = [];
        if (isChecked) {
            newFilters = [...filters, category];
        } else {
            newFilters = filters.filter(f => f !== category);
        }
        setFilters(newFilters);
        setSearch("");
        setCurrentPage(1)

        const newFilteredImages = images.filter((image) => newFilters.length === 0 || newFilters.includes(image.category));
        setFilteredImages(newFilteredImages);
    }


    const currentImages = paginate(filteredImages, currentPage);
    return (
        <Layout>
            <div className='container'>
                <div className='search'>
                    <form onSubmit={handleSearchSubmit}>
                        <input type="search" onChange={onSearch} value={search || ""} placeholder='Search for...'/>
                        <input type="submit" hidden/>
                    </form>
                </div>
                <div className='filters'>
                    {categories.map(category => {
                        return (
                            <label className='label'>
                                <div className={`fake-checkbox ${filters.includes(category) ? 'checked' : ''}`}>
                                </div>
                                <input className='checkbox'
                                       type="checkbox" name={category} onChange={toggleFilter}
                                       checked={filters.includes(category)}/>
                                {category}
                            </label>
                        )
                    })}
                </div>
                <div className='gallery'>
                    {currentImages.map((image, index) => {
                        return (
                            <figure className='image-container'>
                                <img src={image.url} key={index} alt="image"/>
                                <figcaption className='caption'>{image.category}</figcaption>
                            </figure>

                        )
                    })}
                </div>
                <div className='pagination-container'>
                    <button  onClick={() => setNewPage(currentPage - 1)} className='pagination-btn'>&#10094;</button>
                    {Array.from(Array(pageAmount).keys()).map(number => {
                        return <button  key={number} onClick={() => setNewPage(number + 1)} className='pagination-btn'>{number + 1}</button>
                    })}
                    <button  onClick={() => setNewPage(currentPage + 1)} className='pagination-btn'>&#10095;</button>
                </div>
            </div>

        </Layout>
    )
}
export default Photogram;
