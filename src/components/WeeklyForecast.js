import React from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const WeeklyForecast = ({ city }) => {
    const [forecast, setForecast] = React.useState(null);
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

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

    // Debug render state
    console.log("Render state:", { loading, error, forecast, city });

    // Always render something, even if just loading or error states
    return (
        <div className="min-vh-100 bg-light py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card shadow">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h2 className="mb-0">Haftalık Hava Durumu {city ? `- ${city}` : ''}</h2>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => navigate('/')}
                                    >
                                        Ana Sayfaya Dön
                                    </button>
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