import  { useEffect, useState } from 'react';
import { fetchCategories } from '../services/CategoriesService';

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);

 useEffect(() => {
    const getCategories = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    getCategories();
    }, []);

   

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <ul className="space-y-4">
        {categories.map(category => (
          <li key={category.category_id} className="bg-gray-100 p-4 rounded-md shadow-sm">
            <h3 className="font-semibold text-lg">{category.category_name}</h3>
            <p>{category.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesList;
