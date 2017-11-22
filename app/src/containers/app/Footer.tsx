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

import {
  Container, Title, Text, Logo,
  HorizonLinks, HorizonLinksItem,
  SmallText,
  SocialLinks, SocialLink,
  ProjectLink, Dot
} from '../../components/Footer/';

const Footer = () => (
  // <footer className="footer" style={{backgroundColor: "white"}}>
  //   <div className="container">
  //     <div className="content has-text-centered">
  //       <p>
  //         {links.map((link, index, array) => {
  //             return (
  //               <span key={link.url}>
  //                 <a href={link.url}>{link.name}</a>
  //                 {(index !== array.length - 1) && " - "}
  //               </span>
  //             );
  //           }
  //         )}
  //       </p>
  //     </div>
  //   </div>
  // </footer>
  <Container>
    <div>
      <Logo />
      <Text>Our mission to make digital investments<br /> 
comprehensible, accessible, easy and safe.</Text>
    </div>
    <div>
      <Title>Build</Title> 
      <SmallText>Listing</SmallText>
      <SmallText>Chaingear</SmallText>
      <SmallText>Github</SmallText>              
    </div>
    <div>
      <Title>Projects</Title>
      <ul>
        <li>
          <ProjectLink href="http://cyber.fund/" target="_blank">Satoshi<Dot color='orange'/>Fund</ProjectLink>
        </li>
        <li>
          <ProjectLink href="http://cyber.fund/" target="_blank">Satoshi<Dot color='yellow'/>Pie</ProjectLink>
        </li>
      </ul>
    </div>
    <div>
      <div>
        <Title inline={true}>Follow:</Title>
        <SocialLinks>
          <SocialLink href="https://github.com/cyberFund" target="_blank" type='github'>github</SocialLink>
          <SocialLink href="https://t.me/CyberFundDev" target="_blank" type='teleg'>telegram</SocialLink>
          <SocialLink href="http://cyber.fund/" target="_blank" type='tw'>twiter</SocialLink>
        </SocialLinks>
      </div>
      <HorizonLinks>
        <HorizonLinksItem>
          <a target="_blank" href='http://cyber.fund/'>Company</a>
        </HorizonLinksItem>
        <HorizonLinksItem>
          <a target="_blank" href='http://cyber.fund/'>Decisions</a>
        </HorizonLinksItem>
        <HorizonLinksItem>
          <a target="_blank" href='http://cyber.fund/'>Newsletter</a>
        </HorizonLinksItem>
      </HorizonLinks>
    </div>
  </Container>
);

export default Footer;
