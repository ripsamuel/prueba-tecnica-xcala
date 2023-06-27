import PropTypes from "prop-types";

export default function AppLayout({ children }) {

    return (
      <>
      <div className="grid grid-cols-4 bg-slate-100 p-9 sm:justify-center ">
        <main className="flex min-h-screen col-span-4  sm:col-start-2 sm:col-end-4  flex-col items-center p-24 bg-white">
          {children}
        </main>
      </div>
      </>
    );
  }

AppLayout.propTypes = {
children: PropTypes.node.isRequired,
};
