import "leaflet/dist/leaflet.css";
import "./App.css";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import usePopupSound from "./usePopupSound";

function App() {
  const markers = [
    {
      // long and lat for Toronto
      position: [43.665083, -79.452767],
      //popup content
      content: "The Junction Triangle",
      //number determines which sound file to play
      sound: 1, // Adjust the sound file path
    },
    {
      position: [43.6503027, -79.3703401],
      content: "St. Lawrence Market",
      sound: 2, // Adjust the sound file path
    },
    {
      position: [43.6487579,-79.3988509],
      content: "Queen and Spadina",
      sound: 3, // Adjust the sound file path
    },
    {
      position: [43.6434786,-79.4249466],
      content: "Queen and Dovercourt",
      sound: 4, // Adjust the sound file path
    },
    {
      position: [43.6390613,-79.4076519],
      content: "Harbourfront Centre",
      sound: 5, // Adjust the sound file path
    },
      
  ];
  const icons = new Icon({
    iconUrl: require("./images/map-marker-icon.png"),
    iconSize: [20, 30],
  });
  const { playPopupSound, isPlaying, playbackInfo } = usePopupSound();

  return (
    <div>
      <MapContainer center={[43.6532, -79.3832]} zoom={13}>
        <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png" />
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            content={marker.content}
            icon={icons}
            eventHandlers={{
              click: (e) => {
                console.log("play" + marker.sound, e);
                playPopupSound(marker.sound);
              },
            }}
          >
            <Popup interactive={true}>{marker.content}</Popup>
          </Marker>
        ))}
      </MapContainer>
      {isPlaying && <div className="now-playing">{playbackInfo}</div>}
    </div>
  );
}

export default App;



