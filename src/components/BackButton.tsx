import { useNavigate } from 'react-router-dom';

import Button from './Button';
import { ButtonType } from '../types/button';

function BackButton() {
  const navigate = useNavigate();

  return (
    <Button 
      type={ButtonType.BACK} 
      onClick={(e: React.FormEvent) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}

export default BackButton;