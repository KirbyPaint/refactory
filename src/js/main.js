import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';
import Supergalactic from './supergalactic.js';

$(document).on("click", ":submit", function(event){
  event.preventDefault();
  
  const age = $("#userInputAge").val();
  const supergalactic = new Supergalactic(age);
  const expectancy = $("#userInputExpectancy").val();
  const supergalacticExpectancy = new Supergalactic(expectancy);
  const planet = $(this).val();
  let planetAge = 0;
  let planetExpectancy = 0;
  const planetYearsRemaining = supergalactic.lifeExpectancy(age, expectancy, planet);

  switch (planet) {
  case "Mercury":
    planetAge = supergalactic.mercury();
    planetExpectancy = supergalacticExpectancy.mercury();
    break;
  case "Venus":
    planetAge = supergalactic.venus();
    planetExpectancy = supergalacticExpectancy.venus();
    break;
  case "Mars":
    planetAge = supergalactic.mars();
    planetExpectancy = supergalacticExpectancy.mars();
    break;
  case "Jupiter":
    planetAge = supergalactic.jupiter();
    planetExpectancy = supergalacticExpectancy.jupiter();
    break;
  }

  $(".main").text(`On ${planet}, you would be ${planetAge} years old! People from ${planet} with your life expectancy usually live to around ${planetExpectancy} years old.`);
  if (planetExpectancy < planetAge) {
    $(".alt").text(`This means, you've lived ${planetYearsRemaining} year(s) longer than expected for ${planet}. You've lived long, now go and prosper!`);
  } else {
    $(".alt").text(`This means, you have an estimated ${planetYearsRemaining} ${planet}-sized years left. Make 'em count!`);
  }
});