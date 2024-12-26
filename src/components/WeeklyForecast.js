import React, {useState} from 'react';
import config from '../config';

const WeeklyForecast = ({ city, background }) => {
    const [forecast, setForecast] = React.useState(null);
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [weatherData, setWeatherData] = useState(null);

    React.useEffect(() => {
        console.log("City in WeeklyForecast:", city); // Debug city prop
        if (city) {
            getForecast();
        }
    }, [city]);

    const getForecast = async () => {
        if (!city) {
            setError('Şehir seçilmedi');
            return;
        }

        setLoading(true);
        setError('');
        console.log("Fetching forecast for:", city); // Debug API call

        try {
            const response = await fetch(
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${config.API_KEY}&contentType=json&lang=tr`
            );

            if (!response.ok) {
                throw new Error('Şehir bulunamadı');
            }

            const data = await response.json();
            console.log("Forecast data:", data); // Debug API response
            setForecast(data.days.slice(0, 7));
            setWeatherData(data);
        } catch (err) {
            console.error("Forecast error:", err); // Debug errors
            setError('Hava durumu tahmini alınamadı.');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR', { weekday: 'long', month: 'long', day: 'numeric' });
    };

    // Arka plan resimlerinin tanımlanması
    const backgroundImages = {
        // Kar ve karla ilgili durumlar
        "kar üfleme": 'url("/weather-backgrounds/snowy.jpg")',
        "sürüklenen kar": 'url("/weather-backgrounds/snowy.jpg")',
        "kar": 'url("/weather-backgrounds/snowy.jpg")',
        "kar sağanakları": 'url("/weather-backgrounds/snowy.jpg")',
        "yoğun kar": 'url("/weather-backgrounds/snowy.jpg")',
        "hafif kar": 'url("/weather-backgrounds/snowy.jpg")',
        "kar ve yağmur sağanakları": 'url("/weather-backgrounds/snowy.jpg")',
        "hafif yağmur ve kar": 'url("/weather-backgrounds/snowy.jpg")',
        "şiddetli yağmur ve kar": 'url("/weather-backgrounds/snowy.jpg")',

        // Çiseleme
        "çiseleme": 'url("/weather-backgrounds/rainy.jpg")',
        "şiddetli çiseleme": 'url("/weather-backgrounds/rainy.jpg")',
        "hafif çiseleme": 'url("/weather-backgrounds/rainy.jpg")',
        "hafif çiseleme/yağmur": 'url("/weather-backgrounds/rainy.jpg")',
        "şiddetli çiseleme/yağmur": 'url("/weather-backgrounds/rainy.jpg")',

        // Yağmur
        "yağmur": 'url("/weather-backgrounds/rainy.jpg")',
        "şiddetli yağmur": 'url("/weather-backgrounds/rainy.jpg")',
        "yoğun yağış": 'url("/weather-backgrounds/rainy.jpg")',
        "sağanak yağmur": 'url("/weather-backgrounds/rainy.jpg")',
        "hafif yağış": 'url("/weather-backgrounds/rainy.jpg")',
        "yağmur ve kar": 'url("/weather-backgrounds/rainy.jpg")',

        // Sis ve duman
        "sis": 'url("/weather-backgrounds/cloudy.jpg")',
        "duman veya pus": 'url("/weather-backgrounds/cloudy.jpg")',
        "dondurucu sis": 'url("/weather-backgrounds/cloudy.jpg")',

        // Fırtına ve kasırga
        "fırtına": 'url("/weather-backgrounds/cloudy.jpg")',
        "fırtınalar": 'url("/weather-backgrounds/cloudy.jpg")',
        "huni bulutu": 'url("/weather-backgrounds/cloudy.jpg")',
        "kasırga": 'url("/weather-backgrounds/cloudy.jpg")',

        // Diğer hava koşulları
        "toz fırtınası": 'url("/weather-backgrounds/default.jpg")',
        "bulutlu": 'url("/weather-backgrounds/cloudy.jpg")',
        "parçalı bulutlu": 'url("/weather-backgrounds/cloudy.jpg")',
        "açık": 'url("/weather-backgrounds/sunny.jpg")',
        "yıldırımsız yıldırım": 'url("/weather-backgrounds/cloudy.jpg")',
        "yoğun dondurucu çiseleme/dondurucu yağmur": 'url("/weather-backgrounds/snowy.jpg")',
        "hafif dondurucu çiseleme/dondurucu yağmur": 'url("/weather-backgrounds/snowy.jpg")',
        "şiddetli dondurucu yağmur": 'url("/weather-backgrounds/snowy.jpg")',
        "hafif dondurucu yağmur": 'url("/weather-backgrounds/snowy.jpg")',
        "çevrede yağış": 'url("/weather-backgrounds/rainy.jpg")',
        "buz": 'url("/weather-backgrounds/default.jpg")',
        "elmas tozu": 'url("/weather-backgrounds/default.jpg")',
        "dolu": 'url("/weather-backgrounds/default.jpg")',
        "gökyüzü kapsamı azalan": 'url("/weather-backgrounds/cloudy.jpg")',
        "gökyüzü kapsamı artan": 'url("/weather-backgrounds/cloudy.jpg")',
        "gökyüzü değişmedi": 'url("/weather-backgrounds/sunny.jpg")',
    };

    // Hava durumu koşuluna göre arka plan seçimi
    const getBackground = (condition) => {
        if (!condition) return backgroundImages["default"];

        condition = condition.toLowerCase();
        if (condition.includes('açık') || condition.includes('güneşli')) return backgroundImages["açık"];
        if (condition.includes('kar')) return backgroundImages["kar"];
        if (condition.includes('yağmur')) return backgroundImages["yağmur"];
        if (condition.includes('sis') || condition.includes('pus')) return backgroundImages["sis"];
        if (condition.includes('fırtına') || condition.includes('kasırga')) return backgroundImages["fırtına"];
        if (condition.includes('toz fırtınası')) return backgroundImages["toz fırtınası"];
        if (condition.includes('bulut')) return backgroundImages["bulutlu"];
        return backgroundImages["default"];
    };

    // Debug render state
    console.log("Background Prop:", background);

    // Always render something, even if just loading or error states
    return (
        <div className="min-vh-100 bg-light py-5" style={{
            backgroundImage: weatherData
                ? getBackground(weatherData.currentConditions?.conditions)
                : backgroundImages.default,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transition: 'background-image 0.5s ease'
        }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card shadow">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h2 className="mb-0">Haftalık Hava Durumu {city ? `- ${city}` : ''}</h2>

                                </div>

                                {loading && <div className="text-center">Yükleniyor...</div>}
                                {error && <div className="alert alert-danger">{error}</div>}
                                {!city && <div className="alert alert-info">Lütfen ana sayfadan bir şehir seçin.</div>}

                                {forecast && forecast.length > 0 ? (
                                    <div className="row">
                                        {forecast.map((day, index) => (
                                            <div key={index} className="col-md-6 col-lg-3 mb-4">
                                                <div className="card h-100">
                                                    <div className="card-body">
                                                        <h5 className="card-title">{formatDate(day.datetime)}</h5>
                                                        <div className="my-3">
                                                            <p className="mb-2">
                                                                <strong>Sıcaklık:</strong> {day.temp}°C
                                                            </p>
                                                            <p className="mb-2">
                                                                <strong>En Yüksek:</strong> {day.tempmax}°C
                                                            </p>
                                                            <p className="mb-2">
                                                                <strong>En Düşük:</strong> {day.tempmin}°C
                                                            </p>
                                                            <p className="mb-2">
                                                                <strong>Nem:</strong> %{day.humidity}
                                                            </p>
                                                            <p className="mb-0">
                                                                <strong>Durum:</strong> {day.conditions}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeeklyForecast;