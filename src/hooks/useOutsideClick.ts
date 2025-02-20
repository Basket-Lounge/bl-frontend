import { useEffect } from 'react';


const useOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  isVisible: boolean,
  onClose: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isVisible && 
        ref.current && 
        ref.current instanceof HTMLElement && 
        event.target instanceof Node && 
        !ref.current.contains(event.target)
      ){
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onClose, ref]);
};

export default useOutsideClick;