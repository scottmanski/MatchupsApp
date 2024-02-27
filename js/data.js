
import Data from '../data/Data.json' assert { type: 'json' };
import ts from '../data/ts.json' assert { type: 'json' };

import { watchFile } from 'node:fs';

document.getElementById("Mlastupdate").children[0].innerText = ts;



watchFile("./data/Data.json", (curr, prev) => {
  console.log(`the current mtime is: ${curr.mtime}`);
  console.log(`the previous mtime was: ${prev.mtime}`);
}); 

var dt = Data;

//console.log(Data);

//var data_filter = Data.filter(element => element.Player_Civ == "Franks")
//console.log(data_filter);


function formatCiv (civ) {
  if (!civ.id) {
    return civ.text;
  }
  if (civ.element.value == "Any") {
    return civ.text;
  }
  var baseUrl = "Civs";
  var $civ = $(
    '<span style="font-size: 18px; font-weight: 400; white-space: nowrap;"><img src="' + baseUrl + '/' + civ.element.value + '.png" class="img-flag" /> ' + civ.text + '</span>'
  );
  return $civ;
};

$(".js-example-templating").select2({
  templateResult: formatCiv,
  templateSelection: formatCiv,
  //minimumResultsForSearch: Infinity
});

$('.js-example-templating.civ1').on('change', function (e)
{
  if (document.querySelector('[class="select2-selection select2-selection--single"]').children[0].innerText == "Any") {
    document.getElementById("otherciv").style.display = "none";
  } else {
    document.getElementById("otherciv").style.display = "inline-block";
  }
  updateData();
});

$('.js-example-templating').on('change', function (e)
{
  updateData();
});


function callback(mutationsList) {
  mutationsList.forEach((mutation) => {
    //console.log(mutation.target);
    if (mutation.attributeName === "data-active") {
      updateData();
    }
  });
}

var mapInput = document.getElementById('MCmap');
mapInput.onchange = (event) => {

  var map = document.getElementById('MCmap').value;
  //if (map == "GoldRush") {
  //  map = "Gold Rush";
  //}
  if (map == "All") {
    document.getElementById('map_image').style.display = "none";
  } else {
    document.getElementById('map_image').style.display = "block";
    document.getElementById('mappath').src = "./Maps/" + map + ".png";
    document.getElementById('mapname').innerText = "  " + map;
  }
  updateData();
}

const mutationObserver = new MutationObserver(callback);

mutationObserver.observe(document.querySelector("#qualifier"), { attributes: true });
mutationObserver.observe(document.querySelector("#mainevent"), { attributes: true });

function stage(x) {
  var y = null;
  if (x.srcElement.tagName == "I") {
    y = x.srcElement.parentElement.parentElement;
  } else {
    y = x.srcElement;
  }
  
  if (y.classList.contains('active')) {
    y.children[0].style.display = "none";
    y.setAttribute("data-active", "false");
  } else {
    y.children[0].style.display = "inline-block";
    y.setAttribute("data-active", "true");
  }
}

function updateData() {
  //console.log("updating data");
  dt.clear();
  var dt_new = Data; //Data.filter(element => element.Player_Civ == "Franks")
  var civ1 = document.querySelector('[class="select2-selection select2-selection--single"]').children[0].title;
  var civ2 = document.querySelectorAll('[class="select2-selection select2-selection--single"]')[1].children[0].title;
  var map = document.getElementById('MCmap').value;
  if (document.querySelector("#qualifier").getAttribute("data-active") == "false") {
    dt_new = dt_new.filter(element => element.Stage != "Qualifier");
  }
  if (document.querySelector("#mainevent").getAttribute("data-active") == "false") {
    dt_new = dt_new.filter(element => element.Stage != "Main Event");
  }
  if (civ1 != "Any") {
    if (civ2 == "Any") {
      dt_new = dt_new.filter(element => element.Player_Civ == civ1 | element.Opp_Civ == civ1);
    } else {
      dt_new = dt_new.filter(element => (element.Player_Civ == civ1 & element.Opp_Civ == civ2) | (element.Player_Civ == civ2 & element.Opp_Civ == civ1));
    }
  }
  if (map != "All") {
    dt_new = dt_new.filter(element => element.Map == map);
  }
  //console.log(dt_new);
  dt.rows.add(dt_new);
  dt.draw();
}

document.querySelector("#mainevent").addEventListener("click", stage);
document.querySelector("#qualifier").addEventListener("click", stage);

//new DataTable('#example', {

dt = $('#example').DataTable( {
    data: dt,
    columns: [
       { data: 'Stage', title: 'Stage', className: 'dt-center' },
       { data: 'Round', title: 'Round', className: 'dt-center' },
       { data: 'Game', title: 'Game', className: 'dt-center' },
       { data: 'Map', title: 'Map', className: 'dt-center' },
       { data: 'Player_Civ2', title: 'Civ', className: 'dt-right' },
       { data: 'Player', title: 'Player', className: 'dt-right' },
       { data: 'vs', title: '', orderable: false, className: 'dt-center' },
       { data: 'Opponent', title: 'Opponent' },
       { data: 'Opp_Civ2', title: 'Civ' },
       { data: 'Winner', title: 'Winner', className: 'dt-center' },
       { data: 'Winning_Civ2', title: 'Winning Civ' }
      ],
    autoWidth: true
});
