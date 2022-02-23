import React, { useState } from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import { useGetNewsQuery } from './NewsApi';
import { newsArticle } from './NewsTypes';
import NewsSnippet from './NewsSnippet';

export default function NewsList() {
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setsearchTerm] = useState('');

  const latestNews = useGetNewsQuery({ q: searchTerm });
  const latestNewsSnippets = latestNews?.data?.articles?.map((article: newsArticle) => {
    return (
      <NewsSnippet
        key={article.title}
        title={article.title}
        author={article.author}
        content={article.content}
        description={article.description}
        publishedAt={article.publishedAt}
        url={article.url}
        urlToImage={article.urlToImage}
        source={article.source}
      />
    );
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setsearchTerm(searchInput);
  };

  return (
    <DefaultLayout>
      <h1 className="font-semibold text-3xl font-serif my-8">Latest News</h1>

      <form className="flex my-4" onSubmit={handleSubmit}>
        <label className="block">
          <input
            data-cy="search-input"
            type="text"
            name="search"
            className="
                    block
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
            placeholder="Search here"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
        </label>

        <button
          data-cy="search-submit"
          type="submit"
          disabled={latestNews.isFetching}
          className="rounded-md flex bg-indigo-500 font-bold text-white p-2 px-6 grow-0 ml-4 items-center">
          {latestNews.isFetching && (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          Search
        </button>
      </form>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-4">{latestNewsSnippets}</main>
    </DefaultLayout>
  );
}
