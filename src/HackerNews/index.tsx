import React, { useState, useEffect } from 'react';
import "./style.css";

function NewsList() {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);

  const fetchNews = async () => {
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/newstories.json`);
    const newsIds = await response.json();
    const slicedIds = newsIds.slice((page - 1) * 30, page * 30);
    const newsItems = await Promise.all(slicedIds.map(async (id) => {
      const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
      return await res.json();
    }));
    setNews((prevNews) => [...prevNews, ...newsItems]);
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchNews();
    console.log(news, "newwwwwww")
  }, []);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 100 && news.length) {
      fetchNews();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [news]);

  return (
    <>
        <h1 className='main-title'>Top News App</h1>
        {/* {JSON.stringify(news)} */}
        <div className="news-container">
      {news.map((item, idx) => (
        <div key={idx} className='news-card'>
            <details>
                <summary>
                    {item.title}
                </summary>
                <p className='title'>{item.title}</p>
                <a className='link' target='blank' href={item.url}>Click to View</a>
            </details>
          <div className="type">{item.type} by {item.by}</div>
        </div>
      ))}
      </div>
    </>
  );
}

export default NewsList;
