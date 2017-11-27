import * as React from "react";

import { Link } from 'react-router';

const styles = require("./Footer.less");

export const Container = ({ children }) => (
  <footer className={styles.footer}>
    <div className={styles.footerWrapper}>
      {children}
    </div>
  </footer>
)


export const Title = (props: any) => (
  <h3 className={styles.title + ' ' + (props.inline ? styles.titleInline : '')}>{props.children}</h3>
);

export const Text = ({ children }) => (
  <p className={styles.text}>
    {children}
  </p>
)


export const Logo = () => (
  <Link to='/'>
    <img src={require('./logo.png')} />
  </Link>
);

export const HorizonLinks = ({ children }) => (
  <ul className={styles.horizonLinks}>{children}</ul>
)

export const HorizonLinksItem = ({ children }) => (
  <li className={styles.horizonLinksItem}>{children}</li>
)


export const SmallText = ({ children }) => (
  <p className={styles.smallText}>
    {children}
  </p>
)


export const SocialLinks = ({ children }) => (
  <ul className={styles.socialLinks}>
    {children}
  </ul>
);

export const SocialLink = ({ children, type, ...props }) => {
  const css = type === 'github' ? styles.github : 
              type === 'teleg' ? styles.teleg :
              type === 'tw' ? styles.tw : '';
  return (
    <li className={styles.socialLink}>
      <a {...props} className={css}>{children}</a>
    </li>
  );
}


export const ProjectLink = (props) => (
  <a {...props} className={styles.projectLink} />
);


export const Dot = ({ color }) => {
  const css = styles.dot + ' ' + (color === 'yellow' ? styles.yellow : color === 'orange' ? styles.orange : '' );
  return (
    <span className={css}>•</span>
  )
}
