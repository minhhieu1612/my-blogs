import { FaLinkedin, FaGithubSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
const Footer = () => {
  return (
    <footer className="py-5 bg-gray-100 dark:text-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700">
      <div className="page-container">
        <div className="flex">
          <div className="social flex items-end text-2xl">
            <a
              className="hover:text-primary-600 mr-1"
              href="https://www.linkedin.com/in/minh-hi%E1%BA%BFu-nguy%E1%BB%85n-953b2912a/"
            >
              <FaLinkedin />
            </a>
            <a
              className="hover:text-primary-600 mr-1"
              href="https://github.com/minhhieu1612"
            >
              <FaGithubSquare />
            </a>
            <a
              className="hover:text-primary-600 mr-1 h-6"
              href="mailto:calvin.nguyen.dev@gmail.com"
            >
              <MdEmail style={{ fontSize: "32px", marginTop: '-4px'  }} />
            </a>
          </div>
          <p className="ml-auto">This is Calvin{"'"}s blog site</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
