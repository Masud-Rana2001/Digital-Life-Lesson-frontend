// components/Lessons/FilterBar.jsx

import React, { useState } from 'react';

const categories = ["Personal Growth", "Career", "Mindset", "Relationships", "Mistakes Learned", "Emotional Healing"];
const emotionalTones = ["Motivational", "Sad", "Realization", "Gratitude", "Hard Truth", "Inspirational"];


export default function FilterBar({ setSearchTerm, setSelectedCategory, setSelectedSelectedTone }) {
    
    const [searchInputValue, setSearchInputValue] = useState(''); 
    // ক্যাটাগরি পরিবর্তনের হ্যান্ডলার
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    // টোন পরিবর্তনের হ্যান্ডলার
    const handleToneChange = (e) => {
        setSelectedSelectedTone(e.target.value);
    };

    // সার্চ ইনপুটের হ্যান্ডলার
    const handleSearchInputChange = (e) => {
        setSearchInputValue(e.target.value); // লোকাল ইনপুট স্টেট আপডেট
    };

    // সার্চ ফর্ম সাবমিট হ্যান্ডলার
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearchTerm(searchInputValue); // মেইন কম্পোনেন্টের স্টেট আপডেট
    };

    // সমস্ত ফিল্টার রিসেট করা
    const handleReset = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setSelectedSelectedTone('');
        setSearchInputValue('');
    };


    return (
        <div className="py-10 mb-8 p-6 rounded-2xl shadow bg-gradient-to-br from-sky-50 via-cyan-50 to-sky-50
      backdrop-blur-xl border border-white/60">
            <h3 className="text-2xl text-center font-bold mb-5 text-gray-700">🔍 Filter and Search Lessons</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                
                {/* 1. Category Filter */}
                <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Category</label>
                    <select
                        onChange={handleCategoryChange}
                        className="select select-bordered w-full bg-white/90"
                    >
                        <option value="">All Categories</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>

                {/* 2. Emotional Tone Filter */}
                <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Emotional Tone</label>
                    <select
                        onChange={handleToneChange}
                        className="select select-bordered w-full bg-white/90"
                    >
                        <option value="">Any Tone</option>
                        {emotionalTones.map(tone => <option key={tone} value={tone}>{tone}</option>)}
                    </select>
                </div>
                
                {/* 3. Search Input */}
                <form onSubmit={handleSearchSubmit} className="md:col-span-2 flex gap-2">
                    <div className="flex-grow">
                         <label className="block text-sm font-semibold text-gray-600 mb-1">Search Keywords</label>
                        <input
                            type="text"
                            placeholder="Search by Title or Story..."
                            value={searchInputValue}
                            onChange={handleSearchInputChange}
                            className="input input-bordered w-full bg-white/90"
                        />
                    </div>
                   
                    <button type="submit" className="btn btn-primary  mt-auto">
                        Search
                    </button>
                    <button type="button" onClick={handleReset} className="btn btn-outline  mt-auto">
                        Reset
                    </button>
                </form>
            </div>
        </div>
    );
}