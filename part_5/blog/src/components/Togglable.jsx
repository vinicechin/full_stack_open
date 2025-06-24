import { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef(({ children, label }, refs) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(refs, () => {
    return {
      toggleContent,
    };
  });

  function toggleContent() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <button onClick={toggleContent}>{isOpen ? "cancel" : label}</button>
      <div>
        {isOpen && children}
      </div>
    </>
  );
});

Togglable.displayName = 'Togglable';
export default Togglable;
