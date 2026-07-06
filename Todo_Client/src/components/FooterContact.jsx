import assets from "../assets/assets";
import { MdOutlineMail } from "react-icons/md";
import { FaPhoneFlip, FaGithub, FaLinkedin } from "react-icons/fa6";

const FooterContact = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-1 sm:px-6 py-3 flex flex-col lg:flex-row justify-between items-center gap-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={assets.dev_logo}
            alt="logo"
            className="w-10 h-10 rounded-full border-2 border-white object-cover"
          />

          <div>
            <h2 className="text-xl font-bold">Võ Minh Tú</h2>
          </div>
        </div>

        {/* Contact */}
        <div className="flex flex-col sm:flex-row gap-5">
          <a
            href="mailto:vominhtu1212004@gmail.com"
            className="flex items-center gap-3 hover:text-sky-400 transition"
          >
            <MdOutlineMail size={22} />
            <span>vominhtu1212004@gmail.com</span>
          </a>

          <a
            href="tel:+84386659641"
            className="flex items-center gap-3 hover:text-sky-400 transition"
          >
            <FaPhoneFlip size={18} />
            <span>+84 386 659 641</span>
          </a>
        </div>

        {/* Social */}
        <div className="flex gap-5 text-2xl">
          <a
            href="https://github.com/TuMinhIT"
            target="_blank"
            rel="noreferrer"
            className="hover:text-sky-400 transition"
          >
            <FaGithub />
          </a>


        </div>
      </div>

      <div className="border-t border-slate-700">
        <p className="text-center text-sm text-gray-400 py-4">
          © {new Date().getFullYear()} Võ Minh Tú. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterContact;
