
import AllQ from '../data/All Qualifier Civ Data.json' assert { type: 'json' };
import AllME from '../data/All Main Event Civ Data.json' assert { type: 'json' };
import AllQME from '../data/All Qualifier Main Event Civ Data.json' assert { type: 'json' };
import ArabiaQ from '../data/Arabia Qualifier Civ Data.json' assert { type: 'json' };
import ArabiaME from '../data/Arabia Main Event Civ Data.json' assert { type: 'json' };
import ArabiaQME from '../data/Arabia Qualifier Main Event Civ Data.json' assert { type: 'json' };
import CrossQ from '../data/Cross Qualifier Civ Data.json' assert { type: 'json' };
import CrossME from '../data/Cross Main Event Civ Data.json' assert { type: 'json' };
import CrossQME from '../data/Cross Qualifier Main Event Civ Data.json' assert { type: 'json' };
import GoldRushQ from '../data/Gold Rush Qualifier Civ Data.json' assert { type: 'json' };
import GoldRushME from '../data/Gold Rush Main Event Civ Data.json' assert { type: 'json' };
import GoldRushQME from '../data/Gold Rush Qualifier Main Event Civ Data.json' assert { type: 'json' };
import IslandsQ from '../data/Islands Qualifier Civ Data.json' assert { type: 'json' };
import IslandsME from '../data/Islands Main Event Civ Data.json' assert { type: 'json' };
import IslandsQME from '../data/Islands Qualifier Main Event Civ Data.json' assert { type: 'json' };
import MudflowQ from '../data/Mudflow Qualifier Civ Data.json' assert { type: 'json' };
import MudflowME from '../data/Mudflow Main Event Civ Data.json' assert { type: 'json' };
import MudflowQME from '../data/Mudflow Qualifier Main Event Civ Data.json' assert { type: 'json' };
import QuarryQ from '../data/Quarry Qualifier Civ Data.json' assert { type: 'json' };
import QuarryME from '../data/Quarry Main Event Civ Data.json' assert { type: 'json' };
import QuarryQME from '../data/Quarry Qualifier Main Event Civ Data.json' assert { type: 'json' };
import SlopesQ from '../data/Slopes Qualifier Civ Data.json' assert { type: 'json' };
import SlopesME from '../data/Slopes Main Event Civ Data.json' assert { type: 'json' };
import SlopesQME from '../data/Slopes Qualifier Main Event Civ Data.json' assert { type: 'json' };

var dt;

function callback(mutationsList) {
  mutationsList.forEach((mutation) => {
    if (mutation.attributeName === "class") {
      updateData();
    }
  });
}

var mapInput = document.getElementById('MCmap');
mapInput.onchange = (event) => {

  var map = document.getElementById('MCmap').value;
  if (map == "GoldRush") {
    map = "Gold Rush";
  }
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
  } else {
    y.children[0].style.display = "inline-block";
  }

}

function updateData() {
  dt.clear();
  var file = "";
  if (document.querySelector("#qualifier").classList.contains('active')) {
    file += "Q";
  }
  if (document.querySelector("#mainevent").classList.contains('active')) {
    file += "ME";
  }
  if (file != "") {
    file = document.getElementById('MCmap').value + file;
    //console.log(file);
    dt.rows.add(eval(file));
  }
  dt.draw();
}

document.querySelector("#mainevent").addEventListener("click", stage);
document.querySelector("#qualifier").addEventListener("click", stage);

//new DataTable('#example', {

dt = $('#example').DataTable( {
      order: [[1, 'desc']],
    pageLength: 100,
    dom: "t",
    columns: [
      { title: 'Civilization' },
      { title: 'Wins' },
      { title: 'Losses' },
      { title: 'Win%' },
      { title: 'First Pick' },
      { title: 'Pick' },
      { title: 'Ban' },
      { title: 'Pass' },
      { title: 'First Pick%' },
      { title: 'Pick%' },
      { title: 'Ban%' },
      { title: 'Pass%' },
      { title: 'Played%' }
      ],
      data: AllQ,

    autoWidth: true
});
