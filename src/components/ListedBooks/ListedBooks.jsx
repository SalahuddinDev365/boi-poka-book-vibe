import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { getStoredReadList } from '../../utility/addToDb';
import Book from '../Book/Book';

const ListedBooks = () => {
    const [readList, setReadList] = useState([]);
    const [sort, setSort] = useState('');
    const allBooks = useLoaderData();

    // ideally we will directly get the read book list from the database

    useEffect(() => {
        const storeReadList = getStoredReadList();
        const storedReadListInt = storeReadList.map(id => parseInt(id));
        console.log(storeReadList, storedReadListInt, allBooks)

        const readBookList = allBooks.filter(book => storedReadListInt.includes(book.bookId));
        setReadList(readBookList);
    }, [])

    const handleSort = sortType => {
        setSort(sortType)

            if(sortType === 'No Of pages'){
                const sortedReadList = [...readList].sort((a, b) => a.totalPages - b.totalPages);
                setReadList(sortedReadList);
            }
            if(sortType === 'Ratings'){
                const sortedReadList = [...readList].sort((a, b) => a.rating - b.rating);
                setReadList(sortedReadList);
            }
    }

    return (
        <div>
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn m-1">
                    {sort ? `Sort by: ${sort}` : 'Sort by'}
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li onClick={() => handleSort('Ratings')}><a>Ratings</a></li>
                    <li onClick={() => handleSort('No Of pages')}><a>No Of Pages</a></li>
                </ul>
            </div>
            <h3 className="text-3xl my-8">Listed Books</h3>
            <Tabs>
                <TabList>
                    <Tab>Read List</Tab>
                    <Tab>Wish List</Tab>
                </TabList>

                <TabPanel>
                    <h2 className='text-2xl'>Books I read: {readList.length}</h2>
                    {
                        readList.map(book => <Book key={book.bookid} book={book}></Book>)
                    }
                </TabPanel>
                <TabPanel>
                    <h2 className='text-2xl'>My wish list</h2>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default ListedBooks;