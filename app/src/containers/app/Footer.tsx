import * as React from "react";

const links = [
  {
    url: "http://cyber.fund/",
    name: "Home"
  }, {
    url: "http://company.cyber.fund/",
    name: "About us"
  }, {
    url: "https://github.com/cyberFund",
    name: "Github"
  }, {
    url: "https://github.com/cyberFund/cyber-ui/blob/master/tos.md",
    name: "Terms"
  }, {
    url: "https://t.me/CyberFundDev",
    name: "Telegram"
  }
];


const Footer = () => (
  <footer className="footer" style={{backgroundColor: "white"}}>
    <div className="container">
      <div className="content has-text-centered">
        <p>
          {links.map((link, index, array) => {
              return (
                <span key={link.url}>
                  <a href={link.url}>{link.name}</a>
                  {(index !== array.length - 1) && " - "}
                </span>
              );
            }
          )}
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
