import React from 'react';

const CategoryList = ({ categories, onSelectCategory }) => {
  return (
    <div className="category-view" id="categoryView" style={{ display: 'block' }}>
      <h2 style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
        اختر موضوع الاختبار
      </h2>
      <div className="category-grid">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="category-card"
            onClick={() => onSelectCategory(cat.id)}
          >
            <div className="category-title">{cat.title}</div>
            <div className="category-count">{cat.questions.length} سؤال</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
