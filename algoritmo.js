window.onload = function() {
  var mapa = L.map("meumapa", {
    center: [-25.5, -49.25],
    zoom: 11
  });

  var osmPretoBranco = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	  maxZoom: 18,
	  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(mapa);

  var osmPretoBranco2 = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	  maxZoom: 18,
	  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  var Simbolo = L.Icon.extend({
    options: {
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15]
    }
  });

  var simbolo = [];

  for(var i=0; i<=174; i++) {
    simbolo[i] = new Simbolo({iconUrl: "simbolos/" + i + ".svg"});
    L.marker([Math.random()*180-90, Math.random()*360-180], {icon: simbolo[i]}).addTo(mapa).bindPopup("Icone " + i);
  }

  mapa.locate({
    setView: false,
    maxZoom: 18,
    timeout: 100000
  });

  mapa.on("locationfound", function(evento) {
    L.marker(evento.latlng, {icon: simbolo[8]}).addTo(mapa);
    L.circle(evento.latlng, evento.accuracy).addTo(mapa);
  });

  var pontos = [
    {
      type: "Feature",
      properties: {
        id: 1,
        descricao: "Meu primeiro ponto em GeoJSON"
      },
      geometry: {
        type: "Point",
        coordinates: [-49.2, -25.5]
      }
    },
    {
      type: "Feature",
      properties: {
        id: 2,
        descricao: "Meu segundo ponto em GeoJSON"
      },
      geometry: {
        type: "Point",
        coordinates: [-49.3, -25.3]
      }
    }
  ];



  L.geoJSON(pontos, {
    pointToLayer: function(feicao, posicao) {
      if(feicao.properties.id == 1) {
        return L.marker(posicao, {icon: simbolo[1]});
      } else {
        return L.marker(posicao, {icon: simbolo[2]});
      }
    },
    onEachFeature: function(feicao, camada) {
      camada.bindPopup("ID: "+feicao.properties.id + "<br/> Descricao: " + feicao.properties.descricao);
    }
  }).addTo(mapa);

  L.geoJSON(bairros, {
    style: function(feicao) {
      cores = ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"];
      return {
        weight: 0.2,
        color: "#000",
        fillColor: cores[feicao.properties.CD_REGIONA-1],
        fillOpacity: 1
      }
    },
    onEachFeature: function(feicao, camada) {
      camada.bindTooltip(feicao.properties.NOME);
    }
  }).addTo(mapa);

  // mapa.on("locationerror", function(evento) {
  //   alert("Nao foi possivel obter sua localizacao");
  // });



  var miniMap = new L.Control.MiniMap(osmPretoBranco2).addTo(mapa);
}
