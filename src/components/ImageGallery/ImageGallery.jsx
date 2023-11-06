import { ImageGalleryItem } from 'components';

export const ImageGallery = ({ imagesData, onGalleryItemClick }) => {
  return (
    <ul onClick={onGalleryItemClick}>
      {imagesData.map(item => (
        <ImageGalleryItem
          imageURL={item.webformatURL}
          tags={item.tags}
          key={item.id}
          largeImage={item.largeImageURL}
        />
      ))}
    </ul>
  );
};
