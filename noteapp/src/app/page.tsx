"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  const router = useRouter();
  const universities = {
    "University of Alberta" : 1, 
    "University of Calgary" : 2,
  };
  
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const uid = universities[query];
    if (uid) {
      router.push(`/university/${uid}`);
    } else {
      console.log("University not found");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <Input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Input university"
        className="search-input"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
