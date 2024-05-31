import { useState, useEffect } from "react";
import { Container, Text, VStack, Input, Button, Box } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Index = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [chartData, setChartData] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=YOUR_API_KEY`);
      const data = await response.json();
      setWeatherData(data);
      const chartData = {
        labels: data.list.map(item => item.dt_txt),
        datasets: [
          {
            label: 'Temperature (°C)',
            data: data.list.map(item => item.main.temp),
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
          },
        ],
      };
      setChartData(chartData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Weather Forecast</Text>
        <Input
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button onClick={fetchWeatherData}>Get Weather</Button>
        {chartData && (
          <Box width="100%" height="400px">
            <Line data={chartData} />
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;