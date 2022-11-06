import { helper } from 'Helper/Helper';
import { Component } from 'react';
import { fetchMovies } from 'Services/API';
import { Button } from './Button/Button';
import { GalleryList } from './moviesGallery/moviesGallery';

export class App extends Component {
  state = {
    isShown: false,
    movies: [],
    page: 1,
    isLoading: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.isShown !== this.state.isShown) {
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

  render() {
    const { movies, isShown } = this.state;
    return (
      <>
        <Button text="Show Movies" clickHandler={this.showMovies} />
        {isShown && <GalleryList array={movies} />}
      </>
    );
  }
}
