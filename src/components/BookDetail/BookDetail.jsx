import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { addToStoreReadList } from '../../utility/addToDb';

const BookDetail = () => {

    const { bookId } = useParams();
    const data = useLoaderData();
    const id = parseInt(bookId);
    // console.log(typeof bookId, typeof id, typeof data[0].bookId)

    const book = data.find(book => book.bookId === id);
    
    const {bookId: currentBookId, image} = book;


    const handleMarkASRead = (id) => {
        /**
         * Understand what to store or save: => bookId
         * 2. where to store: database or another
         * 3. array, list, collection: 
         * 4. check: if the book is already in the readList.
         * 5. if not, then add the book to the list
         * 6. if yes, do not add tthe book
         */
        addToStoreReadList(id);
    }


    return (
        <div className='py-6'>
            <h2>BookDetail: {bookId}</h2>
            <img className='h-[144px]' src={image} alt="" />
            <button onClick={() => handleMarkASRead(bookId)} className='btn btn-outline btn-accent mr-4 mt-4'>Mark as Read</button>
            <button className='btn btn-accent'>Add to Wishlist</button>
        </div>
    );
};

export default BookDetail;