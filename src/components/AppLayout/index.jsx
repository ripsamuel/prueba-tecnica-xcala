import PropTypes from "prop-types";

export default function AppLayout({ children }) {

    return (
      <>
      <div className="grid  bg-black p-9  ">
        <main className="flex min-h-screen col-span-4  sm:col-start-2 sm:col-end-4  flex-col  p-24 bg-white">
          {children}
        </main>
      </div>
      </>
    );
  }

AppLayout.propTypes = {
children: PropTypes.node.isRequired,
};
