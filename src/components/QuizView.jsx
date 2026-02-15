import React, { useState, useCallback, useMemo } from 'react';
import QuestionCard from './QuestionCard';
import ExplanationPanel from './ExplanationPanel';
import NavigationGrid from './NavigationGrid';

const QuizView = ({ category, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { questionIndex: { selectedIndex, isCorrect } }
  
  // Safe access to questions
  const questions = useMemo(() => category ? category.questions : [], [category]);
  const questionsLength = questions.length;

  const handleAnswer = useCallback((selectedIndex) => {
    setUserAnswers(prev => {
        if (prev[currentQuestionIndex]) return prev; // Already answered

        // Guard against accessing undefined if questions are missing (though UI won't allow it)
        if (!questions[currentQuestionIndex]) return prev;

        const isCorrect = questions[currentQuestionIndex].options[selectedIndex].isCorrect;
        return {
            ...prev,
            [currentQuestionIndex]: { selectedIndex, isCorrect }
        };
    });
  }, [currentQuestionIndex, questions]);

  const navigateTo = useCallback((index) => {
    setCurrentQuestionIndex(index);
  }, []);

  const nextQuestion = useCallback(() => {
    setCurrentQuestionIndex(prev => {
        if (prev < questionsLength - 1) return prev + 1;
        return prev;
    });
  }, [questionsLength]);

  const prevQuestion = useCallback(() => {
    setCurrentQuestionIndex(prev => {
        if (prev > 0) return prev - 1;
        return prev;
    });
  }, []);

  // --- Early Returns for Rendering ---

  if (!category) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>حدث خطأ: القسم غير موجود.</div>;
  }

  if (questionsLength === 0) {
    return (
      <div className="quiz-view" style={{ textAlign: 'center', padding: '2rem' }}>
        <p>عذراً، لا توجد أسئلة متاحة في هذا القسم حالياً.</p>
        <button className="btn nav-btn home-btn" onClick={onBack}>
          &larr; العودة للمواضيع
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const userAnswer = userAnswers[currentQuestionIndex];

  if (!currentQuestion) return <div>تحميل السؤال...</div>;

  // Progress calculation
  const progress = ((currentQuestionIndex + 1) / questionsLength) * 100;

  return (
    <div className="quiz-view" id="quizView" style={{ display: 'block' }}>
      <button className="btn nav-btn home-btn" onClick={onBack}>
        &larr; العودة للمواضيع
      </button>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <div style={{ textAlign: 'left', marginBottom: '10px', fontSize: '0.9em', color: 'gray' }}>
        <span id="currentQuestionNum">{currentQuestionIndex + 1}</span> /
        <span id="totalQuestions">{questionsLength}</span>
      </div>

      <div id="quizContent">
        <QuestionCard 
            question={currentQuestion} 
            currentQuestionIndex={currentQuestionIndex}
            userAnswer={userAnswer || null}
            onAnswer={handleAnswer}
        />
      </div>
      
      <ExplanationPanel 
        question={currentQuestion}
        userAnswer={userAnswer || null}
      />

      <div className="controls">
        <button
          className="btn nav-btn"
          onClick={prevQuestion}
          disabled={currentQuestionIndex === 0}
        >
          السابق
        </button>
        <button 
          className="btn" 
          onClick={nextQuestion} 
          disabled={!userAnswer && currentQuestionIndex < questionsLength - 1} 
        >
           {currentQuestionIndex < questionsLength - 1 ? 'التالي' : 'انتهى القسم'}
        </button>
      </div>

      <NavigationGrid 
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        userAnswers={userAnswers}
        onNavigate={navigateTo}
      />
    </div>
  );
};

export default QuizView;
