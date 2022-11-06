import { Button } from 'components/Button/Button';
import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onCloseByEscape);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onCloseByEscape);
  }
  onCloseByEscape = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };
  onClosebyBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const {
      film: { image, title },
      closeModal,
    } = this.props;
    return (
      <div className={css.Overlay} onClick={this.onClosebyBackdrop}>
        <div className={css.Modal}>
          <Button clickHandler={closeModal} text="Close"></Button>
          <img
            src={`https://image.tmdb.org/t/p/w500${image}`}
            alt={title}
          ></img>
        </div>
      </div>
    );
  }
}
