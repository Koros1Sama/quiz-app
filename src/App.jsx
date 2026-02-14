import { useState } from 'react'
import CategoryList from './components/CategoryList'
import QuizView from './components/QuizView'
import rawQuestions from './data/questions.json'

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Parse or process questions if needed (extract categories)
  const categories = rawQuestions.categories;

  const currentCategory = selectedCategory 
    ? categories.find(c => c.id === selectedCategory) 
    : null;

  return (
    <div className="container">
      <div className="header">
        <h1>اختبار تطوير الويب (PHP)</h1>
        <p>جامعة صنعاء - كلية الحاسوب وتكنولوجيا المعلومات</p>
      </div>

      {!currentCategory ? (
        <CategoryList 
          categories={categories} 
          onSelectCategory={setSelectedCategory} 
        />
      ) : (
        <QuizView 
          category={currentCategory} 
          onBack={() => setSelectedCategory(null)} 
        />
      )}
    </div>
  )
}

export default App
