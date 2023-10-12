import Link from "next/link";

import style from "./Logo.module.css";

const Logo = () => {
  return (
    <Link href="/">
      <h3 className={`${style.logo}  m-l--10 pointer`} title="lebonchat">
        lebonchat<sup className="etoile">*</sup>
      </h3>
    </Link>
  );
};

export default Logo;
