import { memo, useEffect, useState } from 'react';

const fallbackQuote = {
  content: 'Small consistent progress beats last-minute pressure.',
  author: 'Study Planner',
};

const StudyQuote = memo(({ darkMode = false }) => {
  const [quote, setQuote] = useState(fallbackQuote);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchQuote() {
      try {
        const response = await fetch('https://dummyjson.com/quotes/random', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Quote request failed');
        }

        const data = await response.json();
        setQuote({
          content: data.quote || fallbackQuote.content,
          author: data.author || fallbackQuote.author,
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          setQuote(fallbackQuote);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchQuote();
    return () => controller.abort();
  }, []);

  return (
    <section className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded border p-5`}>
      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm font-medium`}>Study inspiration</p>
      <p className={`${darkMode ? 'text-gray-100' : 'text-gray-800'} mt-2 text-sm leading-6`}>
        {isLoading ? 'Loading a useful study reminder...' : quote.content}
      </p>
      {!isLoading && (
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-2 text-sm`}>- {quote.author}</p>
      )}
    </section>
  );
});

StudyQuote.displayName = 'StudyQuote';
export default StudyQuote;
