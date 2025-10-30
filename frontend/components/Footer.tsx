export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-6 mt-8 border-t border-gray-200">
      <p className="text-gray-600 text-sm">
        © {new Date().getFullYear()} BookIt — All rights reserved.
      </p>
    </footer>
  );
}
