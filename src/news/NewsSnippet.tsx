import React from 'react';
import { newsArticle } from './NewsTypes';
import { DateTime } from 'luxon';

export default function NewsSnippet({
  title,
  description,
  author,
  url,
  urlToImage,
  content,
  publishedAt,
  source,
}: newsArticle) {
  return (
    <article className="bg-white rounded-lg flex flex-col">
      <img
        className="lg:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72 rounded w-full object-cover object-center"
        src={urlToImage}
        alt="Image Size 720x400"
      />
      <div className="p-4 grow flex flex-col justify-items-stretch			">
        <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
          {DateTime.fromISO(publishedAt).toLocaleString(DateTime.DATETIME_MED)} |{' '}
          {source.name}
        </h3>
        <h2 className="block grow">{title}</h2>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className=" text-center bg-black font-bold text-white p-2 inline-block mt-4 -mb-4 -mx-4"
          href={url}
        >
          Read More
        </a>
      </div>
    </article>
  );
}
