import css from './Bar.module.css';

const Bar = ({ positive }) => {
  const barWidth = 230;
  const positivePercent = (barWidth / 100) * positive;
  return (
    <div className={css.bar} style={{ width: barWidth }}>
      <div className={css.good} style={{ width: positivePercent }}></div>
      <div className={css.neutral}></div>
      <div
        className={css.bad}
        style={{ width: barWidth - positivePercent }}
      ></div>
    </div>
  );
};

export default Bar;