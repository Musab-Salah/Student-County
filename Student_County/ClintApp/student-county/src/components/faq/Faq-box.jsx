import { useState } from "react";
import "./Faq-box.css";
import { RiArrowDownSLine } from 'react-icons/ri';

const FAQBox = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [openQuestions, setOpenQuestions] = useState([]);

  const sections = [
    {
      title: "General",
      questions: [
        { question: 'What is Student County?', answer: 'Student County is a website designed to help students exchange books, find housing options, and carpool with fellow students.' },
        { question: 'Is Student County support in all univs?', answer: 'Currently, Student County is only available in select universities. Please check our website for a list of supported universities.' },
        { question: 'Is it free to use Student County?', answer: 'Yes, it is free to use Student County.' },
      ],
    },
    {
      title: "Book Service",
      questions: [
      { question: 'How do I sell my books on Student County?', answer: 'You can sell your books by creating account first then creating a listing on our website. Simply provide the book title, author, condition, and price.' },
      { question: 'Can I negotiate the price of a book?', answer: 'Yes, you can negotiate the price of a book with the seller.' },
      { question: `What if I can't find the book I need on Student County?`, answer: `If you can't find the book you need, you can create a "book wanted" listing on our website. Other students may see your listing and contact you if they have the book you need.` },
    ],
    },
    {
      title: "Housing Service",
      questions: [
        { question: `How do I find a roommate on Student County?`, answer: `You can create a roommate listing on our website, which includes details about yourself and what you are looking for in a roommate. Other students who are also looking for a roommate may contact you if they are interested.` },
        { question: `How do I advertise my available space for potential renters?`, answer: `You can create a listing on our website, which includes details about the available space and what you are looking for in a renter.` },
        { question: `Can I view pictures of the available space before contacting the renter?`, answer: `Yes, most listings include pictures of the available space.` },
      ],
    },
    {
      title: "Ride Service",
      questions: [
        { question: `How do I find a carpool or ride-sharing option on Student County?`, answer: `You can search for carpool or ride-sharing options on our website by entering your starting location and destination.` },
        { question: `How do I contact the driver or passenger?`, answer: `Once you find a carpool or ride-sharing option that matches your needs, you can contact the driver or passenger through our website messaging system.` },
        { question: `Is it safe to carpool or ride-share with someone I don't know?`, answer: `While we do our best to ensure the safety of our users, it is important to use caution and common sense when carpooling or ride-sharing with someone you don't know. We recommend meeting in a public place and letting someone know your whereabouts.` },
      ],
    },
  ];

  const handleQuestionClick = (sectionIndex, questionIndex) => {
    setOpenQuestions((prevOpenQuestions) => {
      const newOpenQuestions = [...prevOpenQuestions];
      const isOpen = newOpenQuestions[sectionIndex] === questionIndex;
      if (isOpen) {
        // Close the question by removing it from openQuestions
        newOpenQuestions[sectionIndex] = null;
      } else {
        // Open the question by adding it to openQuestions
        newOpenQuestions[sectionIndex] = questionIndex;
      }
      return newOpenQuestions;
    });
  };
  

  return (
    <div className="faq">
      <b className="faq-title">Frequently Asked Questions</b>
      <div className="faq-items">
        {sections.map((section, index) => (
          <button 
          key={index} 
          className={`btn faq-link ${ activeSection === index ? "active-button" : "" }`} 
          onClick={() => setActiveSection(index)} > {section.title}
          </button>
        ))}
      </div>
      {sections.map((section, sectionIndex) => (
        <div
          key={sectionIndex}
          className={`faq-container ${
            activeSection === sectionIndex ? "selected" : ""
          }`}
        >
          {section.questions.map((q, questionIndex) => (
            <div key={questionIndex}>
              <div className="faq1">
                <div
                  className="question-container"
                  onClick={() => handleQuestionClick(sectionIndex, questionIndex)}
                >
                  <div className="h5">{q.question}</div>
                  <RiArrowDownSLine className={`arrow-down ${ openQuestions[sectionIndex] === questionIndex ? "rotate" : "" }`}/>

                </div>
                {openQuestions[sectionIndex] === questionIndex && (
                  <div className="answer">{q.answer}</div>
                )}
              </div>
              {questionIndex !== section.questions.length - 1 && (
                <div className="line">
                  <div className="line-child" />
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FAQBox;
