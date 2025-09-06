import React, { useState, useRef, useEffect } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';

export default function MapwithRoutes() {
	const [location, setLocation] = useState(null);
	const [locError, setLocError] = useState(null);
	const mapRef = useRef();
	const mapInstanceRef = useRef();

	// Get live location
	const handleGetLocation = () => {
		setLocError(null);
		if (!navigator.geolocation) {
			setLocError('Geolocation is not supported by your browser.');
			return;
		}
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				setLocation({
					lat: pos.coords.latitude,
					lon: pos.coords.longitude,
				});
			},
			(err) => {
				setLocError('Unable to retrieve your location.');
			}
		);
	};

	// Initialize map when location is set
	useEffect(() => {
		if (location && mapRef.current) {
			if (mapInstanceRef.current) {
				mapInstanceRef.current.setTarget(null);
			}
			// Use a built-in SVG marker (red pin)
			const svgMarker = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><circle cx='16' cy='16' r='10' fill='%23e11d48' stroke='white' stroke-width='3'/></svg>`;
			const marker = new Feature({
				geometry: new Point(fromLonLat([location.lon, location.lat]))
			});
			marker.setStyle(
				new Style({
					image: new Icon({
						anchor: [0.5, 1],
						src: svgMarker,
						scale: 1
					})
				})
			);
			const vectorSource = new VectorSource({ features: [marker] });
			const vectorLayer = new VectorLayer({ source: vectorSource });
			mapInstanceRef.current = new Map({
				target: mapRef.current,
				layers: [
					new TileLayer({ source: new OSM() }),
					vectorLayer
				],
				view: new View({
					center: fromLonLat([location.lon, location.lat]),
					zoom: 16,
				})
			});
		}
		// Cleanup on unmount
		return () => {
			if (mapInstanceRef.current) {
				mapInstanceRef.current.setTarget(null);
				mapInstanceRef.current = null;
			}
		};
	}, [location]);

	return (
		<div className="w-full min-h-screen bg-[#0A0D14] text-white p-6">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent text-center">
					📍 Live Location Map
				</h1>
				<div className="bg-[#181C25] border border-blue-400/30 rounded-2xl p-8 mb-8 shadow-lg flex flex-col items-center">
					<div className="flex flex-col sm:flex-row w-full justify-between items-center mb-4 gap-4">
						<span className="font-semibold text-lg">Show My Live Location on Map:</span>
						<button
							className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition"
							onClick={handleGetLocation}
						>
							Get Location
						</button>
					</div>
					{locError && <div className="text-red-400 font-semibold mb-2">{locError}</div>}
					{location && (
						<div className="w-full flex justify-center">
							<div ref={mapRef} style={{ width: '100%', maxWidth: 500, height: 300, borderRadius: 12, overflow: 'hidden', border: '2px solid #2563eb' }} />
							<div className="ml-4 flex flex-col justify-center">
								<div><b>Latitude:</b> <span className="text-blue-300">{location.lat}</span></div>
								<div><b>Longitude:</b> <span className="text-blue-300">{location.lon}</span></div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
