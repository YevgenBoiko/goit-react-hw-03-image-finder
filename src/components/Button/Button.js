import { ButtonContainer, LoadButton } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onLoad }) => {
  return (
    <ButtonContainer>
      <LoadButton className="Button" type="button" onClick={onLoad}>
        Load more
      </LoadButton>
    </ButtonContainer>
  );
};

Button.propTypes = {
  onLoad: PropTypes.func.isRequired,
};
