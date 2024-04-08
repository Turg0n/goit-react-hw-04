import { useState } from 'react';
import { useEffect } from 'react';
import Description from './components/Description/Description';
import Options from './components/Options/Options';
import Feedback from './components/Feedback/Feedback';
import Notification from './components/Notification/Notification';
import Bar from './components/Bar/Bar';

function App() {
  const [reviews, setReviews] = useState(() => {
    const savedReviews = JSON.parse(localStorage.getItem('reviews')) ?? {
      good: 0,
      neutral: 0,
      bad: 0,
    };

    return savedReviews;
  });

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  const totalFeedback = Object.values(reviews).reduce((acc, el) => acc + el, 0);
  const positivePercentage = Math.round(
    ((reviews.good + reviews.neutral) / totalFeedback) * 100
  );

  const updateFeedback = feedbackType => {
    setReviews({
      ...reviews,
      [feedbackType]: reviews[feedbackType] + 1,
    });
  };

  const resetFeedback = () => {
    setReviews({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  return (
    <>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        resetFeedback={resetFeedback}
        totalFeedback={totalFeedback}
      />
      {totalFeedback > 0 && (
        <Feedback
          reviews={reviews}
          totalFeedback={totalFeedback}
          positivePercentage={positivePercentage}
        />
      )}
      {!totalFeedback && <Notification />}
      {totalFeedback > 0 && <Bar positive={positivePercentage} />}
    </>
  );
}

export default App;