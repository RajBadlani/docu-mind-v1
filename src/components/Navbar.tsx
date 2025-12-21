import Link from "next/link";

const Navbar = () => {
  const navItems = [
    { name: "How it works", link: "#how-it-work" },
    { name: "Features", link: "#features" },
    { name: "Pricing", link: "#pricing" },
    { name: "Testimonials", link: "#testimonials" },
  ];

  return (
    <header className="sticky top-4 z-50 flex justify-center">
      <nav
        className="
          flex items-center gap-6
          rounded-full
          bg-white/80 backdrop-blur-md
          border border-blue-200
          px-6 py-3
          shadow-sm
          justify-around w-4xl
        "
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="text-base font-semibold text-black whitespace-nowrap"
        >
          <span className="pr-1">Docu</span><span>Mind A</span>I
        </Link>

        <ul className="hidden md:flex items-center gap-2">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <Link
                href={item.link}
                className="
                  relative px-4 py-2
                  text-sm font-medium text-gray-700
                  transition-colors duration-300
                  hover:text-blue-600
                  group
                "
              >
                <span
                  className="
                    absolute inset-0
                    rounded-full
                    bg-blue-100
                    opacity-0
                    scale-90
                    transition-all duration-300 ease-out
                    group-hover:opacity-100
                    group-hover:scale-100
                  "
                />
                <span className="relative z-10">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/log-in"
          className="
            relative px-4 py-2
            text-sm font-semibold text-blue-700
            transition-colors duration-200
            group
          "
        >
          <span
            className="
              absolute inset-0
              rounded-full
              bg-blue-200
              opacity-0
              scale-90
              transition-all duration-200 ease-out
              group-hover:opacity-100
              group-hover:scale-100
            "
          />
          <span className="relative z-10">Log In</span>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
