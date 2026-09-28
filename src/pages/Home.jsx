import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroStudentsImg from "../assets/hero-students.png";
import planYourTimeImg from "../assets/plan your time img.png";
import stayOnTrackImg from "../assets/stay on track img.png";
import prepareConfidenceImg from "../assets/prepare with confidence img.png";
import seeProgressImg from "../assets/see you progress img.png";
import studentImg from "../assets/student img.png";
import teacherImg from "../assets/teacher img.png";

import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  GraduationCap,
  LibraryBig,
  Plus,
  Sparkles,
  UserRound,
  UsersRound,
} from "lucide-react"; 

function Home() {
  return (
    <div className="home-page">

      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="hero-section">

        <img
          src={heroStudentsImg}
          alt="Students studying"
          className="hero-decorative-img"
        />

        <div className="hero-content hero-copy">
          <div className="hero-badge" aria-label="Smart Study Management">
            <Sparkles size={18} />
            <span>Smart Study Management</span>
          </div>

          <h1>
            <span className="hero-line">Plan Your Study.</span>
            <span className="hero-line accent-line">Achieve Your Goals.</span>
          </h1>

          <p>
            Organize your subjects, assignments, exams and study schedule all in one place. Stay focused, stay organized and make your study journey easier.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="hero-btn primary-btn hero-cta">
              Get Started
            </Link>
            <Link to="/login" className="hero-btn secondary-btn hero-login">
              Login
            </Link>
          </div>
        </div>

      </section>

      {/* ================= FEATURES ================= */}
      <section className="features-section">
        <div className="section-heading feature-heading">
          <span>FEATURES</span>
          <h2>
            <strong>Study Smarter</strong>
          </h2>
          <p>Manage your complete study routine from one simple and organized platform.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-photo">
              <img src={planYourTimeImg} alt="Plan Your Time" className="feature-photo-img" />
            </div>
            <div className="feature-card-body">
              <h3>Plan Your Time</h3>
              <p>Create and manage your daily and weekly study schedule with ease.</p>
              <a href="#" className="feature-link">Learn More <ArrowRight size={16} /></a>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-photo">
              <img src={stayOnTrackImg} alt="Stay on Track" className="feature-photo-img" />
            </div>
            <div className="feature-card-body">
              <h3>Stay on Track</h3>
              <p>Keep track of assignments, deadlines and their completion status.</p>
              <a href="#" className="feature-link">Learn More <ArrowRight size={16} /></a>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-photo">
              <img src={prepareConfidenceImg} alt="Prepare with Confidence" className="feature-photo-img" />
            </div>
            <div className="feature-card-body">
              <h3>Prepare with Confidence</h3>
              <p>Organize upcoming exams and prepare for them on time.</p>
              <a href="#" className="feature-link">Learn More <ArrowRight size={16} /></a>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-photo">
              <img src={seeProgressImg} alt="See Your Progress" className="feature-photo-img" />
            </div>
            <div className="feature-card-body">
              <h3>See Your Progress</h3>
              <p>Monitor your study progress and stay closer to your goals.</p>
              <a href="#" className="feature-link">Learn More <ArrowRight size={16} /></a>
            </div>
          </div>
        </div>
      </section>
      {/* ================= HOW IT WORKS ================= */}
      <section className="how-section">
        <div className="section-heading how-heading">
          <span className="how-badge">HOW IT WORKS</span>
          <h2>
            Simple Steps to
            <br />
            <strong>Better Study</strong>
          </h2>
          <p>Get started in just a few steps and take control of your learning journey.</p>
        </div>

        <div className="steps-container">
          <div className="step-card step-purple">
            <div className="step-card-top">
              <div className="step-icon step-icon-purple">
                <UserRound size={34} />
                <span className="step-icon-badge"><Plus size={15} /></span>
              </div>
              <span className="step-number"></span>
            </div>
            <h3>Create Account</h3>
            <p>Register your account as a student or teacher.</p>
            <Link to="/register" className="step-arrow">
              <span>Get Started</span>
              <ArrowRight size={16} />
            </Link>
            <span className="step-connector"><ArrowRight size={15} /></span>
          </div>

          <div className="step-card step-blue">
            <div className="step-card-top">
              <div className="step-icon step-icon-blue">
                <LibraryBig size={34} />
                <span className="step-icon-badge"><CalendarDays size={14} /></span>
              </div>
              <span className="step-number"></span>
            </div>
            <h3>Plan Your Studies</h3>
            <p>Add subjects, assignments, exams and study sessions.</p>
            <Link to="/login" className="step-arrow">
              <span>Start Planning</span>
              <ArrowRight size={16} />
            </Link>
            <span className="step-connector"><ArrowRight size={15} /></span>
          </div>

          <div className="step-card step-green">
            <div className="step-card-top">
              <div className="step-icon step-icon-green">
                <BarChart3 size={34} />
              </div>
              <span className="step-number"></span>
            </div>
            <h3>Track Progress</h3>
            <p>Monitor your progress and achieve your academic goals.</p>
            <Link to="/login" className="step-arrow">
              <span>View Progress</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

     
      {/* ================= STUDENT / TEACHER ================= */}
<section className="role-section">

  <div className="role-content">
    <span className="role-badge-tag">
      <UsersRound size={14} />
      FOR EVERYONE
    </span>

    <h2>
      One Platform.
      <br />
      <strong>Two Powerful Experiences.</strong>
    </h2>

    <p>
      Learnly provides dedicated features for both
      students and teachers.
    </p>

    <span className="role-mini-badge">
      <Sparkles size={14} />
      Built for learning
    </span>
  </div>


  <div className="role-cards">

    <div className="role-card">
      <div className="role-card-photo">
        <img src={studentImg} alt="Student using Learnly" />
        <div className="role-card-icon role-icon-purple">
          <GraduationCap size={22} />
        </div>
      </div>
      <div className="role-card-body">
        <h3>For Students</h3>
        <p>
          Manage your schedule, assignments, exams, study
          sessions and academic progress.
        </p>
        <Link to="/register" className="role-card-btn">
          Explore Student Portal <ArrowRight size={16} />
        </Link>
      </div>
    </div>

    <div className="role-card">
      <div className="role-card-photo">
        <img src={teacherImg} alt="Teacher using Learnly" />
        <div className="role-card-icon role-icon-purple">
          <UsersRound size={22} />
        </div>
      </div>
      <div className="role-card-body">
        <h3>For Teachers</h3>
        <p>
          Manage students, assignments, exams and help your
          students stay on track.
        </p>
        <Link to="/register" className="role-card-btn">
          Explore Teacher Portal <ArrowRight size={16} />
        </Link>\
        
      </div>
    </div>

  </div>

</section>


      {/* ================= CTA ================= */}
      <section className="cta-section">

        <h2>
          Ready to Organize Your
          <br />
          Study Journey?
        </h2>

        <p>
          Start planning today and make every study session count.
        </p>

        <Link
          to="/register"
          className="cta-btn"
        >
          Create Your Account
        </Link>

      </section>


      {/* ================= FOOTER ================= */}
      <Footer />

    </div>
  );
}

export default Home;