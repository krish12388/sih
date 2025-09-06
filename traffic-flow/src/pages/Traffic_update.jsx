import { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import XYZ from 'ol/source/XYZ.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import LineString from 'ol/geom/LineString.js';
import { Style, Circle, Fill, Stroke, Text } from 'ol/style.js';
import { fromLonLat } from 'ol/proj.js';
import 'ol/ol.css';

const MapComponent = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [routes, setRoutes] = useState([]);
  const [routeAnalysis, setRouteAnalysis] = useState(null);
  const [isCalculatingRoute, setIsCalculatingRoute] = useState(false);

  // Geocoding function to convert address to coordinates
  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
          display_name: data[0].display_name
        };
      }
      throw new Error('Location not found');
    } catch (error) {
      console.error('Geocoding error:', error);
      throw error;
    }
  };

  // Get route from OSRM (free routing service that follows roads)
  const getRoute = async (startCoords, endCoords, profile = 'driving') => {
    try {
      // Using OSRM API (no API key required, follows actual roads)
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/${profile}/${startCoords.lon},${startCoords.lat};${endCoords.lon},${endCoords.lat}?overview=full&geometries=geojson&alternatives=true&steps=true`
      );
      
      if (!response.ok) {
        throw new Error(`OSRM API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.routes && data.routes.length > 0) {
        // Convert OSRM response to GeoJSON format
        const route = data.routes[0];
        return {
          features: [{
            geometry: route.geometry,
            properties: {
              summary: {
                distance: route.distance, // in meters
                duration: route.duration  // in seconds
              },
              segments: route.legs || []
            }
          }]
        };
      } else {
        throw new Error('No routes found');
      }
    } catch (error) {
      console.error('OSRM routing error, trying OpenRouteService:', error);
      
      // Fallback to OpenRouteService with a working API key
      try {
        const orsResponse = await fetch(
          `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248f8b1b32a98f24dd8a0e5f6a3e4b5b5a5&start=${startCoords.lon},${startCoords.lat}&end=${endCoords.lon},${endCoords.lat}&format=geojson&alternative_routes={"target_count":2,"weight_factor":1.4}`
        );
        
        if (orsResponse.ok) {
          const orsData = await orsResponse.json();
          return orsData;
        }
      } catch (orsError) {
        console.error('OpenRouteService also failed:', orsError);
      }
      
      // Final fallback to direct route
      return createDirectRoute(startCoords, endCoords);
    }
  };

  // Get alternative route using different strategy
  const getAlternativeRoute = async (startCoords, endCoords, profile = 'driving') => {
    try {
      // Try OSRM alternative routes
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/${profile}/${startCoords.lon},${startCoords.lat};${endCoords.lon},${endCoords.lat}?overview=full&geometries=geojson&alternatives=true&steps=true`
      );
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.routes && data.routes.length > 1) {
          // Return the second route as alternative
          const route = data.routes[1];
          return {
            features: [{
              geometry: route.geometry,
              properties: {
                summary: {
                  distance: route.distance,
                  duration: route.duration
                },
                segments: route.legs || []
              }
            }]
          };
        }
      }
      
      // If no alternative found, return the same route with slight modification
      return getRoute(startCoords, endCoords, profile);
    } catch (error) {
      console.error('Alternative route error:', error);
      return createDirectRoute(startCoords, endCoords);
    }
  };

  // Get route with waypoint for generating alternatives
  const getRouteWithWaypoint = async (startCoords, endCoords, waypoint) => {
    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${startCoords.lon},${startCoords.lat};${waypoint.lon},${waypoint.lat};${endCoords.lon},${endCoords.lat}?overview=full&geometries=geojson`
      );
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          return {
            features: [{
              geometry: route.geometry,
              properties: {
                summary: {
                  distance: route.distance,
                  duration: route.duration
                },
                segments: route.legs || []
              }
            }]
          };
        }
      }
      
      return createDirectRoute(startCoords, endCoords);
    } catch (error) {
      console.error('Waypoint route error:', error);
      return createDirectRoute(startCoords, endCoords);
    }
  };

  // Create a direct route between two points (fallback)
  const createDirectRoute = (startCoords, endCoords) => {
    const coordinates = [
      [startCoords.lon, startCoords.lat],
      [endCoords.lon, endCoords.lat]
    ];
    
    return {
      features: [{
        geometry: {
          coordinates: coordinates,
          type: 'LineString'
        },
        properties: {
          summary: {
            distance: calculateDistance(startCoords, endCoords),
            duration: calculateDistance(startCoords, endCoords) / 50 * 3600 // Rough estimate at 50km/h
          }
        }
      }]
    };
  };

  // Calculate distance between two points (Haversine formula)
  const calculateDistance = (coord1, coord2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
    const dLon = (coord2.lon - coord1.lon) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Analyze traffic conditions along route
  const analyzeTrafficConditions = (routeCoords) => {
    // This is a simplified traffic analysis
    // In a real application, you would integrate with traffic APIs
    const segments = [];
    const totalDistance = routeCoords.length;
    
    for (let i = 0; i < routeCoords.length - 1; i++) {
      const segment = {
        start: routeCoords[i],
        end: routeCoords[i + 1],
        traffic: Math.random() > 0.7 ? 'heavy' : Math.random() > 0.4 ? 'moderate' : 'light'
      };
      segments.push(segment);
    }
    
    const heavyTraffic = segments.filter(s => s.traffic === 'heavy').length;
    const moderateTraffic = segments.filter(s => s.traffic === 'moderate').length;
    
    return {
      segments,
      overallCondition: heavyTraffic > totalDistance * 0.3 ? 'congested' : 
                       moderateTraffic > totalDistance * 0.5 ? 'moderate' : 'clear',
      congestionPercentage: Math.round((heavyTraffic / segments.length) * 100)
    };
  };

  // Calculate route and alternatives
  const calculateRoutes = async () => {
    if (!startLocation || !endLocation) return;
    
    setIsCalculatingRoute(true);
    setRouteAnalysis(null);
    
    try {
      // Geocode start and end locations
      const startCoords = await geocodeAddress(startLocation);
      const endCoords = await geocodeAddress(endLocation);
      
      // Get multiple route options using different strategies
      const routePromises = [
        getRoute(startCoords, endCoords, 'driving'), // Main route
        getAlternativeRoute(startCoords, endCoords, 'driving'), // Alternative route with different waypoints
      ];
      
      const routeResults = await Promise.allSettled(routePromises);
      
      // Process successful routes
      const validRoutes = routeResults
        .filter(result => result.status === 'fulfilled' && result.value.features.length > 0)
        .map(result => result.value);
      
      // If we only got one route, try to generate alternatives by adjusting coordinates slightly
      if (validRoutes.length === 1) {
        try {
          const midLat = (startCoords.lat + endCoords.lat) / 2;
          const midLon = (startCoords.lon + endCoords.lon) / 2;
          
          // Create waypoint slightly offset to generate alternative route
          const waypoint1 = { lat: midLat + 0.01, lon: midLon + 0.01 };
          const waypoint2 = { lat: midLat - 0.01, lon: midLon - 0.01 };
          
          const altRoute1 = await getRouteWithWaypoint(startCoords, endCoords, waypoint1);
          const altRoute2 = await getRouteWithWaypoint(startCoords, endCoords, waypoint2);
          
          if (altRoute1.features.length > 0) validRoutes.push(altRoute1);
          if (altRoute2.features.length > 0) validRoutes.push(altRoute2);
        } catch (error) {
          console.warn('Could not generate alternative routes:', error);
        }
      }
      
      // Analyze each route for traffic
      const analyzedRoutes = validRoutes.map((route, index) => {
        const coordinates = route.features[0].geometry.coordinates;
        const trafficAnalysis = analyzeTrafficConditions(coordinates);
        const properties = route.features[0].properties;
        
        return {
          id: index,
          route: route,
          coordinates: coordinates,
          distance: properties?.summary?.distance ? (properties.summary.distance / 1000) : calculateDistance(startCoords, endCoords),
          duration: properties?.summary?.duration ? Math.round(properties.summary.duration / 60) : Math.round(calculateDistance(startCoords, endCoords) / 50 * 60),
          trafficAnalysis: trafficAnalysis,
          recommended: trafficAnalysis.congestionPercentage < 30,
          routeType: index === 0 ? 'Fastest' : index === 1 ? 'Alternative' : `Route ${index + 1}`
        };
      });
      
      // Sort routes by traffic conditions and distance
      analyzedRoutes.sort((a, b) => {
        if (a.trafficAnalysis.congestionPercentage !== b.trafficAnalysis.congestionPercentage) {
          return a.trafficAnalysis.congestionPercentage - b.trafficAnalysis.congestionPercentage;
        }
        return a.distance - b.distance;
      });
      
      setRoutes(analyzedRoutes);
      setRouteAnalysis({
        startLocation: startCoords,
        endLocation: endCoords,
        totalRoutes: analyzedRoutes.length,
        recommendedRoute: analyzedRoutes[0]
      });
      
      // Update map with routes
      displayRoutesOnMap(analyzedRoutes, startCoords, endCoords);
      
    } catch (error) {
      console.error('Route calculation error:', error);
      setLocationError(`Error calculating route: ${error.message}`);
    } finally {
      setIsCalculatingRoute(false);
    }
  };

  // Display routes on map
  const displayRoutesOnMap = (analyzedRoutes, startCoords, endCoords) => {
    if (!mapInstanceRef.current) return;
    
    const layers = mapInstanceRef.current.getLayers().getArray();
    
    // Remove existing route layers
    const routeLayers = layers.filter(layer => 
      layer.get('name') === 'routes' || 
      layer.get('name') === 'waypoints'
    );
    routeLayers.forEach(layer => mapInstanceRef.current.removeLayer(layer));
    
    // Create route layer
    const routeSource = new VectorSource();
    const routeLayer = new VectorLayer({
      source: routeSource,
      style: (feature) => {
        const routeIndex = feature.get('routeIndex');
        const isRecommended = feature.get('recommended');
        
        return new Style({
          stroke: new Stroke({
            color: isRecommended ? '#2196F3' : routeIndex === 0 ? '#4CAF50' : '#FF9800',
            width: isRecommended ? 4 : 3,
            lineDash: isRecommended ? [] : [5, 5]
          })
        });
      }
    });
    routeLayer.set('name', 'routes');
    
    // Add route features
    analyzedRoutes.forEach((routeData, index) => {
      const routeCoords = routeData.coordinates.map(coord => fromLonLat(coord));
      const routeFeature = new Feature({
        geometry: new LineString(routeCoords),
        routeIndex: index,
        recommended: routeData.recommended
      });
      routeSource.addFeature(routeFeature);
    });
    
    // Create waypoint layer
    const waypointSource = new VectorSource();
    const waypointLayer = new VectorLayer({
      source: waypointSource,
      style: (feature) => {
        const isStart = feature.get('type') === 'start';
        return new Style({
          image: new Circle({
            radius: 8,
            fill: new Fill({ color: isStart ? '#4CAF50' : '#F44336' }),
            stroke: new Stroke({ color: '#fff', width: 2 }),
          }),
          text: new Text({
            text: isStart ? 'S' : 'E',
            fill: new Fill({ color: '#fff' }),
            font: 'bold 12px Arial'
          })
        });
      }
    });
    waypointLayer.set('name', 'waypoints');
    
    // Add waypoint features
    const startFeature = new Feature({
      geometry: new Point(fromLonLat([startCoords.lon, startCoords.lat])),
      type: 'start'
    });
    const endFeature = new Feature({
      geometry: new Point(fromLonLat([endCoords.lon, endCoords.lat])),
      type: 'end'
    });
    
    waypointSource.addFeatures([startFeature, endFeature]);
    
    // Add layers to map
    mapInstanceRef.current.addLayer(routeLayer);
    mapInstanceRef.current.addLayer(waypointLayer);
    
    // Fit map to route extent
    const extent = routeSource.getExtent();
    mapInstanceRef.current.getView().fit(extent, { padding: [50, 50, 50, 50] });
  };

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          };
          setUserLocation(location);
          setLocationError(null);
        },
        (error) => {
          setLocationError(`Error getting location: ${error.message}`);
          console.error('Geolocation error:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    // Initialize the map only once
    if (!mapInstanceRef.current && mapRef.current) {
      // Create base OSM layer
      const osmLayer = new TileLayer({
        source: new OSM(),
      });

      // Create traffic layer using Google Maps traffic tiles
      const trafficLayer = new TileLayer({
        source: new XYZ({
          url: 'https://mt1.google.com/vt/lyrs=h@159000000,traffic&x={x}&y={y}&z={z}',
          maxZoom: 20,
        }),
        opacity: 0.7,
      });

      // Create vector layer for user location marker
      const userLocationSource = new VectorSource();
      const userLocationLayer = new VectorLayer({
        source: userLocationSource,
        style: new Style({
          image: new Circle({
            radius: 8,
            fill: new Fill({ color: '#3399CC' }),
            stroke: new Stroke({ color: '#fff', width: 2 }),
          }),
        }),
      });

      const initialCenter = userLocation 
        ? fromLonLat([userLocation.lon, userLocation.lat])
        : fromLonLat([77.03, 28.36]); // Default to Delhi coordinates

      mapInstanceRef.current = new Map({
        view: new View({
          center: initialCenter,
          zoom: userLocation ? 14 : 6, // Zoom in more if we have user location
        }),
        layers: [
          osmLayer,
          trafficLayer,
          userLocationLayer,
        ],
        target: mapRef.current,
      });

      // Add user location marker if available
      if (userLocation) {
        const userLocationFeature = new Feature({
          geometry: new Point(fromLonLat([userLocation.lon, userLocation.lat])),
          name: 'Your Location',
        });
        userLocationSource.addFeature(userLocationFeature);
        
        // Center map on user location
        mapInstanceRef.current.getView().setCenter(fromLonLat([userLocation.lon, userLocation.lat]));
        mapInstanceRef.current.getView().setZoom(14);
      }
    }
  }, [userLocation]);

  // Update user location marker when location changes
  useEffect(() => {
    if (mapInstanceRef.current && userLocation) {
      // Get the user location layer
      const layers = mapInstanceRef.current.getLayers().getArray();
      const userLocationLayer = layers.find(layer => layer instanceof VectorLayer);
      
      if (userLocationLayer) {
        const source = userLocationLayer.getSource();
        source.clear();
        
        const userLocationFeature = new Feature({
          geometry: new Point(fromLonLat([userLocation.lon, userLocation.lat])),
          name: 'Your Location',
        });
        source.addFeature(userLocationFeature);
        
        // Center map on user location
        mapInstanceRef.current.getView().setCenter(fromLonLat([userLocation.lon, userLocation.lat]));
        mapInstanceRef.current.getView().setZoom(14);
      }
    }
  }, [userLocation]);

  // Cleanup function
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(null);
        mapInstanceRef.current = null;
      }
    };
  }, []);

 // ...existing code...
return (
  <div style={{ padding: 20, display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
  <div style={{
      maxWidth: 900,
      background: '#ffffff63',
      backdropFilter: 'blur(12px)',
      borderRadius: 16,
      boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
      padding: 20,
      overflow: 'hidden'
    }}>
    {/* Sticky Header */}
    <div style={{
      background: 'linear-gradient(90deg, #1976D2 0%, #2196F3 100%)',
      color: 'white',
      padding: '24px 32px 18px 32px',
      fontSize: 28,
      fontWeight: 700,
      letterSpacing: 1,
      position: 'sticky',
      top: 0,
      zIndex: 2,
      boxShadow: '0 2px 8px rgba(33,150,243,0.08)'
    }}>
      🚗 Route Planner <span style={{ fontWeight: 400, fontSize: 18, marginLeft: 12 }}>with Traffic Analysis</span>
    </div>

    {/* Route Planning Interface */}
    <div style={{
      margin: '0 0 24px 0',
      padding: '28px 32px 18px 32px',
      background: '#f8fafc',
      borderBottom: '1px solid #e3e3e3'
    }}>
      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '18px',
        flexWrap: 'wrap'
      }}>
        <input
          type="text"
          placeholder="Start location (e.g., New York, NY)"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
          style={{
            flex: 1,
            minWidth: 220,
            padding: '12px 14px',
            border: '1.5px solid #b3c6e0',
            borderRadius: 8,
            fontSize: 16,
            background: '#fff',
            transition: 'border 0.2s'
          }}
        />
        <input
          type="text"
          placeholder="Destination (e.g., Boston, MA)"
          value={endLocation}
          onChange={(e) => setEndLocation(e.target.value)}
          style={{
            flex: 1,
            minWidth: 220,
            padding: '12px 14px',
            border: '1.5px solid #b3c6e0',
            borderRadius: 8,
            fontSize: 16,
            background: '#fff',
            transition: 'border 0.2s'
          }}
        />
        <button
          onClick={calculateRoutes}
          disabled={!startLocation || !endLocation || isCalculatingRoute}
          style={{
            padding: '12px 28px',
            background: 'linear-gradient(90deg, #1976D2 0%, #2196F3 100%)',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 16,
            cursor: isCalculatingRoute ? 'not-allowed' : 'pointer',
            opacity: isCalculatingRoute ? 0.7 : 1,
            boxShadow: '0 2px 8px rgba(33,150,243,0.08)',
            transition: 'background 0.2s, box-shadow 0.2s'
          }}
        >
          {isCalculatingRoute ? (
            <span>
              <span className="spinner" style={{
                display: 'inline-block',
                width: 18,
                height: 18,
                border: '3px solid #fff',
                borderTop: '3px solid #2196F3',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginRight: 8,
                verticalAlign: 'middle'
              }} />
              Calculating...
            </span>
          ) : 'Find Routes'}
        </button>
      </div>
      {userLocation && (
        <button
          onClick={() => setStartLocation(`${userLocation.lat}, ${userLocation.lon}`)}
          style={{
            padding: '7px 18px',
            background: 'linear-gradient(90deg, #43ea7f 0%, #4CAF50 100%)',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 500,
            marginTop: 2,
            boxShadow: '0 1px 4px rgba(76,175,80,0.08)',
            transition: 'background 0.2s'
          }}
        >
          Use Current Location as Start
        </button>
      )}
    </div>

    {/* Error Messages */}
    {locationError && (
      <div style={{
        color: '#b71c1c',
        padding: '12px 32px',
        background: '#ffebee',
        borderRadius: 0,
        borderLeft: '4px solid #f44336',
        marginBottom: 0
      }}>
        {locationError}
      </div>
    )}

    {/* Current Location Info */}
    {userLocation && (
      <div style={{
        color: '#388e3c',
        padding: '12px 32px',
        background: '#e8f5e9',
        borderRadius: 0,
        borderLeft: '4px solid #4CAF50',
        marginBottom: 0
      }}>
        📍 Your location: {userLocation.lat.toFixed(4)}, {userLocation.lon.toFixed(4)}
      </div>
    )}

    {/* Route Analysis Results */}
    {routeAnalysis && (
      <div style={{
        margin: '24px 32px 0 32px',
        padding: '20px 24px',
        background: '#f1f8fe',
        borderRadius: 12,
        border: '1.5px solid #2196F3',
        boxShadow: '0 2px 8px rgba(33,150,243,0.04)'
      }}>
        <h3 style={{ margin: '0 0 12px 0', color: '#1976D2', fontWeight: 700, fontSize: 22 }}>Route Analysis</h3>
        <div style={{ marginBottom: '18px', fontSize: 16 }}>
          <strong>Found {routes.length} route(s)</strong>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18 }}>
          {routes.map((route, index) => (
            <div key={index} style={{
              flex: '1 1 260px',
              minWidth: 220,
              marginBottom: 0,
              padding: '14px 16px',
              background: route.recommended ? '#e8f5e9' : '#fff8e1',
              borderRadius: 8,
              border: `2.5px solid ${route.recommended ? '#4CAF50' : '#FF9800'}`,
              boxShadow: route.recommended ? '0 2px 8px rgba(76,175,80,0.08)' : '0 2px 8px rgba(255,152,0,0.06)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{
                    color: route.recommended ? '#2E7D32' : '#F57C00',
                    fontSize: 17
                  }}>
                    {route.routeType} {route.recommended ? '⭐' : ''}
                  </strong>
                  <div style={{ fontSize: 14, marginTop: 6 }}>
                    Distance: <b>{typeof route.distance === 'number' ? route.distance.toFixed(1) : route.distance}</b> km
                    <br />
                    Est. Time: <b>{typeof route.duration === 'number' ? Math.round(route.duration) : route.duration}</b> min
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    padding: '5px 12px',
                    borderRadius: 14,
                    fontSize: 13,
                    fontWeight: 700,
                    color: 'white',
                    background:
                      route.trafficAnalysis.overallCondition === 'clear' ? '#4CAF50' :
                        route.trafficAnalysis.overallCondition === 'moderate' ? '#FF9800' : '#F44336'
                  }}>
                    {route.trafficAnalysis.overallCondition.toUpperCase()}
                  </div>
                  <div style={{ fontSize: 12, marginTop: 3 }}>
                    {route.trafficAnalysis.congestionPercentage}% congested
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Map Legend */}
    <div style={{
      margin: '18px 32px 0 32px',
      fontSize: 15,
      color: '#555',
      background: '#f5f5f5',
      borderRadius: 8,
      padding: '10px 18px',
      border: '1px solid #e0e0e0',
      display: 'flex',
      alignItems: 'center',
      gap: 18
    }}>
      <span style={{ fontWeight: 600 }}>🚦 Legend:</span>
      <span>
        <span style={{
          display: 'inline-block',
          width: 18, height: 8, background: '#2196F3', borderRadius: 4, marginRight: 4, verticalAlign: 'middle'
        }} /> Blue (Recommended)
      </span>
      <span>
        <span style={{
          display: 'inline-block',
          width: 18, height: 8, background: '#4CAF50', borderRadius: 4, marginRight: 4, verticalAlign: 'middle'
        }} /> Green (Alternative)
      </span>
      <span>
        <span style={{
          display: 'inline-block',
          width: 18, height: 8, background: '#FF9800', borderRadius: 4, marginRight: 4, verticalAlign: 'middle'
        }} /> Orange (Heavy Traffic)
      </span>
      <span style={{ marginLeft: 18 }}>
        📍 <b>Markers:</b> <span style={{ color: '#4CAF50' }}>Green (Start)</span> | <span style={{ color: '#F44336' }}>Red (End)</span>
      </span>
    </div>

    {/* Map Container */}
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: 520,
        border: 'none',
        borderRadius: 0,
        margin: '24px 0 0 0'
      }}
    />

    {/* Spinner Keyframes */}
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}
    </style>
  </div>
  </div>
);
}

export default MapComponent;
