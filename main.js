objectDetector= "";
objects = [];
status1 = "";

function preload(){
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name=document.getElementById("object_name").value
}

function setup() {
  canvas = createCanvas(420, 420);
  canvas.center();
  video=createCapture(VIDEO);
  video.size(420, 420);
  video.hide()
}

function modelLoaded() {
  console.log("Model Loaded!")
  status1 = true;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 640, 420);

      if(status1 != "")
      {
        objectDetector.detect(video, gotResult);
        for (var i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected";
          fill(255, 0, 0);
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke(255, 0, 0);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
          if (objects[i].label==object_name) {
        video.stop()
        objectDetector.detect(gotResult);
        document.getElementById("object_status").innerHTML=object_name+"found"
        synth=window.speechSynthesis;
        utter_this=new SpeechSynthesisUtterance(object_name+"found")
        synth.speek(utter_this)
          }
        }
      }
}