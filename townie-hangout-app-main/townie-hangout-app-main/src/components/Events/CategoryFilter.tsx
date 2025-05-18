
import React from 'react';
import { eventCategories, EventCategory } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';

interface CategoryFilterProps {
  selectedCategory: EventCategory | null;
  onSelectCategory: (category: EventCategory | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-3">Categories</h3>
      <div className="flex flex-wrap gap-2">
        <Badge
          className={`cursor-pointer px-3 py-1 ${
            selectedCategory === null
              ? 'bg-pulse-purple'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => onSelectCategory(null)}
        >
          All
        </Badge>
        {eventCategories.map((category) => (
          <Badge
            key={category}
            className={`cursor-pointer px-3 py-1 ${
              selectedCategory === category
                ? 'bg-pulse-purple'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
