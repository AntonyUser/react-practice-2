import { helper } from 'Helper/Helper';
import { Component } from 'react';
import { fetchMovies } from 'Services/API';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { GalleryList } from './moviesGallery/moviesGallery';

export class App extends Component {
  state = {
    isShown: false,
    movies: [],
    page: 1,
    isLoading: false,
    currentImage: null,
  };
  componentDidUpdate(prevProps, prevState) {
    const { isShown, page } = this.state;
    if ((prevState.isShown !== isShown && isShown) || prevState.page !== page) {
      this.getMovies();
    }
  }
  showMovies = () => {
    this.setState(prevState => ({
      isShown: !prevState.isShown,
    }));
  };
  getMovies = () => {
    const { page } = this.state;
    this.setState({
      isLoading: true,
    });

    fetchMovies(page)
      .then(({ data }) => {
        this.setState(prevState => ({
          movies: [...prevState.movies, ...helper(data.results)],
        }));
      })
      .catch(error => {
        console.log(error.message);
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  showPoster = data => {
    this.setState({
      currentImage: data,
    });
  };
  onClose = () => {
    this.setState({
      currentImage: null,
    });
  };

  render() {
    const { movies, isShown, currentImage, isLoading } = this.state;
    return (
      <>
        <Button
          text={!isShown ? 'Show Movies' : 'Hide Movie'}
          clickHandler={this.showMovies}
        />
        {isShown && (
          <>
            <GalleryList array={movies} onClick={this.showPoster} />

            {!isLoading && (
              <Button text="Load More" clickHandler={this.loadMore} />
            )}
          </>
        )}
        {isLoading && <Loader />}
        {currentImage && (
          <Modal film={currentImage} closeModal={this.onClose} />
        )}
      </>
    );
  }
}
