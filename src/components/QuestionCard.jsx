import React from 'react';

const QuestionCard = ({ question, currentQuestionIndex, userAnswer, onAnswer }) => {
  const { text, options } = question;
  const isAnswered = userAnswer !== null;

  return (
    <div className="question-card">
      <div className="question-text">
        <span style={{ color: 'var(--primary-color)' }}>
          س {currentQuestionIndex + 1}:
        </span>{' '}
        <span dangerouslySetInnerHTML={{ __html: text }} />
      </div>
      <div className="options-list">
        {options.map((option, index) => {
          let className = 'option-btn';
          if (isAnswered) {
             if (index === userAnswer.selectedIndex) {
                className += option.isCorrect ? ' correct' : ' incorrect';
             } else if (option.isCorrect) {
                className += ' correct';
             }
          }

          return (
            <button
              key={index}
              className={className}
              onClick={() => onAnswer(index)}
              disabled={isAnswered}
            >
              <span className="ltr" dangerouslySetInnerHTML={{ __html: option.text }} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
