import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useInView } from 'react-intersection-observer';

// =============== ANIMATIONS & EFFECTS ===============

const typing = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const blink = keyframes`
  50% { border-color: transparent; }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const glowEffect = css`
  box-shadow: 0 0 20px rgba(243, 156, 18, 0.5);
  border-color: #f39c12;
`;

// =============== STYLES ===============

const PageContainer = styled.div`
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #e0e0e0;
  background-color: #0a0a0a;
  overflow-x: hidden;
  cursor: none;
`;

const CustomCursor = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #f39c12;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transition: transform 0.1s ease, background-color 0.2s ease;
  transform: translate(-50%, -50%);
  
  &.hovering {
    transform: translate(-50%, -50%) scale(2);
    background-color: rgba(243, 156, 18, 0.1);
  }
`;

const HeroSection = styled.section`
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
`;

const HeroVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  z-index: -1;
  filter: brightness(0.4);
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.8) 100%);
  z-index: 1;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 900px;
  padding: 0 20px;
  
  h1 {
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 800;
    margin-bottom: 1rem;
    color: #ffffff;
    overflow: hidden;
    white-space: nowrap;
    border-right: 4px solid #f39c12;
    animation: ${typing} 3.5s steps(30, end), ${blink} 0.75s step-end infinite;
  }
  
  .subtitle {
    font-size: 1.5rem;
    font-weight: 300;
    color: #f39c12;
    opacity: 0;
    animation: ${fadeInUp} 1s ease-out 3.5s forwards;
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  width: 30px;
  height: 50px;
  border: 2px solid #f39c12;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  
  &::before {
    content: '';
    width: 6px;
    height: 10px;
    background: #f39c12;
    border-radius: 3px;
    animation: scroll 2s infinite;
  }
  
  @keyframes scroll {
    0% { transform: translateY(10px); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateY(25px); opacity: 0; }
  }
`;

const GlassSection = styled.section`
  min-height: 100vh;
  padding: 150px 5%;
  display: flex;
  align-items: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('https://images.unsplash.com/photo-1549961318-3462644215e8?q=80&w=2070&auto=format&fit=crop');
    background-size: cover;
    background-position: center;
    filter: brightness(0.3) blur(2px);
    z-index: -1;
  }
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled.h2`
  font-size: 3.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 4rem;
  background: linear-gradient(90deg, #f39c12, #e67e22);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 40px;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(40px);
  
  animation: ${props => props.isVisible ? css`${fadeInUp} 1s ease-out forwards` : 'none'};
  
  &:hover {
    ${glowEffect}
    transform: translateY(-10px);
  }
`;

const ProcessPipeline = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-top: 50px;
  
  @media (max-width: 968px) {
    flex-direction: column;
    gap: 30px;
  }
`;

const ProcessStep = styled.div`
  text-align: center;
  background: rgba(243, 156, 18, 0.1);
  border: 2px solid #f39c12;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
  
  .step-number {
    font-size: 2rem;
    font-weight: bold;
    color: #f39c12;
  }
  
  .step-title {
    font-size: 0.9rem;
    font-weight: 600;
  }
`;

const PillarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 40px;
  margin-top: 20px;
`;

const PillarCard = styled(GlassCard)`
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const PillarImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${PillarCard}:hover & {
    transform: scale(1.05);
  }
`;

const PillarContent = styled.div`
  padding: 30px;
  text-align: center;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PillarTitle = styled.h3`
  font-size: 2rem;
  color: #f39c12;
  margin-bottom: 1rem;
`;

const CommitGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-top: 50px;
`;

const CommitCard = styled(GlassCard)`
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CommitImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const CommitContent = styled.div`
  padding: 25px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  h4 {
    font-size: 1.5rem;
    color: #f39c12;
    margin-bottom: 15px;
  }
  
  p {
    font-size: 1rem;
    line-height: 1.7;
    color: #e0e0e0;
  }
`;

// --- STYLES POUR LA SECTION "THE SPOTLIGHT" ---
const StylishSection = styled.section`
  min-height: 100vh;
  padding: 150px 5%;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('https://images.unsplash.com/photo-1549961318-3462644215e8?q=80&w=2070&auto=format&fit=crop');
    background-size: cover;
    background-position: center;
    filter: brightness(0.2) blur(1px);
    z-index: -2;
  }
`;

const SpotlightContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
  gap: 40px;
  align-items: center;
`;

const SpotlightTitle = styled.h2`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(90deg, #f39c12, #e67e22, #f39c12);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  grid-column: 1 / -1;
  animation: ${props => props.isVisible ? css`${fadeInUp} 1s ease-out forwards, shine 3s linear infinite` : 'none'};
  
  @keyframes shine {
    to {
      background-position: 200% center;
    }
  }
`;

const FeaturedVideo = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0,0,0,0.5);
  transform: ${props => props.isVisible ? 'rotate(-2deg) scale(1)' : 'rotate(-2deg) scale(0.9)'};
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: transform 0.6s ease, opacity 0.6s ease;
  
  &::after {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background: linear-gradient(45deg, #f39c12, transparent, #e67e22);
    border-radius: 20px;
    z-index: -1;
    opacity: 0.7;
  }

  &::before {
    content: '';
    display: block;
    padding-bottom: 56.25%;
  }

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const InfoCardGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

// --- COMPOSANT INFOCARD CORRIGÉ ---
const InfoCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 30px;
  display: flex;
  align-items: center;
  gap: 20px;
  transform: ${({ isVisible, rotate }) => isVisible ? `translateX(0) rotate(${rotate}deg)` : `translateX(50px) rotate(${rotate}deg)`};
  opacity: ${({ isVisible }) => isVisible ? 1 : 0};
  transition: transform 0.6s ease, opacity 0.6s ease, box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 15px 30px rgba(243, 156, 18, 0.3);
    /* CORRECTION ICI : Utilisation de la fonction props pour accéder à 'rotate' */
    transform: scale(1.03) rotate(${props => props.rotate}deg);
  }
`;

const CardIcon = styled.span`
  font-size: 3rem;
  min-width: 60px;
  text-align: center;
`;

const CardText = styled.div`
  h3 {
    font-size: 1.5rem;
    color: #f39c12;
    margin-bottom: 10px;
  }
  p {
    font-size: 1rem;
    line-height: 1.7;
    color: #e0e0e0;
  }
`;

const FloatingShape = styled.div`
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(243, 156, 18, 0.2), rgba(230, 126, 34, 0.2));
  filter: blur(40px);
  z-index: -1;
  animation: float 6s ease-in-out infinite;
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(10deg); }
  }
`;

const Footer = styled.footer`
  background-color: #0a0a0a;
  color: #888;
  padding: 50px 5%;
  text-align: center;
  border-top: 1px solid #222;
`;

// =============== COMPOSANT ===============

const Services = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const [processRef, processInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [pillarsRef, pillarsInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [commitRef, commitInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [stylishRef, stylishInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    const moveCursor = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  const processSteps = ['Sélectionner', 'Cultiver', 'Controle', 'livrer'];

  const qualityData = [
    {
      imageSrc: '/Quality/Q1.jpg',
      title: 'Contrôle de la qualité',
      content: 'Chez SKS, le contrôle de la qualité est primordial pour assurer la fraîcheur, le goût et la sécurité de nos agrumes de la récolte à la table. Nous utilisons des pratiques agricoles rigoureuses et un suivi expert pour une saveur optimale. Après la récolte, les fruits subissent des contrôles de qualité rigoureux et ceux qui échouent à nos normes sont éliminés.'
    },
    {
      imageSrc: '/Quality/Q2.jpg',
      title: 'Normes internationales',
      content: 'Chez SKS, nous répondons aux normes internationales pour assurer la satisfaction de la clientèle mondiale. Nos processus de production sont conformes aux certifications GlobalGAP et HACCP, assurant la sécurité et la traçabilité des aliments, et sont régulièrement audités par des organismes indépendants.'
    }
  ];

  const commitData = [
    {
       imageSrc: '/Quality/D.jpg',
      title: 'Protection des ressources naturelles',
      content: 'Chez SKS, nous priorisons la préservation de l’eau, des sols et de la biodiversité pour la durabilité Ladoption de méthodes d irrigation modernes minimise lutilisation de l eau et améliore l efficacité. La santé des sols est encouragée par des techniques telles que la rotation des cultures et les amendements organiques.'
    },
    {
      imageSrc: '/Quality/commit2.jpg',
      title: 'Notre approche de la durabilité',
      content: 'SKS donne la priorité aux pratiques agricoles durables, estimant qu’elles sont vitales à la fois pour la planète et pour ses communautés. Nous travaillons à réduire notre empreinte écologique grâce à des initiatives favorisant des méthodes respectueuses de l’environnement comme la lutte intégrée contre les ravageurs et les engrais organiques.'
    },
    {
      imageSrc: '/Quality/commit3.jpg',
      title: 'Actions tangibles pour la durabilité',
      content: 'Chez SKS, nous nous engageons à des actions concrètes pour la durabilité, et pas seulement des mots. Une gestion rigoureuse des ressources et une irrigation efficace préservent nos vergers, tandis que les initiatives de réduction et de recyclage des déchets minimisent notre empreinte environnementale.'
    }
  ];

  return (
    <PageContainer>
      {/* CORRECTION ICI : Utilisation des backticks pour le style */}
      <CustomCursor
        style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}
        className={isHovering ? 'hovering' : ''}
      />

      <HeroSection>
        <HeroVideo autoPlay muted loop playsInline>
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </HeroVideo>
        <HeroOverlay />
        <HeroContent>
          <h1>LEMON</h1>
          <p className="subtitle">Où La Nature Est La Meilleure Répond À La Précision De La Technologie.</p>
        </HeroContent>
        <ScrollIndicator />
      </HeroSection>

      <GlassSection ref={processRef}>
        <SectionContainer>
          <SectionTitle>Notre engagement envers la qualité</SectionTitle>
          <GlassCard isVisible={processInView}>
            <p style={{ fontSize: '1.2rem', textAlign: 'center', lineHeight: 1.8 }}>
              Chez SKS, notre obsession pour des agrumes de qualité conduit à chaque étape de notre processus de production minutieusement planifié. Nous sélectionnons les meilleures variétés, utilisons des méthodes d'agriculture innovantes et respectueuses de l'environnement et respectons les normes strictes de sécurité alimentaire. Notre équipe surveille de près les phases de croissance, en optimisant les conditions avec des technologies de pointe pour la meilleure saveur et fraîcheur.
            </p>
            <ProcessPipeline>
              {processSteps.map((step, index) => (
                <ProcessStep key={index}>
                  <span className="step-number">{index + 1}</span>
                  <span className="step-title">{step}</span>
                </ProcessStep>
              ))}
            </ProcessPipeline>
          </GlassCard>
        </SectionContainer>
      </GlassSection>

      <GlassSection ref={pillarsRef}>
        <SectionContainer>
          <SectionTitle>Nos piliers d'excellence</SectionTitle>
          <PillarsGrid>
            {qualityData.map((item, index) => (
              <PillarCard key={index} isVisible={pillarsInView} style={{animationDelay: `${index * 0.2}s`}}>
                <PillarImage src={item.imageSrc} alt={item.title} />
                <PillarContent>
                  <PillarTitle>{item.title}</PillarTitle>
                  <p>{item.content}</p>
                </PillarContent>
              </PillarCard>
            ))}
          </PillarsGrid>
        </SectionContainer>
      </GlassSection>

      <GlassSection ref={commitRef}>
        <SectionContainer>
          <SectionTitle>Notre engagement pour la durabilité</SectionTitle>
          <CommitGrid>
            {commitData.map((item, index) => (
              <CommitCard key={index} isVisible={commitInView} style={{animationDelay: `${index * 0.2}s`}}>
                <CommitImage src={item.imageSrc} alt={item.title} />
                <CommitContent>
                  <h4>{item.title}</h4>
                  <p>{item.content}</p>
                </CommitContent>
              </CommitCard>
            ))}
          </CommitGrid>
        </SectionContainer>
      </GlassSection>

      {/* --- SECTION "THE SPOTLIGHT" --- */}
      <StylishSection ref={stylishRef}>
        <FloatingShape style={{ width: '300px', height: '300px', top: '10%', left: '-150px' }} />
        <FloatingShape style={{ width: '200px', height: '200px', bottom: '20%', right: '-100px', animationDelay: '2s' }} />
        
        <SpotlightContainer>
          <SpotlightTitle isVisible={stylishInView}>
            Nous fournissons des produits de haute qualité
          </SpotlightTitle>
          
          <FeaturedVideo isVisible={stylishInView}>
            <iframe
              src="https://www.youtube.com/embed/GqpvH5H9Wtc?autoplay=0&mute=1&loop=1&playlist=GqpvH5H9Wtc&controls=1&modestbranding=1&rel=0"
              title="SKS Citrus Quality Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </FeaturedVideo>

          <InfoCardGrid>
            <InfoCard isVisible={stylishInView} rotate={2} style={{transitionDelay: '0.2s'}}>
              <CardIcon>🌳</CardIcon>
              <CardText>
                <h3>NOS Vergers</h3>
                <p>Nos agrumes proviennent des meilleurs vergers, où des pratiques agricoles durables et respectueuses de l’environnement sont mises en œuvre. Nous travaillons en étroite collaboration avec des cultivateurs passionnés et expérimentés pour nous assurer que chaque orange, citron, pamplemousse ou mandarin répond aux normes les plus strictes de qualité et de saveur.</p>
              </CardText>
            </InfoCard>
            <InfoCard isVisible={stylishInView} rotate={-2} style={{transitionDelay: '0.4s'}}>
              <CardIcon>🌱</CardIcon>
              <CardText>
                <h3>Engrais biologique</h3>
                <p>Nos engrais adhèrent à des pratiques agricoles durables et contribuent à la préservation de l’environnement tout en garantissant une qualité supérieure. Que vous soyez un agriculteur professionnel ou un jardinier amateur, SKS propose des produits qui répondent à vos exigences et dépassent vos attentes.</p>
              </CardText>
            </InfoCard>
          </InfoCardGrid>
        </SpotlightContainer>
      </StylishSection>

      <Footer>
        <p>&copy; {new Date().getFullYear()} SKS Citrus. All Rights Reserved.</p>
        <p>325 AV Hassan 2 – 80 000 Agadir Maroc | contact@sks.ma | +212 5 28 84 59 06</p>
      </Footer>
    </PageContainer>
  );
};

export default Services;