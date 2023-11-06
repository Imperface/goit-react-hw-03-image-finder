export const ImageGalleryItem = ({ imageURL, largeImage, tags }) => {
  return (
    <li className="imageGalleryItem" data={largeImage} tags={tags}>
      <img src={imageURL} alt={tags} />
    </li>
  );
};
