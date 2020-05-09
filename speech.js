//this api only works on chrome and firefox
try {
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();
} catch (e) {
  console.error(e);
}

//elements from the page
var textbox = document.getElementById('textbox');
var instructions = document.getElementById('instructions');
var button = document.getElementById('start-btn');


function speechRec() {
  if (button.innerHTML == "Start") {
    recognition = new SpeechRecognition();
    button.innerHTML = "Stop";
  
  //properties
  
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.continuous = true;

  recognition.start();
  } else {
    button.innerHTML = "Start";
    recognition.stop();
  }

  recognition.onresult = (event) => {
    // event is a SpeechRecognitionEvent object.
  // It holds all the lines we have captured so far. 
  // We only need the current one.
  var current = event.resultIndex;

  // Get a transcript of what was said.
  var transcript = event.results[current][0].transcript;

  // Add the current transcript to the contents of our Note.
  textbox.innerHTML += transcript;
  
  console.log('Confidence: ' + event.results[current][0].confidence);
  }
//for these .events with the on you can also add an eventlistener with the event as an 
//argument such .addeventlistener('speechend', function)
  recognition.onspeechend = function() {
    instructions.innerHTML = "Click the Start button";
    recognition.stop();
    
  }

  recognition.onerror = function(event) {
    console.log('SpeechRecognition.onerror')
  }
  
  recognition.onaudiostart = function(event) {
      //Fired when the user agent has started to capture audio.
      console.log('SpeechRecognition.onaudiostart');
  }
  
  recognition.onaudioend = function(event) {
      //Fired when the user agent has finished capturing audio.
      console.log('SpeechRecognition.onaudioend');
  }
  
  recognition.onend = function(event) {
      //Fired when the speech recognition service has disconnected.
      console.log('SpeechRecognition.onend');
      recognition.stop();
  }
  
  recognition.onnomatch = function(event) {
      //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
      console.log('SpeechRecognition.onnomatch');

  }
  
  recognition.onsoundstart = function(event) {
      //Fired when any sound — recognisable speech or not — has been detected.
      console.log('SpeechRecognition.onsoundstart');
      
  }
  
  recognition.onsoundend = function(event) {
      //Fired when any sound — recognisable speech or not — has stopped being detected.
      console.log('SpeechRecognition.onsoundend');
  }
  
  recognition.onspeechstart = function (event) {
      //Fired when sound that is recognised by the speech recognition service as speech has been detected.
      console.log('SpeechRecognition.onspeechstart');
  }
  recognition.onstart = function(event) {
      //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
      console.log('SpeechRecognition.onstart');
      instructions.innerHTML = 'Voice recognition is ON. Start Speaking';
  }
}

//This will start the speech listening on the button click.
button.addEventListener('click', speechRec);
