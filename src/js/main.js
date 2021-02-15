import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';
import Refactory from './refactory.js';

$(document).on("click", ":submit", function(event){
  event.preventDefault();
});