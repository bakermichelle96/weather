export default async function handler(req, res) {
  try {
    const event = req.query.event || "";
    let url = "https://api.weather.gov/alerts/active";
    if (event) {
      url += `?event=${encodeURIComponent(event)}`;
    }

    const response = await fetch(url, {
      headers: {
        "User-Agent": "obs-weather-app (your@email.com)"
      }
    });

    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}