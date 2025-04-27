import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://openlibrary.org/subjects.json');
        const data = await response.json();
        setCategories(data.subjects || []);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <li key={index}>
              <Link to={`/category/${category}`}>{category}</Link>
            </li>
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </ul>
    </div>
  );
};

export default CategoryPage;
