import React from 'react';

export default function Pagination({ current = 1, total = 1, onChange }) {
  if (total <= 1) return null;

  const pages = [];
  const maxShown = 5;
  let start = Math.max(1, current - Math.floor(maxShown / 2));
  let end = Math.min(total, start + maxShown - 1);
  if (end - start + 1 < maxShown) {
    start = Math.max(1, end - maxShown + 1);
  }

  for (let p = start; p <= end; p++) pages.push(p);

  const isFirstPage = current === 1;
  const isLastPage = current === total;

  return (
    <nav className="flex items-center justify-center space-x-2" aria-label="Pagination">
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={isFirstPage}
        className={`px-3 py-1 text-sm rounded-full transition-colors ${
          isFirstPage 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
            : 'bg-goldenbeige text-deepblue hover:bg-opacity-80'
        }`}
        aria-label="Halaman sebelumnya"
      >
        Prev
      </button>

      {start > 1 && (
        <>
          <button 
            onClick={() => onChange(1)} 
            className="px-3 py-1 text-sm rounded-full bg-goldenbeige text-deepblue hover:bg-opacity-80 transition-colors"
            aria-label="Halaman 1"
          >
            1
          </button>
          {start > 2 && <span className="text-white">…</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            p === current 
              ? 'bg-deepblue text-white ring-2 ring-goldenbeige' 
              : 'bg-goldenbeige text-deepblue hover:bg-opacity-80'
          }`}
          aria-label={`Halaman ${p}`}
          aria-current={p === current ? 'page' : undefined}
        >
          {p}
        </button>
      ))}

      {end < total && (
        <>
          {end < total - 1 && <span className="text-white">…</span>}
          <button 
            onClick={() => onChange(total)} 
            className="px-3 py-1 text-sm rounded-full bg-goldenbeige text-deepblue hover:bg-opacity-80 transition-colors"
            aria-label={`Halaman ${total}`}
          >
            {total}
          </button>
        </>
      )}

      <button
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={isLastPage}
        className={`px-3 py-1 text-sm rounded-full transition-colors ${
          isLastPage 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
            : 'bg-goldenbeige text-deepblue hover:bg-opacity-80'
        }`}
        aria-label="Halaman selanjutnya"
      >
        Next
      </button>
    </nav>
  );
}