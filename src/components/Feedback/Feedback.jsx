import css from './Feedback.module.css';

const Feedback = ({
  reviews: { good, neutral, bad },
  totalFeedback,
  positivePercentage,
}) => {
  return (
    <div className={css.feedback}>
      <div>
        <p>
          <b>Good:</b> {good}
        </p>
        <p>
          <b>Neutral:</b> {neutral}
        </p>
        <p>
          <b>Bad:</b> {bad}
        </p>
        <p>
          <b>Total:</b> {totalFeedback}
        </p>
        <p>
          <b>Positive:</b> {positivePercentage}%
        </p>
      </div>
    </div>
  );
};

export default Feedback;