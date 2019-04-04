

  var name;
  var destination;
  var firstArrival;
  var frequency;
  var database;
  var trainFirebaseData;
  var newFirebaseData;
  var time;
  var clock;
  var audio = new Audio("assets/audio/harrypotter.mp3");
  
  $(document).ready(function () {
 
      
      // Running Clock at the top
      function runningClock() {
          time = moment().format("hh:mm:ss A");
          $("#time").text(time);
          
      }
      //  Call function with setInterval
      clock = setInterval(runningClock , 1000);
  
      var config = {
        apiKey: "AIzaSyCSHRXJZKjzTi266sw7RE_lf9N4y_u3zT4",
        authDomain: "rps-multiplayer-5169c.firebaseapp.com",
        databaseURL: "https://rps-multiplayer-5169c.firebaseio.com",
        projectId: "rps-multiplayer-5169c",
        storageBucket: "rps-multiplayer-5169c.appspot.com",
        messagingSenderId: "489462411902"
      };
      firebase.initializeApp(config);
      
      database = firebase.database();
  
      $("#submitButton").on("click", function (event) {
  
          event.preventDefault();
  
          //  Grab Input values IF the conditon above is true
          name = $("#trainNameInput").val().trim();
          destination = $("#destinationInput").val().trim();
          firstArrival = $("#firstTrainTimeInput").val().trim();
          frequency = $("#frequencyInput").val().trim();
  
  
          console.log(firstArrival);
  
  
  
  
          //  Link and assign variable for firebase
          trainFirebaseData = {
              DatatrainName: name,
              Datadest: destination,
              DatafirstArrival: firstArrival,
              Datafrequency: frequency,
              TimeStamp: firebase.database.ServerValue.TIMESTAMP
          };
  
          //    Variable for firebase to link train easier
          database.ref().push(trainFirebaseData);
  
      //  Make sure fields are back to blank after adding a train
          clear();
  
      });
  
      database.ref().on("child_added", function (childSnapshot) {
          //  make variable to ease reference
          var snapName = childSnapshot.val().DatatrainName;
          var snapDest = childSnapshot.val().Datadest;
          var snapFreq = childSnapshot.val().Datafrequency;
          var snapArrival = childSnapshot.val().DatafirstArrival;
  
          //  Current Time
          var timeIs = moment();
          //  Convert Time and configure for Future use by pushing firstArrival back 1 year
          var firstArrivalConverted = moment(snapArrival , "HH:mm").subtract(1, "years");
          //  Calculate now vs First Arrival
          var diff = timeIs.diff(moment(firstArrivalConverted) , "minutes");
          var left = diff % snapFreq;
          //  How long till train
          var timeLeft = snapFreq - left;
          var newArrival = timeIs.add(timeLeft , "minutes");
          var nextTrain = moment(newArrival).format("HH:mm");
  
          $("#table-info").append("<tr><td>" + snapName +"</td><td>" + snapDest + "</td><td>" + snapFreq + "</td><td>" + nextTrain + "</td><td>" + timeLeft + "</td></tr>");
  
  
      });
  
      function clear() {
          $("#trainNameInput").val("");
          $("#destinationInput").val("");
          $("#firstTrainTimeInput").val("");
          $("#frequencyInput").val("");
      }
  
  
      
  
  });
 
