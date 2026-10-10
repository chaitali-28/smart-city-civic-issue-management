import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';

import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',

  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',

  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export default function CityMap() {
  const cityCenter = [20.0063, 73.7898];

  const issues = [
    {
      id: 1,
      position: [20.0063, 73.7898],
      title: 'Road Damage',
      category: 'Pothole',
      status: 'Reported',
    },
    {
      id: 2,
      position: [20.0115, 73.7845],
      title: 'Streetlight Issue',
      category: 'Streetlight',
      status: 'In Progress',
    },
    {
      id: 3,
      position: [20.0012, 73.7955],
      title: 'Waste Collection',
      category: 'Waste',
      status: 'Resolved',
    },
    {
      id: 4,
      position: [20.0170, 73.7920],
      title: 'Water Leakage',
      category: 'Water',
      status: 'Reported',
    },
  ];

  return (
    <div className="w-full h-full">
      <MapContainer
        center={cityCenter}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {issues.map((issue) => (
          <Marker key={issue.id} position={issue.position}>
            <Popup>
              <div className="min-w-[160px]">
                <p className="text-xs text-slate-500 uppercase tracking-wide">
                  Civic Issue
                </p>

                <h3 className="font-semibold text-slate-900 mt-1">
                  {issue.title}
                </h3>

                <p className="text-sm text-slate-600 mt-1">
                  Category: {issue.category}
                </p>

                <p className="text-sm mt-1">
                  Status:{' '}
                  <span className="font-medium">
                    {issue.status}
                  </span>
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}