var fLength = document.getElementById('fLength');
var TypeSelector = document.getElementById('typeSelector');
var Gbtn = document.getElementById('btn');

//fibonacci Object
var fibonacci = {
  type: "",
  time: "",
  res: ""
};

//Constructor
function Fibonacci (type, time, res) {
  this.type = type;
  this.time = time;
  this.res = res;
  }

Gbtn.addEventListener("click", function () {
 var typeSelector = TypeSelector.value;
    if (typeSelector == 1) {
      var t0 = performance.now();
      var s = BF(fLength.value) + "";
      var t1 = performance.now();
      var f1 = new Fibonacci("Brute Force", (t1-t0) + "ms", s );

      printResult(f1);
    }
    if (typeSelector==2) {
      var t0 = performance.now();
      var s = DC(fLength.value) + "";
      var t1 = performance.now();
      var f1 = new Fibonacci("Brute Force", (t1-t0) + "ms", s );

      printResult(f1);
    }
    if (typeSelector==4) {
      printResult(DP());
    }
});

function DP() {
  var t0 = performance.now();

  var f = [];
  f[0] = 1;
  f[1] = 1;
  
  for (i = 2; i < fLength.value + 1; i++) {
    f[i] = f[i-1] + f[i-2];
  }

  var t1 = performance.now();

  var fi = new Fibonacci("Dynamic Programming", (t1 - t0) + "ms",
   f[fLength.value]);
  return fi;
}

function BF( num ) { 
  if(num <= 1) 
    return 1;
  return BF(num-1) + BF(num-2);
}

function DC (num) {
  if(num == 1 || num == 0){
    return 1;
  }
  else{
    const a = DC( Math.floor( (num)/2 ) );
    const b = DC( Math.floor( (num)/2 ) - 1 );

    if(num % 2 != 0){
      return a * (a + 2 * b);
    }else{
      return a * a + b * b;
    }
  }
}

function printResult(fibonacci) {
  var P = document.getElementById('Ptype');
  var t = document.getElementById('time');
  var fi = document.getElementById('fibonacci');

  //Set value
  P.innerHTML = "<p id='Ptype'>" +fibonacci.type + "</p>";
  t.innerHTML = "<p id='time'>" +fibonacci.time + "</p>";
  fi.innerText = fibonacci.res;
}
