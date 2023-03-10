import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import data from "./data";
function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
      //  If the current index is less than 0, it sets the index state variable
      // to the last index of the people array
    }
    if (index > lastIndex) {
      setIndex(0);
      // If the current index is greater than the last index of the people array,
      // it sets the index state variable to 0.
    }
  }, [index, people]);
  // hook that runs whenever the index or people state variables change.

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
      // the timing 3000ms = 3s
    }, 3000);
    return () => clearInterval(slider);
    // it clear the interval when you press the net button
  }, [index]);

  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span>reviews
        </h2>
      </div>
      <div className="section-center">
        {people.map((person, personIndex) => {
          const { id, image, name, title, quote } = person;
          // more stuff coming up
          let position = "nextSlide";
          // check css for the nexSlide it has been shifted to the right
          if (personIndex === index) {
            // personIndex = index(0)
            position = "activeSlide";
            // position is place in 0 check css for activeSlide
          }
          if (
            personIndex === index - 1 ||
            // index is -1 for prev
            (index === 0 && personIndex === people.length - 1)
            // when index is also 0 the prev should work and when item has finished
            // from the array from the left side the prev should work and bring content
          ) {
            position = "lastSlide";
            // position set to the left side check css for lastSlide
          }

          return (
            <article className={position} key={id}>
              <img src={image} alt={name} className="person-img" />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text">{quote}</p>
              <FaQuoteRight className="icon" />
            </article>
          );
        })}
        <button className="prev" onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default App;
