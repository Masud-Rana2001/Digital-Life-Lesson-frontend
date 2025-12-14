export default function Container({ children }) {
  return (
    <div className="w-screen sm:max-w-7xl sm:mx-auto px-2 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
