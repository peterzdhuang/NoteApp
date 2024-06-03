"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const SearchBar = () => {
  const router = useRouter();
  const universities = {
    1 : "University of Alberta"
  }
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
      const uid = jsonData["uid"]
      router.push(`/university/${[uid]}`);

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <>
      <div className="relative w-full max-w-md mx-auto">
        
        <form onSubmit={getUid}>
          <Input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Enter a university"
            className="flex-1 px-4 py-2 border rounded-l-lg" />
          <Button variant="default" onClick={getUid}>Search</Button>
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
