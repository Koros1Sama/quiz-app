import React, { useState } from 'react';
import QuestionCard from './QuestionCard';
import ExplanationPanel from './ExplanationPanel';
import NavigationGrid from './NavigationGrid';

const QuizView = ({ category, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { questionIndex: { selectedIndex, isCorrect } }
  
  // Reset state when category changes (though we mount new component typically)
  // But if we want to persist state if user goes back? 
  // For now, simple implementation like the HTML version: local state resets on mount.

  const questions = category.questions;

  if (!questions || questions.length === 0) {
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

  const handleAnswer = (selectedIndex) => {
    if (userAnswer) return; // Prevent re-answering

    const isCorrect = currentQuestion.options[selectedIndex].isCorrect;
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: { selectedIndex, isCorrect }
    }));
  };

  const navigateTo = (index) => {
    setCurrentQuestionIndex(index);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // Progress calculation
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

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
        <span id="totalQuestions">{questions.length}</span>
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
          disabled={!userAnswer && currentQuestionIndex < questions.length} // Original logic: next disabled until answered? 
          // Re-reading HTML logic: 
          // if (question.answered) { if not last, enable next } else { disable next }
          // So yes, Next is disabled until answered.
          // Wait, if it is the last question, it says "Finished".
        >
           {currentQuestionIndex < questions.length - 1 ? 'التالي' : 'انتهى القسم'}
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
