import { useState, useEffect, useMemo } from "react";
import "./App.css";
import { requestProductsByQuery } from "./services/api";
import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageModal from "./components/ImageModal/ImageModal";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";

function App() {
  const [isLoad, setisLoad] = useState(false);
  const [isError, setisError] = useState(false);
  const [searchImage, setSearchImage] = useState("");
  const [imagesData, setimagesData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [totalImageOnApi, setTotalImageOnApi] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const IMAGE_PER_PAGE = 12;

  
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
        const data = await requestProductsByQuery(searchImage, IMAGE_PER_PAGE, currentPage);
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