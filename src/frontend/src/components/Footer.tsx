import { Flame } from "lucide-react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer style={{ background: "#0F172A" }} className="text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-6 h-6" style={{ color: "#F97316" }} />
              <span className="text-lg font-bold text-white">
                Quick<span style={{ color: "#F97316" }}>Bite</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Fast, fresh, and delicious food delivered straight to your door.
              No compromises.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="/"
                className="hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram className="w-5 h-5" />
              </a>
              <a
                href="/"
                className="hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <SiFacebook className="w-5 h-5" />
              </a>
              <a
                href="/"
                className="hover:text-white transition-colors"
                aria-label="X"
              >
                <SiX className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              {["About Us", "Careers", "Blog", "Press"].map((l) => (
                <li key={l}>
                  <a href="/" className="hover:text-white transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              {[
                "Help Centre",
                "Track Order",
                "Contact Us",
                "Refund Policy",
              ].map((l) => (
                <li key={l}>
                  <a href="/" className="hover:text-white transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              {[
                "Privacy Policy",
                "Terms of Service",
                "Cookie Policy",
                "Sitemap",
              ].map((l) => (
                <li key={l}>
                  <a href="/" className="hover:text-white transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <span>
            © {year}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white underline transition-colors"
            >
              caffeine.ai
            </a>
          </span>
          <span>QuickBite © {year} — All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}
