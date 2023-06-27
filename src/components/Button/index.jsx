import PropTypes from "prop-types";
export default function Button({ children,  }) {
  return (
    <button
      className="flex bg-black rounded-full font-bold text-white px-5 mt-3 text-sm py-2 cursor-pointer hover:opacity-70"
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
};
