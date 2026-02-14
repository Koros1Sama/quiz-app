import React from 'react';

const ExplanationPanel = ({ question, userAnswer }) => {
  if (!userAnswer) return null;

  const { options } = question;
  // Find correct option for default explanation
  const correctOption = options.find((o) => o.isCorrect);
  
  if (!correctOption) return null; // Should not happen if data is valid

  // Determine the overall explanation text
  const defaultExpl = correctOption.explanation || `الإجابة الصحيحة هي: ${correctOption.text}`;

  return (
    <div className="explanation-panel visible" style={{ direction: 'rtl', textAlign: 'right' }}>
      <h3 className="explanation-title">الشرح والتوضيح:</h3>
      
      {/* Main concept explanation */}
      <div className="explanation-text" dangerouslySetInnerHTML={{ __html: defaultExpl }} />
      
      {/* Detailed breakdown for EACH option */}
      <div className="options-breakdown" style={{ marginTop: '1.5rem' }}>
        <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', working: 'bold' }}>تحليل الخيارات:</h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {options.map((opt, idx) => (
            <li key={idx} style={{ 
              marginBottom: '0.8rem', 
              padding: '0.5rem', 
              borderRight: `3px solid ${opt.isCorrect ? '#2ecc71' : '#e74c3c'}`,
              backgroundColor: '#f8f9fa' 
            }}>
              <div style={{ fontWeight: 'bold', color: opt.isCorrect ? '#27ae60' : '#c0392b' }}>
                {opt.isCorrect ? '✅ الإجابة الصحيحة:' : '❌ إجابة خاطئة:'} {opt.text}
              </div>
              <div style={{ fontSize: '0.9em', marginTop: '0.2rem', color: '#555' }}>
                {opt.isCorrect 
                  ? "هي الإجابة الصحيحة لأنها تحقق الشرط المطلوب في السؤال." 
                  : (opt.reverse || "لا تعتبر صحيحة في هذا السياق.")
                }
              </div>
            </li>
          ))}
        </ul>
      </div>

      {question.reference_link && (
        <div style={{ marginTop: '1rem', paddingTop: '0.5rem', borderTop: '1px solid #e2e8f0' }}>
            <a href={question.reference_link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>📚</span>
                <span>لمزيد من التفاصيل (W3Schools)</span>
                <span style={{ fontSize: '0.8em' }}>(رابط خارجي)</span>
            </a>
        </div>
      )}
    </div>
  );
};

export default ExplanationPanel;
