import css from "../ImageCard/ImageCard.module.css";

const ImageCard = ({smallImage, alt_description, onClickOnImage, bigImage}) => {

  const handleClick = () => {
    onClickOnImage(bigImage);
  };

  return (
    <div>
      <img className={css.imageCard} src={smallImage} alt={alt_description} onClick={handleClick}/>
    </div>
  );
};

export default ImageCard;