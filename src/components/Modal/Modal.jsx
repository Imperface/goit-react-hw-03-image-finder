import { Component } from 'react';
import css from './Modal.module.css';
export class Modal extends Component {
  componentDidMount = () => {
    window.addEventListener('keydown', this.onEscapeKeyDown);
  };
  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.onEscapeKeyDown);
  };
  onEscapeKeyDown = e => {
    if (e.code !== 'Escape') {
      return;
    }
    this.props.closeModal();
  };
  onBackdropClick = e => {
    if (e.target !== e.currentTarget) {
      return;
    }
    this.props.closeModal();
  };
  render() {
    return (
      <div className={css.backdrop} onClick={this.onBackdropClick}>
        <div className={css.modal}>
          <img
            className={css.image}
            src={this.props.modalData.largeURL}
            alt={this.props.modalData.tags}
          />
        </div>
      </div>
    );
  }
}
