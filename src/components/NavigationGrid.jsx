import React from 'react';

const NavigationGrid = ({ questions, currentQuestionIndex, userAnswers, onNavigate }) => {
  return (
    <div className="nav-grid" id="questionNav">
      {questions.map((q, index) => {
        const isCurrent = index === currentQuestionIndex;
        const isAnswered = userAnswers[index] !== undefined;
        let className = 'nav-item';
        if (isCurrent) className += ' active';
        if (isAnswered) className += ' answered';

        return (
          <div
            key={q.id} // Ensure 'id' is unique, otherwise use index
            className={className}
            onClick={() => onNavigate(index)}
          >
            {index + 1}
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(NavigationGrid);
