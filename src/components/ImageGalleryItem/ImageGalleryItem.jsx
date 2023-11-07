import css from './ImageGalleryItem.module.css';
export const ImageGalleryItem = ({ imageURL, largeImage, tags }) => {
  return (
    <li
      className={`${css.imageGalleryItem} imageGalleryItem`}
      data={largeImage}
      tags={tags}
    >
      <img className={css.image} src={imageURL} alt={tags} />
    </li>
  );
};
