import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import { animateScroll } from 'react-scroll';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Container } from './App.styled';
import PropTypes from 'prop-types';
import Searchbar from './Searchbar/Searchbar';
import fetchImages from '../services/images-api';

export default class App extends Component {
  static propTypes = {
    imageName: PropTypes.func,
  };

  state = {
    gallery: {},
    images: null,
    page: 1,
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { name, page, images } = this.state;

    if (prevState.name !== name || prevState.page !== page) {
      this.setState({ loading: true });

      fetchImages(name, page)
        .then(imagesList => {
          this.setState(() => {
            if (images) {
              return {
                images: [...images, ...imagesList.hits],
                gallery: imagesList,
              };
            } else {
              return { images: imagesList.hits, gallery: imagesList };
            }
          });
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.setState({ loading: false });
        });
    }

    if (
      this.state.images &&
      prevState.images !== this.state.images &&
      this.state.images.length > 12
    ) {
      return animateScroll.scrollMore(650);
    }
  }

  handleLoad = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  handleFormSubmit = imageName => {
    this.setState({ name: imageName, images: null, page: 1 });
  };

  render() {
    const { loading, images, page, gallery } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />

        <ImageGallery {...this.state} />
        {loading && <Loader />}
        {images &&
          images.length !== 0 &&
          page < Math.ceil(gallery.totalHits / 12) && (
            <Button onLoad={this.handleLoad} />
          )}

        <ToastContainer autoClose={3000} />
      </Container>
    );
  }
}
