import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  FileText,
  Mail,
  MapPin,
  Menu,
  Moon,
  Network,
  Phone,
  Sparkles,
} from 'lucide-react';
import { getPortfolioBySlug, portfolios } from './data/portfolios';
import './styles.css';

function getCurrentSlug() {
  const pathSlug = window.location.pathname.replace(/^\//, '').split('/')[0];
  const hashSlug = window.location.hash.replace(/^#\/?/, '').split('/')[0];
  return pathSlug || hashSlug || '';
}

function linkIcon(type) {
  if (type === 'email') return <Mail size={18} />;
  if (type === 'phone') return <Phone size={18} />;
  if (type === 'code') return <Code2 size={18} />;
  if (type === 'file') return <FileText size={18} />;
  return <Network size={18} />;
}

function PortfolioDirectory() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <main className="directoryPage">
      <nav className="topbar" aria-label="Main navigation">
        <a className="brand" href="#/" aria-label="Portfolio directory">
          <Sparkles size={20} />
          <span>Portfolio Hub</span>
        </a>
        <div className={`navlinks${mobileMenuOpen ? ' open' : ''}`}>
          <a href="#profiles" onClick={() => setMobileMenuOpen(false)}>Profiles</a>
          <a href="#how" onClick={() => setMobileMenuOpen(false)}>Add New</a>
        </div>
        <button
          className="iconButton"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <Menu size={20} />
        </button>
      </nav>

      <section className="directoryHero">
        <p className="eyebrow"><Sparkles size={16} /> One React app, many portfolios</p>
        <h1>Host every portfolio from one clean project.</h1>
        <p className="lede">
          Create a new data file for each person, add it to the registry, and they get a separate hosted page.
        </p>
      </section>

      <section className="section" id="profiles">
        <div className="sectionHeader">
          <p>Profiles</p>
          <h2>Portfolio list</h2>
        </div>
        <div className="profileGrid">
          {portfolios.map((portfolio) => (
            <a className="profileCard" href={`#/${portfolio.slug}`} key={portfolio.slug}>
              <div className="profileAvatar" style={{ background: portfolio.theme.accent }}>
                {portfolio.initials}
              </div>
              <div>
                <p>{portfolio.role}</p>
                <h3>{portfolio.name}</h3>
                <span>{portfolio.summary}</span>
              </div>
              <ArrowUpRight size={20} />
            </a>
          ))}
        </div>
      </section>

      <section className="howSection" id="how">
        <div className="sectionHeader">
          <p>Add New</p>
          <h2>New portfolio kaise add kare</h2>
        </div>
        <div className="steps">
          <article><strong>1</strong><span>Copy `src/data/portfolios/your-name-template.js`.</span></article>
          <article><strong>2</strong><span>File ka naam aur `slug` change karo, jaise `rahul-sharma`.</span></article>
          <article><strong>3</strong><span>`src/data/portfolios/index.js` me import karke array me add karo.</span></article>
        </div>
      </section>
    </main>
  );
}

function PortfolioPage({ portfolio }) {
  const themeStyle = {
    '--accent': portfolio.theme.accent,
    '--accent-soft': portfolio.theme.accentSoft,
    '--dark': portfolio.theme.dark,
    '--hero-image': `url('${portfolio.theme.heroImage}')`,
    '--portrait-image': `url('${portfolio.theme.portraitImage}')`,
  };

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <main style={themeStyle}>
      <nav className="topbar" aria-label="Main navigation">
        <div className="brand" aria-label={`${portfolio.name} portfolio`}>
          <Sparkles size={20} />
          <span>{portfolio.name}</span>
        </div>
        <div className={`navlinks${mobileMenuOpen ? ' open' : ''}`}>
          <a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="#work" onClick={() => setMobileMenuOpen(false)}>Work</a>
          <a href="#experience" onClick={() => setMobileMenuOpen(false)}>Journey</a>
          <a href="#skills" onClick={() => setMobileMenuOpen(false)}>Skills</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
        </div>
        <button
          className="iconButton"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <Menu size={20} />
        </button>
      </nav>

      <section className="hero" id="home">
        <div className="heroCopy">
          <p className="eyebrow"><MapPin size={16} /> {portfolio.location} - {portfolio.availability}</p>
          <h1>{portfolio.headline}</h1>
          <p className="lede">{portfolio.summary}</p>
          <div className="actions">
            <a className="primary" href="#work">View profile <ArrowUpRight size={18} /></a>
            <a className="secondary" href={`mailto:${portfolio.email}`}>Contact {portfolio.name.split(' ')[0]}</a>
          </div>
          <div className="skillStrip" aria-label="Skills">
            {portfolio.skills.map((skill) => <span key={skill}>{skill}</span>)}
          </div>
        </div>
        <div className="portraitPanel" aria-label={`${portfolio.name} profile visual`}>
          <div className="portrait">
            <div>
              <div className="portraitInitials">{portfolio.initials}</div>
              <p>{portfolio.name}</p>
            </div>
            <div className="status"><span></span> {portfolio.availability}</div>
          </div>
          <div className="quickStats">
            {portfolio.stats.map((stat) => (
              <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="work">
        <div className="sectionHeader">
          <p>Selected Work</p>
          <h2>Profile highlights</h2>
        </div>
        <div className="projectGrid">
          {portfolio.projects.map((project) => (
            <article className="projectCard" key={project.title}>
              <div className="projectThumb"><BriefcaseBusiness size={28} /></div>
              <p>{project.type}</p>
              <h3>{project.title}</h3>
              <span>{project.detail}</span>
              <div className="tags">
                {project.tags.map((tag) => <small key={tag}>{tag}</small>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="split section" id="experience">
        <div className="sectionHeader">
          <p>Experience</p>
          <h2>Background and strengths</h2>
        </div>
        <div className="timeline">
          {portfolio.experience.map((item) => (
            <article key={`${item.period}-${item.title}`}>
              <time>{item.period}</time>
              <div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {portfolio.skillGroups?.length && (
        <section className="section skillGroupsSection" id="skills">
          <div className="sectionHeader">
            <p>Skills</p>
            <h2>Analytics-ready skill set</h2>
          </div>
          <div className="skillGroupGrid">
            {portfolio.skillGroups.map((group) => (
              <article className="skillGroup" key={group.title}>
                <h3>{group.title}</h3>
                <div className="detailList compactList">
                  {group.items.map((item) => <span key={item}>{item}</span>)}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {(portfolio.education?.length || portfolio.strengths?.length) && (
        <section className="resumeDetails section" id="details">
          {portfolio.education?.length && (
            <div>
              <div className="sectionHeader compactHeader">
                <p>Education</p>
                <h2>Academic record</h2>
              </div>
              <div className="detailList">
                {portfolio.education.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
          )}
          {portfolio.strengths?.length && (
            <div>
              <div className="sectionHeader compactHeader">
                <p>Strengths</p>
                <h2>Personality skills</h2>
              </div>
              <div className="detailList">
                {portfolio.strengths.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
          )}
        </section>
      )}

      <section className="contact" id="contact">
        <div>
          <p className="eyebrow"><Moon size={16} /> Contact</p>
          <h2>Connect with {portfolio.name}</h2>
        </div>
        <div className="contactActions">
          {portfolio.links.map((link) => (
            <a href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noreferrer' : undefined} key={link.label}>
              {linkIcon(link.type)} {link.label}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

function App() {
  const slug = getCurrentSlug();
  if (!slug) return <PortfolioDirectory />;
  return <PortfolioPage portfolio={getPortfolioBySlug(slug)} />;
}

createRoot(document.getElementById('root')).render(<App />);