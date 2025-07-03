import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

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
      <div>{isOpen && children}</div>
    </>
  );
});

Togglable.displayName = "Togglable";
Togglable.propTypes = {
  label: PropTypes.string.isRequired
};
export default Togglable;
