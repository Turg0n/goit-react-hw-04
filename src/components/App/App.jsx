import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageModal from "../ImageModal/ImageModal";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { requestImages } from "/src/services/api.js";

function App() {
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [totalImageOnApi, setTotalImageOnApi] = useState(0);
  const [isLoad, setisLoad] = useState(false);
  const IMAGE_PER_PAGE = 12;
  const [searchImage, setSearchImage] = useState("");
  const [imagesData, setimagesData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isError, setisError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  
  const onSubmit = (eventValue) => {
    if (eventValue !== searchImage) {
      setSearchImage(eventValue);
      setCurrentPage(1);
      setimagesData([]);
    }
  };
  

  const fetchData = async (searchImage, currentPage) => {
    if (searchImage) {
      try {
        setisError(false);
        setisLoad(true);
        const data = await requestImages(searchImage, IMAGE_PER_PAGE, currentPage);
        setimagesData(previmagesData => [...previmagesData, ...data.results]); 
        setTotalImageOnApi(data.total);
      } catch (error) {
        setisError(true);
      } finally {
        setisLoad(false);
      }
    }
  };
  useEffect(() => {
    if (searchImage) {
      fetchData(searchImage, currentPage);
    }
  }, [searchImage, currentPage]);

  const onClickOnImage = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onClickLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1); 
  };

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      {imagesData.length>0 && <ImageGallery Images={imagesData} onClickOnImage={onClickOnImage} />}
      {modalIsOpen && <ImageModal imageUrl={selectedImageUrl} modalIsOpen={modalIsOpen} onRequestClose={closeModal} />}
      {isLoad && <Loader />}
      {isError && <ErrorMessage />}
      {(currentPage * IMAGE_PER_PAGE < totalImageOnApi) && <LoadMoreBtn onClickLoadMore={onClickLoadMore} />}
    </>
  );
}

export default App;