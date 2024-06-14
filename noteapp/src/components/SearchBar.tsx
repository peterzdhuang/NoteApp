import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import CreateUniversity from './createUniversity';

const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [universities, setUniversities] = useState<Record<number, string>>({});

  useEffect(() => {
    fetch('https://pdfstoragefunctionapp.azurewebsites.net/api/ListOfUniversities?code=NL2Au6N8mDdUBjxuLE4481ab1Knx51QMsTG63kGD75F0AzFuqwUhpw%3D%3D')
      .then(response => response.json())
      .then(data => {
        const universities: Record<number, string> = {};
        data.universityNames.forEach((name: string, index: number) => {
          universities[index + 1] = name;
        });
        setUniversities(universities);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setQuery(input);

    if (input.length > 0) {
      const filteredSuggestions = Object.values(universities).filter((university) =>
        university.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setNotFound(filteredSuggestions.length === 0);
    } else {
      setSuggestions([]);
      setNotFound(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setSuggestions([]);
  };

  const getUid = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://pdfstoragefunctionapp.azurewebsites.net/api/getUniversityByName?code=4d1tlY6Rp9n6Nq7D2o4Cks0qPOqJU_AZwIPLj9gWnWEtAzFuT3Pnwg%3D%3D&universityName=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonData = await response.json();
      const uid = jsonData["uid"];
      router.push(`/university/${uid}`);
      setNotFound(false);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setNotFound(true);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <form onSubmit={getUid} className="flex">
        <Input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Find your university"
          className="px-4 py-2 border-2 border-primary text-xl h-15 flex-grow shadow-lg focus:outline-none focus:ring-0"
          aria-label="University Search"
        />
        <Button type="submit" className="mx-4 w-20 flex shadow-lg" variant="default">Search</Button>
      </form>

      {suggestions.length > 0 && (
        <ul className="relative z-10 w-full mt-1 bg-white dark:bg-secondary dark:text-white dark:border-transparent border border-gray-300 rounded-lg shadow-lg">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600"
              onClick={() => handleSuggestionClick(suggestion)}
              role="option"
              aria-selected={query === suggestion}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      {notFound && (
        <div className="mt-2 text-primary-500">
          <CreateUniversity />
          <span>Add your university</span>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
