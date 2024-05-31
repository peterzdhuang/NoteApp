"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';

const SearchBar = () => {
  const router = useRouter();
  const universities = {
    "University of Alberta": 1,
    "University of Calgary": 2,
  };

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const handleChange = (e) => {
    const input = e.target.value;
    setQuery(input);

    if (input.length > 0) {
      const filteredSuggestions = Object.keys(universities).filter((university) =>
        university.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const uid = universities[query];
    if (uid) {
      setNotFound(false);
      router.push(`/university/${uid}`);
    } else {
      setNotFound(true);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
  };

  return (
    <>
      <div className="relative w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="flex items-center">
          <Input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Enter a university"
            className="flex-1 px-4 py-2 border rounded-l-lg" />
          <Button variant="default">Search</Button>
        </form>
        {suggestions.length > 0 && (
          <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        {notFound && <div className="mt-2 text-primary-500">University not found</div>}
      </div>
    </>
  );
};

export default SearchBar;
