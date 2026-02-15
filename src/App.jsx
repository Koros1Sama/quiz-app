import { useState, useEffect, Suspense, lazy } from 'react'
import CategoryList from './components/CategoryList'

// Lazy load the QuizView to reduce initial bundle size
const QuizView = lazy(() => import('./components/QuizView'));

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch questions from public/static file
    // Use import.meta.env.BASE_URL to handle the subpath deployment correctly
    const dataUrl = `${import.meta.env.BASE_URL}questions.json`;
    
    fetch(dataUrl)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setCategories(data.categories);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load questions:", err);
        setError("فشل في تحميل الأسئلة. يرجى التحقق من الاتصال بالإنترنت.");
        setLoading(false);
      });
  }, []);

  const currentCategory = selectedCategory 
    ? categories.find(c => c.id === selectedCategory) 
    : null;

  if (loading) return <div className="container" style={{textAlign: 'center'}}>جاري التحميل...</div>;
  if (error) return <div className="container" style={{textAlign: 'center', color: 'red'}}>{error}</div>;

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
        <Suspense fallback={<div style={{textAlign: 'center', padding: '2rem'}}>جاري تحميل الاختبار...</div>}>
          <QuizView 
            category={currentCategory} 
            onBack={() => setSelectedCategory(null)} 
          />
        </Suspense>
      )}
    </div>
  )
}

export default App
