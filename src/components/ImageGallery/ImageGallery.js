import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

export const ImageGallery = states => {
  return (
    <GalleryList className="ImageGallery">
      <ImageGalleryItem {...states} />
    </GalleryList>
  );
};
