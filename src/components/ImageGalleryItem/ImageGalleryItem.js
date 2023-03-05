import { Component } from 'react';
import { GalleryImage, GalleryItem } from './ImageGalleryItem.styled';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export default class ImageGalleryItem extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
  };

  state = {
    isModalOpen: false,
  };

  openModal = image => {
    this.setState({ isModalOpen: true, largeImage: image });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { isModalOpen, largeImage } = this.state;
    const { images } = this.props;

    return (
      <>
        {images &&
          images.map(({ id, largeImageURL, webformatURL, tags }) => (
            <GalleryItem key={id} onClick={() => this.openModal(largeImageURL)}>
              <GalleryImage src={webformatURL} alt={tags} />
            </GalleryItem>
          ))}

        {isModalOpen && (
          <Modal onClose={this.closeModal}>
            <img src={largeImage} alt="something" />
          </Modal>
        )}
      </>
    );
  }
}
