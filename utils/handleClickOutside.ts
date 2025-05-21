export const handleClickOutside = (
  event: MouseEvent,
  wrapperRef: React.RefObject<HTMLDivElement | null>,
  setIsOpen: (isOpen: boolean) => void
) => {
  if (
    wrapperRef.current &&
    !wrapperRef.current.contains(event.target as Node)
  ) {
    setIsOpen(false);
  }
};
