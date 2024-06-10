"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import CreateUniversity from './createUniversity';

const SearchBar = () => {
  const router = useRouter();
  const universities = {
    1: "University of Alberta",
    2: "Harvard University",
    3: "Stanford University",
    4: "University of Toronto"
  };
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const handleChange = (e) => {
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

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
  };

  const getUid = async (e) => {
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
      setNotFound(false);
      const jsonData = await response.json();
      const uid = jsonData["uid"];
      router.push(`/university/${uid}`);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setNotFound(true);
    }
  };

  return (
    <>
      <div className="relative w-full max-w-4xl mx-auto">
        <form onSubmit={getUid} className="flex">
          <Input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Find your university"
            className="px-4 py-2 border-2 border-primary text-xl h-15 flex-grow shadow-lg focus:outline-none focus:ring-0"
          />
          <Button className='mx-4 w-20 flex shadow-lg' variant="default" onClick={getUid}>Search</Button>
        </form>

        {suggestions.length > 0 && (
          <ul className="relative z-10 w-full mt-1 bg-white dark:bg-secondary dark:text-white dark:border-transparent border border-gray-300 rounded-lg shadow-lg">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        {notFound && 
          <div className="mt-2 text-primary-500">
            <CreateUniversity/>
            Add your university
          </div>}
      </div>
    </>
  );
};

export default SearchBar;
