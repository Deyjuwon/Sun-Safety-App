import { useState, useEffect } from 'react';
import axios from 'axios';

const SunIndex = () => {
  const [uvIndex, setUvIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUVIndex = async () => {
      try {
        const response = await axios.get('https://api.openuv.io/api/v1/uv', {
          params: {
            lat: 8.517, 
            lng: 4.383,
          },
          headers: {
            'x-access-token': import.meta.env.VITE_OPENUV_API_KEY, 
          },
        });

        setUvIndex(response.data.result.uv_max);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUVIndex();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Current UV Index</h1>
      <p>{uvIndex}</p>
    </div>
  );
};

export default SunIndex;
